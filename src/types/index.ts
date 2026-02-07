export type ClaimType = "auto" | "home" | "health" | "renters";

export type ClaimStatus =
  | "setup"
  | "documenting"
  | "policy_review"
  | "filed"
  | "offer_received"
  | "negotiating"
  | "escalating"
  | "resolved";

export type FaultStatus = "not_at_fault" | "partial_fault" | "at_fault" | "unknown";

export interface Claim {
  id: string;
  user_id: string;
  claim_type: ClaimType;
  status: ClaimStatus;
  created_at: string;
  updated_at: string;

  // Context
  accident_date: string | null;
  fault_status: FaultStatus;
  filed_with_insurer: boolean;
  insurer_name: string | null;
  claim_number: string | null;
  has_offer: boolean;

  // Offer
  offer_amount: number | null;
  desired_amount: number | null;
  fairness_score: number | null;

  // Policy
  policy_uploaded: boolean;
  policy_summary: string | null;
  coverage_limits: CoverageLimits | null;
  hidden_coverages: string[] | null;

  // Resolution
  final_settlement: number | null;
  resolved_at: string | null;
}

export interface CoverageLimits {
  collision: number | null;
  comprehensive: number | null;
  liability_per_person: number | null;
  liability_per_accident: number | null;
  property_damage: number | null;
  uninsured_motorist: number | null;
  medical_payments: number | null;
  rental_reimbursement: number | null;
  deductible: number | null;
}

export interface ClaimDocument {
  id: string;
  claim_id: string;
  category: DocumentCategory;
  file_name: string;
  file_url: string;
  file_type: string;
  notes: string | null;
  created_at: string;
}

export type DocumentCategory =
  | "vehicle_damage"
  | "accident_scene"
  | "police_report"
  | "medical_records"
  | "repair_estimates"
  | "receipts"
  | "policy"
  | "correspondence"
  | "other";

export interface FinancialImpact {
  id: string;
  claim_id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt_url: string | null;
}

export interface PolicyAnalysis {
  summary: string;
  coverages: {
    name: string;
    limit: string;
    description: string;
  }[];
  hidden_coverages: {
    name: string;
    description: string;
    potential_value: string;
  }[];
  red_flags: {
    provision: string;
    risk: string;
    recommendation: string;
  }[];
  adjuster_tactics: {
    tactic: string;
    counter: string;
  }[];
}

export interface OfferAnalysis {
  fairness_score: number;
  summary: string;
  line_items: {
    category: string;
    insurer_amount: number;
    fair_amount: number;
    difference: number;
    reasoning: string;
  }[];
  total_gap: number;
  comparable_data: {
    source: string;
    value: string;
    details: string;
  }[];
  recommendation: string;
}

export interface CounterOffer {
  demand_amount: number;
  demand_letter: string;
  talking_points: string[];
  evidence_summary: string;
  escalation_steps: {
    step: number;
    action: string;
    description: string;
    template: string | null;
  }[];
}

export interface OnboardingData {
  claim_type: ClaimType;
  accident_date: string;
  fault_status: FaultStatus;
  filed_with_insurer: boolean;
  insurer_name: string;
  claim_number: string;
  has_offer: boolean;
  offer_amount: number | null;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  damage_description: string;
  state: string;
}

export interface CallScript {
  opening: string;
  key_points: {
    topic: string;
    what_to_say: string;
    if_they_say: string;
    your_response: string;
  }[];
  closing: string;
  dos: string[];
  donts: string[];
}

export interface StateGuidance {
  state_name: string;
  state_code: string;
  key_laws: {
    name: string;
    summary: string;
    how_it_helps: string;
  }[];
  deadlines: {
    name: string;
    timeframe: string;
    description: string;
  }[];
  consumer_rights: string[];
  doi_info: {
    name: string;
    website: string;
    complaint_url: string;
    phone: string;
  };
  bad_faith_notes: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  subscription_tier: "free" | "per_claim" | "pro";
  stripe_customer_id: string | null;
  claims_used: number;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  category: DocumentCategory;
  required: boolean;
}
