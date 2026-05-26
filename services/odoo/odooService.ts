import type {
  Lead,
  AutomationAssessment,
  MarketplaceInquiry,
  ContactRequest,
  PoCRequest,
} from "@/types";

export async function submitLead(lead: Lead): Promise<void> {
  console.log("[Odoo] submitLead →", lead);
  // TODO: POST /web/dataset/call_kw — model: crm.lead
}

export async function submitAssessment(assessment: AutomationAssessment): Promise<void> {
  console.log("[Odoo] submitAssessment →", assessment);
  // TODO: Create crm.lead with automation assessment fields
}

export async function submitMarketplaceInquiry(inquiry: MarketplaceInquiry): Promise<void> {
  console.log("[Odoo] submitMarketplaceInquiry →", inquiry);
  // TODO: Create sale.order or crm.lead with marketplace origin
}

export async function submitContactRequest(request: ContactRequest): Promise<void> {
  console.log("[Odoo] submitContactRequest →", request);
  // TODO: Create res.partner + crm.lead pair
}

export async function submitPoCRequest(request: PoCRequest): Promise<void> {
  console.log("[Odoo] submitPoCRequest →", request);
  // TODO: Create project.project or crm.lead with PoC stage
}
