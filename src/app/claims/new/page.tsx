"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import type { OnboardingData } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "Claim Type",
  "Accident Details",
  "Insurance Info",
  "Vehicle Info",
  "Policy Upload",
  "Review & Submit",
];

const FAULT_OPTIONS = [
  { value: "not_at_fault", label: "Not at fault" },
  { value: "partial_fault", label: "Partial fault" },
  { value: "at_fault", label: "At fault" },
  { value: "unknown", label: "Unknown / unsure" },
];

const CLAIM_TYPES = [
  {
    key: "auto" as const,
    title: "Auto Property Damage",
    description:
      "Collision, comprehensive, and total loss claims. Get fair value for your vehicle.",
    enabled: true,
  },
  {
    key: "home" as const,
    title: "Homeowner",
    description:
      "Storm, fire, water damage, and other covered property losses.",
    enabled: false,
  },
  {
    key: "health" as const,
    title: "Health",
    description:
      "Medical claim denials, out-of-network disputes, and billing errors.",
    enabled: false,
  },
  {
    key: "renters" as const,
    title: "Renter&apos;s",
    description:
      "Personal property theft, liability, and additional living expense claims.",
    enabled: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Helper: format fault status for display                                    */
/* -------------------------------------------------------------------------- */

function faultLabel(value: string): string {
  const match = FAULT_OPTIONS.find((o) => o.value === value);
  return match?.label ?? value;
}

/* -------------------------------------------------------------------------- */
/*  Helper: format currency                                                    */
/* -------------------------------------------------------------------------- */

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default function NewClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policyFiles, setPolicyFiles] = useState<File[]>([]);

  /* ---- Form errors per step ---- */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---- Onboarding form data ---- */
  const [formData, setFormData] = useState<OnboardingData>({
    claim_type: "auto",
    accident_date: "",
    fault_status: "unknown",
    filed_with_insurer: false,
    insurer_name: "",
    claim_number: "",
    has_offer: false,
    offer_amount: null,
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    damage_description: "",
  });

  /* ---- Generic field updater ---- */
  function updateField<K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear the error for this field when the user changes it
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  Validation                                                               */
  /* ------------------------------------------------------------------------ */

  function validateStep(step: number): boolean {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        // Claim type is pre-selected as "auto", always valid
        break;

      case 2:
        if (!formData.accident_date) {
          newErrors.accident_date = "Please enter the date of the accident.";
        }
        if (!formData.damage_description.trim()) {
          newErrors.damage_description =
            "Please describe the damage to your vehicle.";
        }
        break;

      case 3:
        if (formData.filed_with_insurer && !formData.insurer_name.trim()) {
          newErrors.insurer_name = "Please enter your insurance company name.";
        }
        if (formData.has_offer) {
          if (
            formData.offer_amount === null ||
            formData.offer_amount === undefined ||
            formData.offer_amount <= 0
          ) {
            newErrors.offer_amount = "Please enter the offer amount.";
          }
        }
        break;

      case 4:
        if (!formData.vehicle_year.trim()) {
          newErrors.vehicle_year = "Please enter the vehicle year.";
        } else if (
          !/^\d{4}$/.test(formData.vehicle_year) ||
          parseInt(formData.vehicle_year) < 1900 ||
          parseInt(formData.vehicle_year) > new Date().getFullYear() + 1
        ) {
          newErrors.vehicle_year = "Please enter a valid 4-digit year.";
        }
        if (!formData.vehicle_make.trim()) {
          newErrors.vehicle_make = "Please enter the vehicle make.";
        }
        if (!formData.vehicle_model.trim()) {
          newErrors.vehicle_model = "Please enter the vehicle model.";
        }
        break;

      case 5:
        // Policy upload is optional
        break;

      case 6:
        // Summary step -- nothing to validate
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ------------------------------------------------------------------------ */
  /*  Navigation                                                               */
  /* ------------------------------------------------------------------------ */

  function handleNext() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  /* ------------------------------------------------------------------------ */
  /*  Submit                                                                   */
  /* ------------------------------------------------------------------------ */

  async function handleSubmit() {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production this would POST to /api/claims with formData + policyFiles
    // and return a real claim ID. For now, redirect to the demo claim.
    router.push("/claims/demo");
  }

  /* ------------------------------------------------------------------------ */
  /*  Step Renderers                                                           */
  /* ------------------------------------------------------------------------ */

  /* ---- Step 1: Claim Type ---- */
  function renderClaimType() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            What type of claim do you have?
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            Select the category that best matches your situation. We are
            currently focused on auto property damage claims.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLAIM_TYPES.map((type) => {
            const isSelected =
              type.enabled && formData.claim_type === type.key;
            return (
              <button
                key={type.key}
                type="button"
                disabled={!type.enabled}
                onClick={() => {
                  if (type.enabled) updateField("claim_type", type.key);
                }}
                className={
                  "text-left rounded-lg border p-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 " +
                  (isSelected
                    ? "border-zinc-200 border-l-4 border-l-brand-500 bg-white shadow-card"
                    : type.enabled
                    ? "border-zinc-200 bg-white hover:border-zinc-300 cursor-pointer"
                    : "border-zinc-100 bg-zinc-50 cursor-not-allowed")
                }
              >
                <h3
                  className={
                    "text-body font-semibold " +
                    (type.enabled ? "text-zinc-900" : "text-zinc-400")
                  }
                >
                  {type.title}
                </h3>
                <p
                  className={
                    "mt-1 text-body-sm " +
                    (type.enabled ? "text-zinc-500" : "text-zinc-300")
                  }
                >
                  {type.description}
                </p>

                {!type.enabled && (
                  <span className="mt-2 inline-block text-caption text-zinc-400 font-medium">
                    Coming soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---- Step 2: Accident Details ---- */
  function renderAccidentDetails() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            Tell us about the accident
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            This helps us understand the context of your claim and prepare the
            best analysis.
          </p>
        </div>

        <div className="space-y-5">
          <Input
            id="accident_date"
            label="When did the accident happen?"
            type="date"
            value={formData.accident_date}
            onChange={(e) => updateField("accident_date", e.target.value)}
            error={errors.accident_date}
            max={new Date().toISOString().split("T")[0]}
          />

          <Select
            id="fault_status"
            label="Who was at fault?"
            options={FAULT_OPTIONS}
            value={formData.fault_status}
            onChange={(e) =>
              updateField(
                "fault_status",
                e.target.value as OnboardingData["fault_status"]
              )
            }
          />

          <Textarea
            id="damage_description"
            label="Describe the damage to your vehicle"
            placeholder="e.g., Rear-ended at a stoplight. Bumper crushed, trunk won't close, tail lights broken. Airbags did not deploy."
            value={formData.damage_description}
            onChange={(e) => updateField("damage_description", e.target.value)}
            error={errors.damage_description}
            rows={4}
          />
        </div>
      </div>
    );
  }

  /* ---- Step 3: Insurance Info ---- */
  function renderInsuranceInfo() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            Insurance information
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            Let us know where you stand with your insurance company so we can
            tailor our guidance.
          </p>
        </div>

        <div className="space-y-5">
          {/* Filed with insurer? */}
          <div className="space-y-1">
            <label className="block text-body-sm font-medium text-zinc-700">
              Have you filed a claim with your insurer?
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => updateField("filed_with_insurer", true)}
                className={
                  "flex-1 py-2.5 px-4 rounded-lg border text-body-sm font-medium transition-all " +
                  (formData.filed_with_insurer
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300")
                }
              >
                Yes, I have
              </button>
              <button
                type="button"
                onClick={() => {
                  updateField("filed_with_insurer", false);
                  updateField("insurer_name", "");
                  updateField("claim_number", "");
                }}
                className={
                  "flex-1 py-2.5 px-4 rounded-lg border text-body-sm font-medium transition-all " +
                  (!formData.filed_with_insurer
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300")
                }
              >
                Not yet
              </button>
            </div>
          </div>

          {/* Conditional: insurer name + claim number */}
          {formData.filed_with_insurer && (
            <div className="space-y-5 pl-4 border-l-2 border-zinc-100">
              <Input
                id="insurer_name"
                label="Insurance company name"
                placeholder="e.g., State Farm, GEICO, Progressive"
                value={formData.insurer_name}
                onChange={(e) => updateField("insurer_name", e.target.value)}
                error={errors.insurer_name}
              />
              <Input
                id="claim_number"
                label="Claim number (optional)"
                placeholder="e.g., CLM-2024-123456"
                value={formData.claim_number}
                onChange={(e) => updateField("claim_number", e.target.value)}
                hint="You can find this on any correspondence from your insurer."
              />
            </div>
          )}

          {/* Have you received an offer? */}
          <div className="space-y-1">
            <label className="block text-body-sm font-medium text-zinc-700">
              Have you received a settlement offer?
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => updateField("has_offer", true)}
                className={
                  "flex-1 py-2.5 px-4 rounded-lg border text-body-sm font-medium transition-all " +
                  (formData.has_offer
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300")
                }
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  updateField("has_offer", false);
                  updateField("offer_amount", null);
                }}
                className={
                  "flex-1 py-2.5 px-4 rounded-lg border text-body-sm font-medium transition-all " +
                  (!formData.has_offer
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300")
                }
              >
                No
              </button>
            </div>
          </div>

          {/* Conditional: offer amount */}
          {formData.has_offer && (
            <div className="pl-4 border-l-2 border-zinc-100">
              <Input
                id="offer_amount"
                label="Settlement offer amount"
                type="number"
                placeholder="e.g., 4500"
                value={
                  formData.offer_amount !== null
                    ? String(formData.offer_amount)
                    : ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  updateField(
                    "offer_amount",
                    val === "" ? null : parseFloat(val)
                  );
                }}
                error={errors.offer_amount}
                hint="Enter the dollar amount your insurer offered."
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---- Step 4: Vehicle Info ---- */
  function renderVehicleInfo() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            Your vehicle details
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            We need basic vehicle information to look up comparable values and
            assess the fairness of any offer.
          </p>
        </div>

        <div className="space-y-5">
          <Input
            id="vehicle_year"
            label="Year"
            placeholder="e.g., 2021"
            value={formData.vehicle_year}
            onChange={(e) => updateField("vehicle_year", e.target.value)}
            error={errors.vehicle_year}
            maxLength={4}
          />
          <Input
            id="vehicle_make"
            label="Make"
            placeholder="e.g., Toyota"
            value={formData.vehicle_make}
            onChange={(e) => updateField("vehicle_make", e.target.value)}
            error={errors.vehicle_make}
          />
          <Input
            id="vehicle_model"
            label="Model"
            placeholder="e.g., Camry SE"
            value={formData.vehicle_model}
            onChange={(e) => updateField("vehicle_model", e.target.value)}
            error={errors.vehicle_model}
          />
        </div>
      </div>
    );
  }

  /* ---- Step 5: Policy Upload ---- */
  function renderPolicyUpload() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            Upload your insurance policy
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            If you have a copy of your insurance policy, upload it here so our
            AI can identify your coverages, limits, and any hidden benefits.
            This step is optional -- you can always add it later.
          </p>
        </div>

        <FileUpload
          label="Insurance policy document"
          onFilesSelected={(files) => setPolicyFiles(files)}
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={1}
          maxSize={20 * 1024 * 1024}
          hint="PDF up to 20 MB. Your declarations page or full policy document."
        />

        <div className="rounded-lg border border-zinc-200 p-4">
          <p className="text-body-sm font-medium text-zinc-900">
            Where do I find my policy?
          </p>
          <ul className="mt-2 list-disc pl-4 space-y-1 text-body-sm text-zinc-500">
            <li>
              Check your email for a &quot;Declarations Page&quot; or
              &quot;Policy Documents&quot; email from your insurer.
            </li>
            <li>
              Log in to your insurer&apos;s website or app and look for
              &quot;My Policy&quot; or &quot;Documents.&quot;
            </li>
            <li>
              Call your agent and ask them to email you a copy of your full
              policy.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  /* ---- Step 6: Summary ---- */
  function renderSummary() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-zinc-900">
            Review your information
          </h2>
          <p className="mt-2 text-body text-zinc-500">
            Please confirm everything looks correct before we create your claim.
            You can click &quot;Edit&quot; on any section to go back and make
            changes.
          </p>
        </div>

        <div className="space-y-5">
          {/* Claim Type */}
          <SummarySection
            title="Claim Type"
            onEdit={() => setCurrentStep(1)}
          >
            <SummaryRow label="Type" value="Auto Property Damage" />
          </SummarySection>

          {/* Accident Details */}
          <SummarySection
            title="Accident Details"
            onEdit={() => setCurrentStep(2)}
          >
            <SummaryRow
              label="Date"
              value={
                formData.accident_date
                  ? new Date(
                      formData.accident_date + "T00:00:00"
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "--"
              }
            />
            <SummaryRow
              label="Fault status"
              value={faultLabel(formData.fault_status)}
            />
            <SummaryRow
              label="Damage"
              value={formData.damage_description || "--"}
            />
          </SummarySection>

          {/* Insurance Info */}
          <SummarySection
            title="Insurance Information"
            onEdit={() => setCurrentStep(3)}
          >
            <SummaryRow
              label="Filed with insurer"
              value={formData.filed_with_insurer ? "Yes" : "No"}
            />
            {formData.filed_with_insurer && (
              <>
                <SummaryRow
                  label="Insurer"
                  value={formData.insurer_name || "--"}
                />
                <SummaryRow
                  label="Claim number"
                  value={formData.claim_number || "Not provided"}
                />
              </>
            )}
            <SummaryRow
              label="Offer received"
              value={formData.has_offer ? "Yes" : "No"}
            />
            {formData.has_offer && formData.offer_amount !== null && (
              <SummaryRow
                label="Offer amount"
                value={formatCurrency(formData.offer_amount)}
              />
            )}
          </SummarySection>

          {/* Vehicle Info */}
          <SummarySection
            title="Vehicle Information"
            onEdit={() => setCurrentStep(4)}
          >
            <SummaryRow
              label="Vehicle"
              value={
                formData.vehicle_year &&
                formData.vehicle_make &&
                formData.vehicle_model
                  ? `${formData.vehicle_year} ${formData.vehicle_make} ${formData.vehicle_model}`
                  : "--"
              }
            />
          </SummarySection>

          {/* Policy Upload */}
          <SummarySection
            title="Policy Document"
            onEdit={() => setCurrentStep(5)}
          >
            <SummaryRow
              label="Policy uploaded"
              value={
                policyFiles.length > 0
                  ? policyFiles.map((f) => f.name).join(", ")
                  : "No file uploaded (you can add this later)"
              }
            />
          </SummarySection>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg border border-zinc-200 p-4">
          <p className="text-body-sm text-zinc-500 leading-relaxed">
            <span className="font-medium text-zinc-700">Disclaimer:</span>{" "}
            ClaimCoach provides informational guidance to help you understand
            your insurance claim. It is not legal advice, and we recommend
            consulting an attorney for complex disputes.
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*  Step Router                                                              */
  /* ------------------------------------------------------------------------ */

  function renderCurrentStep() {
    switch (currentStep) {
      case 1:
        return renderClaimType();
      case 2:
        return renderAccidentDetails();
      case 3:
        return renderInsuranceInfo();
      case 4:
        return renderVehicleInfo();
      case 5:
        return renderPolicyUpload();
      case 6:
        return renderSummary();
      default:
        return null;
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  Render                                                                   */
  /* ------------------------------------------------------------------------ */

  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/*  Header + Progress bar                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            <span className="text-zinc-900">Claim</span>
            <span className="text-brand-500">Coach</span>
          </Link>

          <span className="text-caption text-zinc-400">
            Step {currentStep} of {TOTAL_STEPS}
            <span className="hidden sm:inline">
              {" "}&mdash;{" "}
              <span className="text-zinc-600">
                {STEP_LABELS[currentStep - 1]}
              </span>
            </span>
          </span>
        </div>

        {/* Progress bar: h-1 with brand-500 fill */}
        <div className="h-1 bg-zinc-100">
          <div
            className="h-full bg-brand-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*  Main content                                                        */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="shadow-card">
            <CardContent className="p-6 sm:p-8">
              {renderCurrentStep()}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/*  Navigation footer                                                   */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-white border-t border-zinc-200 sticky bottom-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Back button */}
          {currentStep > 1 ? (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          )}

          {/* Next / Submit button */}
          {currentStep < TOTAL_STEPS ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              className="min-w-[180px] bg-brand-500 hover:bg-brand-600"
            >
              {isSubmitting ? "Creating Claim..." : "Create My Claim"}
              {!isSubmitting && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}

/* ========================================================================== */
/*  Summary sub-components                                                     */
/* ========================================================================== */

function SummarySection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-zinc-100 last:border-b-0 pb-4 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-body font-semibold text-zinc-900">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-body-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
        >
          Edit
        </button>
      </div>
      <dl className="space-y-1.5">{children}</dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <dt className="text-body-sm text-zinc-400 sm:w-40 shrink-0">{label}</dt>
      <dd className="text-body-sm text-zinc-900 break-words">{value}</dd>
    </div>
  );
}
