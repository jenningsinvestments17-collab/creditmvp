import { getRequiredDocumentState } from "@/lib/services/documentService";
import { getAiWorkflowStateForLead } from "@/lib/services/disputeService";
import type { Lead } from "@/lib/types";
import type { IntakeProgressStep, IntakeProfileData, IntakeStepId } from "@/types/intake";

const STEP_ORDER: IntakeStepId[] = [
  "profile",
  "documents",
  "disclosures",
  "assignment",
  "contracts",
  "review",
];

export function getIntakeStepHref(step: IntakeStepId) {
  switch (step) {
    case "profile":
      return "/intake/profile";
    case "documents":
      return "/intake/documents";
    case "disclosures":
      return "/intake/disclosures";
    case "assignment":
      return "/intake/assignment";
    case "contracts":
      return "/intake/contracts";
    case "review":
      return "/intake/review";
    default:
      return "/intake/profile";
  }
}

export function normalizeProfileData(
  input: Partial<IntakeProfileData> | null | undefined,
  lead: Lead,
): IntakeProfileData {
  const [firstName = "", ...rest] = lead.fullName.split(" ");
  return {
    firstName: input?.firstName ?? firstName,
    lastName: input?.lastName ?? rest.join(" "),
    phone: input?.phone ?? lead.phone,
    city: input?.city ?? "",
    state: input?.state ?? "",
    primaryGoal: input?.primaryGoal ?? "",
  };
}

export function getAllowedIntakeStep(input: {
  profileCompleted: boolean;
  documentsReady: boolean;
  disclosuresAccepted: boolean;
  assignmentAccepted: boolean;
  contractsAccepted: boolean;
}) {
  if (!input.profileCompleted) return "profile" satisfies IntakeStepId;
  if (!input.documentsReady) return "documents" satisfies IntakeStepId;
  if (!input.disclosuresAccepted) return "disclosures" satisfies IntakeStepId;
  if (!input.assignmentAccepted) return "assignment" satisfies IntakeStepId;
  if (!input.contractsAccepted) return "contracts" satisfies IntakeStepId;
  return "review" satisfies IntakeStepId;
}

export function canAccessIntakeStep(requestedStep: IntakeStepId, allowedStep: IntakeStepId) {
  return STEP_ORDER.indexOf(requestedStep) <= STEP_ORDER.indexOf(allowedStep);
}

export function buildIntakeProgressSteps(input: {
  allowedStep: IntakeStepId;
  requestedStep: IntakeStepId;
  documentsReady: boolean;
}): IntakeProgressStep[] {
  const requestedIndex = STEP_ORDER.indexOf(input.requestedStep);
  const allowedIndex = STEP_ORDER.indexOf(input.allowedStep);

  return [
    {
      id: "profile",
      title: "Profile",
      helper: "Basic identity and credit-goal details.",
      href: getIntakeStepHref("profile"),
      status: allowedIndex > 0 ? "complete" : requestedIndex === 0 ? "current" : "locked",
    },
    {
      id: "documents",
      title: "Documents",
      helper: "Required bureau reports, ID, and proof of address.",
      href: getIntakeStepHref("documents"),
      status:
        input.documentsReady
          ? "complete"
          : requestedIndex === 1 && allowedIndex >= 1
            ? "current"
            : "locked",
    },
    {
      id: "disclosures",
      title: "Disclosure",
      helper: "Required written consumer disclosure before contract review.",
      href: getIntakeStepHref("disclosures"),
      status:
        allowedIndex > 2 ? "complete" : requestedIndex === 2 && allowedIndex >= 2 ? "current" : "locked",
    },
    {
      id: "assignment",
      title: "Assignment",
      helper: "Assignment of claims fee agreement and 50% proceeds acknowledgment.",
      href: getIntakeStepHref("assignment"),
      status:
        allowedIndex > 3 ? "complete" : requestedIndex === 3 && allowedIndex >= 3 ? "current" : "locked",
    },
    {
      id: "contracts",
      title: "Contract Review",
      helper: "Review service terms, fee language, and cancellation rights before signing.",
      href: getIntakeStepHref("contracts"),
      status:
        allowedIndex > 4 ? "complete" : requestedIndex === 4 && allowedIndex >= 4 ? "current" : "locked",
    },
    {
      id: "review",
      title: "Signature & Finish",
      helper: "Confirm disclosure, assignment, and contract review before completion.",
      href: getIntakeStepHref("review"),
      status: requestedIndex === 5 && allowedIndex >= 5 ? "current" : "locked",
    },
  ];
}

export function deriveDocumentsReady(lead: Lead) {
  return getRequiredDocumentState(lead).allUploaded;
}

export function deriveReviewReady(lead: Lead) {
  return getAiWorkflowStateForLead(lead).eligibleForProcessing;
}
