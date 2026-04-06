import type {
  ContractDocument,
  ContractDocumentKey,
  ContractPacketStatus,
} from "@/lib/types";

const contractDocumentBase: Record<
  ContractDocumentKey,
  { label: string; description: string; required: boolean; version: string }
> = {
  service_agreement: {
    label: "Service agreement / contract",
    description:
      "Primary consultation agreement covering the DIY support service, drafting and correspondence work, and cancellation rights.",
    required: true,
    version: "v1",
  },
  consumer_rights_disclosure: {
    label: "Consumer rights disclosure",
    description:
      "Written disclosure covering services, fee schedule, consumer rights, and cancellation before any contract execution or payment.",
    required: true,
    version: "v1",
  },
  cancellation_form: {
    label: "Cancellation form",
    description:
      "Standalone cancellation notice confirming the client's five-business-day right to cancel without penalty.",
    required: true,
    version: "v1",
  },
  assignment_of_claims: {
    label: "Assignment of claims for damages",
    description:
      "Assignment agreement covering fifty percent of applicable recovered proceeds and continued cooperation through resolution.",
    required: true,
    version: "v1",
  },
  authorization_release_information: {
    label: "Authorization to release information",
    description: "Authorization allowing the onboarding process to move with the necessary supporting information.",
    required: true,
    version: "v1",
  },
  authorization_submit_disputes: {
    label: "Authorization to submit disputes and regulatory complaints",
    description: "Client-directed authorization covering dispute and complaint workflow when appropriate.",
    required: true,
    version: "v1",
  },
  consumer_directed_dispute_authorization: {
    label: "Consumer directed dispute authorization",
    description: "Acknowledgment of consumer-directed dispute activity as part of the packet.",
    required: true,
    version: "v1",
  },
  consumer_file_request_form: {
    label: "Consumer file request form",
    description: "Supporting request form included in the onboarding paperwork packet.",
    required: true,
    version: "v1",
  },
};

export const contractPacketMeta: Record<
  ContractPacketStatus,
  { label: string; tone: string; description: string }
> = {
  not_sent: {
    label: "Not Sent",
    tone: "bg-zinc-900 text-zinc-200 border-white/10",
    description: "The onboarding packet has not been sent to the client yet.",
  },
  sent: {
    label: "Sent",
    tone: "bg-accent/10 text-[#7d6434] border-accent/25",
    description: "The onboarding packet is assigned and available for client review.",
  },
  awaiting_signature: {
    label: "Awaiting Signature",
    tone: "bg-amber-500/12 text-amber-200 border-amber-400/20",
    description: "The client has documents to review and sign before onboarding can advance.",
  },
  partially_signed: {
    label: "Partially Signed",
    tone: "bg-indigo-500/12 text-indigo-200 border-indigo-400/20",
    description: "Some onboarding documents are signed, but the packet is not complete yet.",
  },
  signed: {
    label: "Signed",
    tone: "bg-emerald-500/12 text-emerald-200 border-emerald-400/20",
    description: "All required onboarding documents have been signed.",
  },
  completed: {
    label: "Completed",
    tone: "bg-sky-500/12 text-sky-200 border-sky-400/20",
    description: "The packet is complete and the client can move into the next onboarding stage.",
  },
};

export function buildContractDocuments(
  statuses: Partial<Record<ContractDocumentKey, ContractDocument["status"]>>,
  timestamps?: Partial<
    Record<ContractDocumentKey, { sentAt?: string; signedAt?: string }>
  >,
): ContractDocument[] {
  return Object.entries(contractDocumentBase).map(([key, value]) => ({
    key: key as ContractDocumentKey,
    label: value.label,
    description: value.description,
    required: value.required,
    version: value.version,
    status: statuses[key as ContractDocumentKey] ?? "not_sent",
    sentAt: timestamps?.[key as ContractDocumentKey]?.sentAt,
    signedAt: timestamps?.[key as ContractDocumentKey]?.signedAt,
  }));
}

