import { PrismaClient } from "@prisma/client";

function maskEmail(email) {
  if (!email || !email.includes("@")) {
    return email || "(missing)";
  }

  const [local, domain] = email.split("@");
  const safeLocal =
    local.length <= 2 ? `${local[0] ?? ""}*` : `${local.slice(0, 2)}***`;
  return `${safeLocal}@${domain}`;
}

function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function main() {
  const databaseUrl = requiredEnv("DATABASE_URL");
  const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase() || "";

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  try {
    const roles = await prisma.role.findMany({
      orderBy: { code: "asc" },
      select: { code: true, name: true },
    });

    const adminUsers = await prisma.user.findMany({
      where: {
        userType: "admin",
        deletedAt: null,
      },
      orderBy: { createdAt: "asc" },
      include: {
        credential: {
          select: {
            failedLoginCount: true,
            lockedUntil: true,
            passwordUpdatedAt: true,
          },
        },
        roles: {
          include: {
            role: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const bootstrapAdmin = bootstrapEmail
      ? adminUsers.find((user) => user.email.toLowerCase() === bootstrapEmail)
      : null;

    console.log("=== Admin Auth Debug ===");
    console.log(`Database connected: yes`);
    console.log(`Roles present: ${roles.map((role) => role.code).join(", ") || "(none)"}`);
    console.log(
      `Bootstrap env email: ${bootstrapEmail ? maskEmail(bootstrapEmail) : "(missing)"}`
    );
    console.log(`Admin users found: ${adminUsers.length}`);
    console.log("");

    if (bootstrapEmail && !bootstrapAdmin) {
      console.log("Bootstrap admin match: NOT FOUND");
      console.log(
        "The current ADMIN_BOOTSTRAP_EMAIL does not match any existing admin user in this database."
      );
      console.log("");
    } else if (bootstrapAdmin) {
      console.log("Bootstrap admin match: FOUND");
      console.log(`- email: ${maskEmail(bootstrapAdmin.email)}`);
      console.log(`- verified: ${bootstrapAdmin.emailVerifiedAt ? "yes" : "no"}`);
      console.log(
        `- roles: ${bootstrapAdmin.roles.map((entry) => entry.role.code).join(", ") || "(none)"}`
      );
      console.log(`- failed login count: ${bootstrapAdmin.credential?.failedLoginCount ?? 0}`);
      console.log(
        `- locked until: ${
          bootstrapAdmin.credential?.lockedUntil
            ? bootstrapAdmin.credential.lockedUntil.toISOString()
            : "(not locked)"
        }`
      );
      console.log(
        `- password updated at: ${
          bootstrapAdmin.credential?.passwordUpdatedAt?.toISOString() ?? "(missing)"
        }`
      );
      console.log("");
    }

    console.log("Admin accounts:");
    for (const user of adminUsers) {
      console.log(`- ${maskEmail(user.email)}`);
      console.log(`  role(s): ${user.roles.map((entry) => entry.role.code).join(", ") || "(none)"}`);
      console.log(`  verified: ${user.emailVerifiedAt ? "yes" : "no"}`);
      console.log(`  failed login count: ${user.credential?.failedLoginCount ?? 0}`);
      console.log(
        `  locked until: ${
          user.credential?.lockedUntil ? user.credential.lockedUntil.toISOString() : "(not locked)"
        }`
      );
    }

    if (adminUsers.length === 0) {
      console.log("- none");
      console.log("");
      console.log(
        "No admin users exist in this database yet. That usually means bootstrap has not run successfully against this database."
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Admin auth debug failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
