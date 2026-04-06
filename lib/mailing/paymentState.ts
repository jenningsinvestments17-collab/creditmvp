import type { PaymentRecord } from "@/lib/types";

export function isPaymentSettled(record: PaymentRecord | null) {
  return Boolean(record && record.status === "captured");
}

export function isPaymentAuthorized(record: PaymentRecord | null) {
  return Boolean(
    record && (record.status === "authorized" || record.status === "ready_to_capture"),
  );
}

export function isAuthorizationExpired(record: PaymentRecord | null) {
  if (!record?.authorizationExpiresAt) {
    return false;
  }

  return Date.now() > new Date(record.authorizationExpiresAt).getTime();
}

export function requiresPaymentMethodUpdate(record: PaymentRecord | null) {
  return Boolean(
    !record ||
      record.status === "payment_not_collected" ||
      record.status === "payment_required" ||
      record.status === "authorization_expired" ||
      record.status === "payment_failed",
  );
}
