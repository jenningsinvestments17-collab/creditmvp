import { getOpsDashboardModel } from "@/lib/monitoring/ops";
import { buildAdminCommandCenter } from "@/lib/services/adminCommandCenter";
import { buildAdminProfitDashboard } from "@/lib/services/adminProfitDashboard";
import { getAdminNotificationAlerts } from "@/lib/services/notifications";
import { buildAdminDashboardViewState } from "@/lib/workflows/adminDashboard";

function getEmptyCommandCenter() {
  return {
    stats: [],
    sections: [],
  };
}

function getEmptyProfitDashboard() {
  return {
    revenueTodayCents: 0,
    revenueWeekCents: 0,
    pendingPaymentCount: 0,
    conversionRate: 0,
    avgHoursToPayment: null,
    funnel: [],
    revenueQueue: [],
    alerts: {
      unpaid: [],
      missingDocs: [],
      failedPayments: [],
      stalledCases: [],
    },
    revenueSeries: [],
    conversionTrend: [],
  };
}

function getEmptyNotifications() {
  return {
    summary: {
      total: 0,
      pending: 0,
      sent: 0,
      failed: 0,
    },
    alerts: [],
  };
}

function getEmptyOpsHealth() {
  return {
    metrics: {},
    durations: [],
    errors: [],
  };
}

export async function buildAdminDashboardViewModel(input: {
  adminEmail: string;
  adminRole: string;
  query?: string;
  reminder?: string;
}) {
  const [commandCenterResult, profitDashboardResult, notificationAlertsResult, opsHealthResult] =
    await Promise.allSettled([
      buildAdminCommandCenter(),
      buildAdminProfitDashboard(),
      getAdminNotificationAlerts(),
      getOpsDashboardModel(),
    ]);

  const commandCenter =
    commandCenterResult.status === "fulfilled"
      ? commandCenterResult.value
      : getEmptyCommandCenter();
  const profitDashboard =
    profitDashboardResult.status === "fulfilled"
      ? profitDashboardResult.value
      : getEmptyProfitDashboard();
  const notificationAlerts =
    notificationAlertsResult.status === "fulfilled"
      ? notificationAlertsResult.value
      : getEmptyNotifications();
  const opsHealth =
    opsHealthResult.status === "fulfilled"
      ? opsHealthResult.value
      : getEmptyOpsHealth();

  return buildAdminDashboardViewState({
    adminEmail: input.adminEmail,
    adminRole: input.adminRole,
    query: input.query ?? "",
    reminder: input.reminder,
    commandCenter,
    profitDashboard,
    notificationAlerts,
    opsHealth,
  });
}
