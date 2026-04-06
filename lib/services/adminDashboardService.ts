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

  const alertErrorMessages: string[] = [];

  if (notificationAlertsResult.status === "rejected") {
    console.error("admin_dashboard.notifications_failed", notificationAlertsResult.reason);
    alertErrorMessages.push("Notification alerts could not be loaded.");
  }

  if (opsHealthResult.status === "rejected") {
    console.error("admin_dashboard.ops_failed", opsHealthResult.reason);
    alertErrorMessages.push("Operations alerts could not be loaded.");
  }

  if (profitDashboardResult.status === "rejected") {
    console.error("admin_dashboard.profit_failed", profitDashboardResult.reason);
    alertErrorMessages.push("Case alerts could not be loaded.");
  }

  if (commandCenterResult.status === "rejected") {
    console.error("admin_dashboard.command_center_failed", commandCenterResult.reason);
  }

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
    alertErrorMessages,
    commandCenter,
    profitDashboard,
    notificationAlerts,
    opsHealth,
  });
}
