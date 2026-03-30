import { randomBytes, scrypt as nodeScrypt } from "node:crypto";
import { promisify } from "node:util";
import { PrismaClient } from "@prisma/client";

const scrypt = promisify(nodeScrypt);
const KEY_LENGTH = 64;

function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length).trim() : "";
}

function maskEmail(email) {
  if (!email || !email.includes("@")) {
    return email || "(missing)";
  }

  const [local, domain] = email.split("@");
  const safeLocal =
    local.length <= 2 ? `${local[0] ?? ""}*` : `${local.slice(0, 2)}***`;
  return `${safeLocal}@${domain}`;
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt}$${Buffer.from(derived).toString("hex")}`;
}

async function main() {
  const databaseUrl = requiredEnv("DATABASE_URL");
  const email =
    getArg("email") || process.env.ADMIN_RESET_EMAIL?.trim().toLowerCase() || "";
  const password =
    getArg("password") || process.env.ADMIN_RESET_PASSWORD?.trim() || "";

  if (!email) {
    throw new Error(
      "Missing admin email. Pass --email=admin@example.com or set ADMIN_RESET_EMAIL."
    );
  }

  if (!password || password.length < 10) {
    throw new Error(
      "Missing or weak password. Pass --password=... or set ADMIN_RESET_PASSWORD (min 10 chars)."
    );
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        userType: "admin",
        deletedAt: null,
      },
      include: {
        credential: true,
        roles: {
          include: {
            role: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("No active admin user found with that email.");
    }

    if (!user.credential) {
      throw new Error("Admin user exists but has no credential record.");
    }

    const passwordHash = await hashPassword(password);

    await prisma.$transaction(async (tx) => {
      await tx.userCredential.update({
        where: { userId: user.id },
        data: {
          passwordHash,
          passwordUpdatedAt: new Date(),
          failedLoginCount: 0,
          lockedUntil: null,
          passwordResetTokenHash: null,
          passwordResetExpiresAt: null,
          passwordResetRequestedAt: null,
        },
      });

      await tx.session.updateMany({
        where: {
          userId: user.id,
          status: "active",
        },
        data: {
          status: "revoked",
          revokedAt: new Date(),
        },
      });
    });

    console.log("Admin password reset complete.");
    console.log(`- email: ${maskEmail(user.email)}`);
    console.log(`- roles: ${user.roles.map((entry) => entry.role.code).join(", ") || "(none)"}`);
    console.log("- failed login count reset: yes");
    console.log("- active sessions revoked: yes");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Admin password reset failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