export function getContractCounts(documents: ContractDocument[]) {
  const totalRequired = documents.filter((doc) => doc.required).length;
  const sent = documents.filter((doc) => doc.status !== "not_sent").length;
  const signed = documents.filter(
    (doc) => doc.status === "signed" || doc.status === "completed",
  ).length;
  const awaiting = documents.filter((doc) => doc.status === "awaiting_signature").length;

  return {
    totalRequired,
    sent,
    signed,
    awaiting,
    missingSignatures: totalRequired - signed,
  };
}

export function isContractPacketFullySigned(documents: ContractDocument[]) {
  return documents
    .filter((doc) => doc.required)
    .every((doc) => doc.status === "signed" || doc.status === "completed");
}

export function getNextUnsignedContract(documents: ContractDocument[]) {
  return documents.find(
    (doc) => doc.required && doc.status !== "signed" && doc.status !== "completed",
  ) ?? null;
}

export function renderContractTemplatePreview(document: ContractDocument, clientName: string) {
  const cancellationClause =
    "You may cancel this agreement within five (5) business days from the date of signing without any penalty or obligation.";
  const serviceDescription = "This is a consultation-based, DIY credit repair support service.";
  const feeDescription =
    "The fee is for drafting and sending dispute letters and related correspondence.";

  const partyBlock = `Client: ${clientName}`;

  switch (document.key) {
    case "service_agreement":
      return `Service Agreement
Version: ${document.version}
${partyBlock}

Service description:
${serviceDescription}

Fee description:
${feeDescription}

Services:
We assist with drafting and sending dispute letters and provide guidance throughout the process.

Fee schedule:
Fees apply only after services are completed and approved for release.

Consumer rights:
You are not required to purchase any service.

Cancellation:
${cancellationClause}

Client acknowledgment:
By signing, the client confirms review of the service terms, fee language, and cancellation rights before any payment becomes part of release.`;

    case "consumer_rights_disclosure":
      return `Consumer Disclosure
Version: ${document.version}
${partyBlock}

Services:
We assist with drafting and sending dispute letters and provide guidance throughout the process.

Fee schedule:
Fees apply only after services are completed and approved for release.

Consumer rights:
You are not required to purchase any service.

Cancellation:
You have the right to cancel this agreement within five (5) business days without penalty.

Service clarification:
${serviceDescription}

Fee clarification:
${feeDescription}`;

    case "cancellation_form":
      return `Cancellation Notice
Version: ${document.version}
${partyBlock}

Right to cancel:
${cancellationClause}

How to use this notice:
Submit written notice within the cancellation period if you choose not to continue. No penalty or obligation applies when cancellation is made within that window.`;

    case "assignment_of_claims":
      return `Assignment of Claims for Damages

Assignor:
${clientName}
[Client Address]

Assignee:
Kendarion Jennings
Member, Credu Consulting LLC
100 Peabody Place, Suite 150
Memphis, TN 38173

For value received, the Assignor transfers and assigns an interest in any and all claims, demands, and causes of action arising from or related to the following:

- Fair Credit Reporting Act (FCRA), 15 U.S.C. §§ 1681-1681x
- Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. §§ 1692-1692p
- Uniform Commercial Code, Article 9, Part 6
- Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227
- Real Estate Settlement Procedures Act (RESPA), 12 U.S.C. §§ 2601-2617
- Any applicable state laws related to consumer protection, tort, negligence, or similar claims

Service clarification:
${serviceDescription}
${feeDescription}

Assignment fee agreement:
Client agrees to assign fifty percent (50%) of any proceeds recovered from applicable claims to the company.

Discretion:
The Assignee may, in its own name or in the name of the Assignor, prosecute, collect, settle, compromise, and execute releases relating to such claims as the Assignee deems appropriate.

Cooperation:
The Assignor agrees to provide reasonable assistance as needed through resolution of the matter.

Cancellation rights:
${cancellationClause}

Assignor Signature: ______________________
Print Name: ______________________
Date: ______________________

Assignee Signature: ______________________
Print Name: Kendarion Jennings
Date: ______________________`;

    default:
      return `${document.label}
Version: ${document.version}
${partyBlock}

${serviceDescription}
${feeDescription}

${cancellationClause}`;
  }
}
