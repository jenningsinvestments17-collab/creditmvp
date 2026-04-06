import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.STAGING_BASE_URL || process.env.NEXT_PUBLIC_APP_URL;
const clientEmail = process.env.STAGING_CLIENT_EMAIL;
const clientPassword = process.env.STAGING_CLIENT_PASSWORD;
const clientLeadId = process.env.STAGING_CLIENT_LEAD_ID;
const adminEmail = process.env.STAGING_ADMIN_EMAIL;
const adminPassword = process.env.STAGING_ADMIN_PASSWORD;

if (!baseUrl || !clientEmail || !clientPassword || !clientLeadId || !adminEmail || !adminPassword) {
  console.error("Missing required staging smoke-test environment variables.");
  process.exit(1);
}

const uploads = {
  experian_report: process.env.STAGING_DOCUMENT_EXPERIAN,
  equifax_report: process.env.STAGING_DOCUMENT_EQUIFAX,
  transunion_report: process.env.STAGING_DOCUMENT_TRANSUNION,
  valid_id: process.env.STAGING_DOCUMENT_ID,
  proof_of_address: process.env.STAGING_DOCUMENT_PROOF,
};

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }

  setFromResponse(response) {
    const raw = response.headers.get("set-cookie");
    if (!raw) return;
    const first = raw.split(", ").filter((part) => part.includes("="));
    for (const entry of first) {
      const [kv] = entry.split(";");
      const index = kv.indexOf("=");
      if (index > 0) {
        this.cookies.set(kv.slice(0, index), kv.slice(index + 1));
      }
    }
  }

  toHeader() {
    return Array.from(this.cookies.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }
}

async function postForm(url, formData, jar) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    redirect: "manual",
    headers: {
      origin: baseUrl,
      ...(jar ? { cookie: jar.toHeader() } : {}),
    },
  });
  jar?.setFromResponse(response);
  return response;
}

function assertFile(filePath, label) {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error(`Missing ${label} file for smoke test.`);
  }
}

async function login(pathname, email, password) {
  const jar = new CookieJar();
  const form = new FormData();
  form.set("email", email);
  form.set("password", password);
  form.set("next", pathname.startsWith("/admin") ? "/admin" : "/dashboard");
  const response = await postForm(`${baseUrl}${pathname}`, form, jar);
  if (![302, 303].includes(response.status)) {
    throw new Error(`Login failed for ${pathname}: ${response.status}`);
  }
  return jar;
}

async function uploadDocument(clientJar, documentKey, filePath) {
  assertFile(filePath, documentKey);
  const form = new FormData();
  form.set("leadId", clientLeadId);
  form.set("documentKey", documentKey);
  form.set("returnTo", "/intake/documents");
  form.set(
    "file",
    new Blob([fs.readFileSync(filePath)]),
    path.basename(filePath),
  );
  const response = await postForm(`${baseUrl}/api/reports/upload`, form, clientJar);
  if (![302, 303].includes(response.status)) {
    throw new Error(`Upload failed for ${documentKey}: ${response.status}`);
  }
}

async function main() {
  const health = await fetch(`${baseUrl}/api/health`);
  if (!health.ok) {
    throw new Error(`Health check failed: ${health.status}`);
  }

  const clientJar = await login("/api/auth/login", clientEmail, clientPassword);
  const adminJar = await login("/api/auth/admin/login", adminEmail, adminPassword);

  for (const [key, filePath] of Object.entries(uploads)) {
    await uploadDocument(clientJar, key, filePath);
  }

  const leadDisputeId = `dispute_${clientLeadId}`;

  let form = new FormData();
  form.set("returnTo", `/admin/leads/${clientLeadId}`);
  await postForm(`${baseUrl}/api/disputes/${clientLeadId}/generate`, form, adminJar);

  form = new FormData();
  form.set("returnTo", `/admin/leads/${clientLeadId}`);
  await postForm(`${baseUrl}/api/disputes/${leadDisputeId}/approve`, form, adminJar);

  form = new FormData();
  form.set("returnTo", `/admin/leads/${clientLeadId}`);
  await postForm(`${baseUrl}/api/disputes/${leadDisputeId}/service-rendered`, form, adminJar);

  form = new FormData();
  form.set("returnTo", `/admin/leads/${clientLeadId}`);
  await postForm(`${baseUrl}/api/disputes/${leadDisputeId}/payment`, form, adminJar);

  form = new FormData();
  form.set("disputeId", leadDisputeId);
  form.set("returnTo", "/admin/mail-queue");
  await postForm(`${baseUrl}/api/mailing/send`, form, adminJar);

  console.log(
    JSON.stringify(
      {
        ok: true,
        baseUrl,
        leadId: clientLeadId,
        disputeId: leadDisputeId,
        completedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
