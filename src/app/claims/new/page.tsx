"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, Search, Loader2, Camera, CheckCircle2, ImagePlus, FileText, Sparkles } from "lucide-react";
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

const US_STATES = [
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
  { value: "DC", label: "Washington D.C." },
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

  /* ---- VIN lookup state ---- */
  const [vinInput, setVinInput] = useState("");
  const [vinLoading, setVinLoading] = useState(false);
  const [vinResult, setVinResult] = useState<{ year: string; make: string; model: string; trim: string | null } | null>(null);
  const [vinError, setVinError] = useState("");

  /* ---- Insurance card scan state ---- */
  const [cardScanning, setCardScanning] = useState(false);
  const [cardScanned, setCardScanned] = useState(false);
  const [cardError, setCardError] = useState("");

  /* ---- Damage photo analysis state ---- */
  const [damageAnalyzing, setDamageAnalyzing] = useState(false);
  const [damageAnalyzed, setDamageAnalyzed] = useState(false);
  const [damageError, setDamageError] = useState("");
  const [damagePhotos, setDamagePhotos] = useState<File[]>([]);

  /* ---- Offer letter scan state ---- */
  const [offerScanning, setOfferScanning] = useState(false);
  const [offerScanned, setOfferScanned] = useState(false);
  const [offerError, setOfferError] = useState("");
  const [offerDetails, setOfferDetails] = useState<Record<string, unknown> | null>(null);

  /* ---- Track which fields were auto-filled ---- */
  const [autoFilled, setAutoFilled] = useState<Set<string>>(new Set());

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
    state: "",
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

  /* ---- Auto-fill helper ---- */
  function autoFillField<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
    updateField(key, value);
    setAutoFilled((prev) => new Set(prev).add(key as string));
  }

  /* ------------------------------------------------------------------------ */
  /*  Damage Photo Analysis                                                    */
  /* ------------------------------------------------------------------------ */

  async function handleDamagePhotoAnalysis(files: File[]) {
    if (files.length === 0) return;

    setDamagePhotos(files);
    setDamageAnalyzing(true);
    setDamageError("");
    setDamageAnalyzed(false);

    try {
      const formDataObj = new FormData();
      files.forEach((file) => formDataObj.append("files", file));

      const res = await fetch("/api/ai/analyze-damage", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (!res.ok) {
        setDamageError(data.error || "Could not analyze damage photos.");
        return;
      }

      if (data.description) {
        autoFillField("damage_description", data.description);
        setDamageAnalyzed(true);
      }
    } catch {
      setDamageError("Failed to analyze photos. Please try again.");
    } finally {
      setDamageAnalyzing(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  Offer Letter Scan                                                        */
  /* ------------------------------------------------------------------------ */

  async function handleOfferLetterScan(files: File[]) {
    if (files.length === 0) return;
    const file = files[0];

    setOfferScanning(true);
    setOfferError("");
    setOfferScanned(false);

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const res = await fetch("/api/ai/extract-offer-letter", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (!res.ok) {
        setOfferError(data.error || "Could not read offer letter.");
        return;
      }

      const ext = data.extracted;
      setOfferDetails(ext);

      // Auto-fill offer fields
      if (ext.offer_amount && typeof ext.offer_amount === "number") {
        autoFillField("offer_amount", ext.offer_amount);
        autoFillField("has_offer", true);
      }
      if (ext.insurer_name && !formData.insurer_name) {
        autoFillField("insurer_name", ext.insurer_name);
        autoFillField("filed_with_insurer", true);
      }
      if (ext.claim_number && !formData.claim_number) {
        autoFillField("claim_number", ext.claim_number);
      }

      setOfferScanned(true);
    } catch {
      setOfferError("Failed to scan offer letter. Please try again.");
    } finally {
      setOfferScanning(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  VIN Lookup                                                               */
  /* ------------------------------------------------------------------------ */

  async function handleVinLookup() {
    const cleaned = vinInput.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleaned.length !== 17) {
      setVinError("VIN must be exactly 17 characters.");
      return;
    }

    setVinLoading(true);
    setVinError("");
    setVinResult(null);

    try {
      const res = await fetch(`/api/vin?vin=${encodeURIComponent(cleaned)}`);
      const data = await res.json();

      if (!res.ok) {
        setVinError(data.error || "Could not decode VIN.");
        return;
      }

      if (data.year) autoFillField("vehicle_year", data.year);
      if (data.make) autoFillField("vehicle_make", data.make);
      if (data.model) {
        const modelWithTrim = data.trim ? `${data.model} ${data.trim}` : data.model;
        autoFillField("vehicle_model", modelWithTrim);
      }

      setVinResult({ year: data.year, make: data.make, model: data.model, trim: data.trim });
    } catch {
      setVinError("Failed to look up VIN. Please try again.");
    } finally {
      setVinLoading(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  Insurance Card Scan                                                      */
  /* ------------------------------------------------------------------------ */

  async function handleCardScan(files: File[]) {
    if (files.length === 0) return;
    const file = files[0];

    setCardScanning(true);
    setCardError("");
    setCardScanned(false);

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const res = await fetch("/api/ai/extract-card", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (!res.ok) {
        setCardError(data.error || "Could not read insurance card.");
        return;
      }

      const ext = data.extracted;

      // Auto-fill fields from extracted data
      if (ext.insurer_name && !formData.insurer_name) {
        autoFillField("insurer_name", ext.insurer_name);
      }
      if (ext.policy_number && !formData.claim_number) {
        autoFillField("claim_number", ext.policy_number);
      }
      if (ext.vehicle_year && !formData.vehicle_year) {
        autoFillField("vehicle_year", ext.vehicle_year);
      }
      if (ext.vehicle_make && !formData.vehicle_make) {
        autoFillField("vehicle_make", ext.vehicle_make);
      }
      if (ext.vehicle_model && !formData.vehicle_model) {
        autoFillField("vehicle_model", ext.vehicle_model);
      }

      // If card shows they have insurance, mark as filed
      if (ext.insurer_name) {
        autoFillField("filed_with_insurer", true);
      }

      setCardScanned(true);
    } catch {
      setCardError("Failed to scan insurance card. Please try again.");
    } finally {
      setCardScanning(false);
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

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create claim");
      }

      const claimId = data.claim.id;

      // Upload policy files to storage if any
      for (const file of policyFiles) {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("category", "policy");
        await fetch(`/api/claims/${claimId}/documents`, {
          method: "POST",
          body: uploadForm,
        });
      }

      router.push(`/claims/${claimId}`);
    } catch {
      setIsSubmitting(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*  Step Renderers                                                           */
  /* ------------------------------------------------------------------------ */

  /* ---- Step 1: Claim Type ---- */
  function renderClaimType() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-black">
            What type of claim do you have?
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
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
                  "text-left border p-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral " +
                  (isSelected
                    ? "border-black/10 border-l-4 border-l-coral bg-panel"
                    : type.enabled
                    ? "border-black/10 bg-panel hover:border-black/20 cursor-pointer"
                    : "border-black/5 bg-panel-alt cursor-not-allowed")
                }
              >
                <h3
                  className={
                    "text-body font-semibold " +
                    (type.enabled ? "text-black" : "text-[#4a555e]/60")
                  }
                >
                  {type.title}
                </h3>
                <p
                  className={
                    "mt-1 text-body-sm " +
                    (type.enabled ? "text-[#4a555e]" : "text-black/20")
                  }
                >
                  {type.description}
                </p>

                {!type.enabled && (
                  <span className="mt-2 inline-block text-caption text-[#4a555e]/60 font-medium">
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
          <h2 className="text-heading-lg text-black">
            Tell us about the accident
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
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

          {/* Damage photo analysis */}
          <div className="border border-dashed border-black/20 p-4 bg-panel-alt">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ImagePlus className="w-4.5 h-4.5 text-coral" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-medium text-black">
                  Have photos of the damage?
                </p>
                <p className="text-caption text-[#4a555e] mt-0.5">
                  Upload up to 5 photos and our AI will write the damage description for you.
                </p>
                <div className="mt-3">
                  {damageAnalyzed ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-body-sm text-success-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Description generated from {damagePhotos.length} photo{damagePhotos.length !== 1 ? "s" : ""}
                      </div>
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 bg-panel text-caption font-medium text-[#4a555e] hover:bg-panel-alt cursor-pointer transition-colors">
                        Upload different photos
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              handleDamagePhotoAnalysis(Array.from(files).slice(0, 5));
                            }
                          }}
                        />
                      </label>
                    </div>
                  ) : damageAnalyzing ? (
                    <div className="flex items-center gap-2 text-body-sm text-[#4a555e]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing damage photos...
                    </div>
                  ) : (
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 bg-panel text-body-sm font-medium text-[#4a555e] hover:bg-panel-alt cursor-pointer transition-colors">
                      <ImagePlus className="w-4 h-4" />
                      Upload damage photos
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            handleDamagePhotoAnalysis(Array.from(files).slice(0, 5));
                          }
                        }}
                      />
                    </label>
                  )}
                  {damageError && (
                    <p className="text-caption text-danger-600 mt-1">{damageError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label htmlFor="damage_description" className="block text-body-sm font-medium text-[#4a555e]">
                Describe the damage to your vehicle
              </label>
              {autoFilled.has("damage_description") && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
            </div>
            <Textarea
              id="damage_description"
              placeholder="e.g., Rear-ended at a stoplight. Bumper crushed, trunk won&apos;t close, tail lights broken. Airbags did not deploy."
              value={formData.damage_description}
              onChange={(e) => updateField("damage_description", e.target.value)}
              error={errors.damage_description}
              rows={4}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ---- Step 3: Insurance Info ---- */
  function renderInsuranceInfo() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-black">
            Insurance information
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
            Let us know where you stand with your insurance company so we can
            tailor our guidance.
          </p>
        </div>

        {/* Insurance card scan */}
        <div className="border border-dashed border-black/20 p-4 bg-panel-alt">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Camera className="w-4.5 h-4.5 text-coral" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-black">
                Have your insurance card?
              </p>
              <p className="text-caption text-[#4a555e] mt-0.5">
                Snap a photo and we&apos;ll auto-fill your insurer name, policy number, and vehicle details.
              </p>
              <div className="mt-3">
                {cardScanned ? (
                  <div className="flex items-center gap-2 text-body-sm text-success-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Fields populated from your card
                  </div>
                ) : cardScanning ? (
                  <div className="flex items-center gap-2 text-body-sm text-[#4a555e]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Reading your insurance card...
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 bg-panel text-body-sm font-medium text-[#4a555e] hover:bg-panel-alt cursor-pointer transition-colors">
                    <Camera className="w-4 h-4" />
                    Upload card photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          handleCardScan(Array.from(files));
                        }
                      }}
                    />
                  </label>
                )}
                {cardError && (
                  <p className="text-caption text-danger-600 mt-1">{cardError}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Filed with insurer? */}
          <div className="space-y-1">
            <label className="block text-body-sm font-medium text-[#4a555e]">
              Have you filed a claim with your insurer?
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => updateField("filed_with_insurer", true)}
                className={
                  "flex-1 py-2.5 px-4 border text-body-sm font-medium transition-all " +
                  (formData.filed_with_insurer
                    ? "border-coral bg-coral/5 text-black"
                    : "border-black/10 bg-panel text-[#4a555e] hover:border-black/20")
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
                  "flex-1 py-2.5 px-4 border text-body-sm font-medium transition-all " +
                  (!formData.filed_with_insurer
                    ? "border-coral bg-coral/5 text-black"
                    : "border-black/10 bg-panel text-[#4a555e] hover:border-black/20")
                }
              >
                Not yet
              </button>
            </div>
          </div>

          {/* Conditional: insurer name + claim number */}
          {formData.filed_with_insurer && (
            <div className="space-y-5 pl-4 border-l-2 border-black/5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label htmlFor="insurer_name" className="block text-body-sm font-medium text-[#4a555e]">
                    Insurance company name
                  </label>
                  {autoFilled.has("insurer_name") && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                </div>
                <Input
                  id="insurer_name"
                  placeholder="e.g., State Farm, GEICO, Progressive"
                  value={formData.insurer_name}
                  onChange={(e) => updateField("insurer_name", e.target.value)}
                  error={errors.insurer_name}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label htmlFor="claim_number" className="block text-body-sm font-medium text-[#4a555e]">
                    Claim number (optional)
                  </label>
                  {autoFilled.has("claim_number") && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                </div>
                <Input
                  id="claim_number"
                  placeholder="e.g., CLM-2024-123456"
                  value={formData.claim_number}
                  onChange={(e) => updateField("claim_number", e.target.value)}
                  hint="You can find this on any correspondence from your insurer."
                />
              </div>
            </div>
          )}

          {/* Have you received an offer? */}
          <div className="space-y-1">
            <label className="block text-body-sm font-medium text-[#4a555e]">
              Have you received a settlement offer?
            </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => updateField("has_offer", true)}
                className={
                  "flex-1 py-2.5 px-4 border text-body-sm font-medium transition-all " +
                  (formData.has_offer
                    ? "border-coral bg-coral/5 text-black"
                    : "border-black/10 bg-panel text-[#4a555e] hover:border-black/20")
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
                  "flex-1 py-2.5 px-4 border text-body-sm font-medium transition-all " +
                  (!formData.has_offer
                    ? "border-coral bg-coral/5 text-black"
                    : "border-black/10 bg-panel text-[#4a555e] hover:border-black/20")
                }
              >
                No
              </button>
            </div>
          </div>

          {/* Conditional: offer amount + letter scan */}
          {formData.has_offer && (
            <div className="pl-4 border-l-2 border-black/5 space-y-4">
              {/* Offer letter scan */}
              <div className="border border-dashed border-black/20 p-3 bg-panel-alt">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-black">
                      Have the offer letter?
                    </p>
                    <p className="text-caption text-[#4a555e] mt-0.5">
                      Upload a photo and we&apos;ll extract the amount, adjuster info, and breakdown.
                    </p>
                    <div className="mt-2">
                      {offerScanned ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-body-sm text-success-600">
                            <CheckCircle2 className="w-4 h-4" />
                            Offer details extracted
                          </div>
                          {offerDetails && offerDetails.adjuster_name ? (
                            <p className="text-caption text-[#4a555e]">
                              Adjuster: {String(offerDetails.adjuster_name)}
                              {offerDetails.adjuster_phone ? ` (${String(offerDetails.adjuster_phone)})` : ""}
                            </p>
                          ) : null}
                        </div>
                      ) : offerScanning ? (
                        <div className="flex items-center gap-2 text-body-sm text-[#4a555e]">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Reading offer letter...
                        </div>
                      ) : (
                        <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 bg-panel text-caption font-medium text-[#4a555e] hover:bg-panel-alt cursor-pointer transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          Upload offer letter
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                handleOfferLetterScan(Array.from(files));
                              }
                            }}
                          />
                        </label>
                      )}
                      {offerError && (
                        <p className="text-caption text-danger-600 mt-1">{offerError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label htmlFor="offer_amount" className="block text-body-sm font-medium text-[#4a555e]">
                    Settlement offer amount
                  </label>
                  {autoFilled.has("offer_amount") && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                </div>
                <Input
                  id="offer_amount"
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
            </div>
          )}

          {/* State selection */}
          <Select
            id="state"
            label="What state did the accident occur in?"
            options={US_STATES}
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
            placeholder="Select a state..."
          />
          <p className="text-caption text-[#4a555e]/60 -mt-4">
            Insurance laws vary by state. This helps us tailor guidance to your specific rights.
          </p>
        </div>
      </div>
    );
  }

  /* ---- Step 4: Vehicle Info ---- */
  function renderVehicleInfo() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-black">
            Your vehicle details
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
            We need basic vehicle information to look up comparable values and
            assess the fairness of any offer.
          </p>
        </div>

        {/* VIN Lookup */}
        <div className="border border-dashed border-black/20 p-4 bg-panel-alt">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Search className="w-4.5 h-4.5 text-coral" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-black">
                Know your VIN?
              </p>
              <p className="text-caption text-[#4a555e] mt-0.5">
                Enter your 17-character VIN and we&apos;ll auto-fill year, make, and model.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={vinInput}
                  onChange={(e) => {
                    setVinInput(e.target.value.toUpperCase());
                    setVinError("");
                  }}
                  placeholder="e.g., 1HGCV1F34NA012345"
                  maxLength={17}
                  className="flex-1 min-w-0 border border-black/10 bg-panel px-3 py-1.5 text-body-sm text-black placeholder:text-[#4a555e]/60 focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral font-mono"
                />
                <button
                  type="button"
                  onClick={handleVinLookup}
                  disabled={vinLoading || vinInput.length < 17}
                  className="px-3 py-1.5 bg-black text-white text-body-sm font-medium hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {vinLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Decode
                </button>
              </div>
              {vinError && (
                <p className="text-caption text-danger-600 mt-1">{vinError}</p>
              )}
              {vinResult && (
                <div className="flex items-center gap-2 text-body-sm text-success-600 mt-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Found: {vinResult.year} {vinResult.make} {vinResult.model}{vinResult.trim ? ` ${vinResult.trim}` : ""}
                </div>
              )}
              <p className="text-caption text-[#4a555e]/60 mt-2">
                Find your VIN on your registration, insurance card, or driver-side door jamb.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-panel px-3 text-caption text-[#4a555e]/60">or enter manually</span>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label htmlFor="vehicle_year" className="block text-body-sm font-medium text-[#4a555e]">Year</label>
              {autoFilled.has("vehicle_year") && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
            </div>
            <Input
              id="vehicle_year"
              placeholder="e.g., 2021"
              value={formData.vehicle_year}
              onChange={(e) => updateField("vehicle_year", e.target.value)}
              error={errors.vehicle_year}
              maxLength={4}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label htmlFor="vehicle_make" className="block text-body-sm font-medium text-[#4a555e]">Make</label>
              {autoFilled.has("vehicle_make") && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
            </div>
            <Input
              id="vehicle_make"
              placeholder="e.g., Toyota"
              value={formData.vehicle_make}
              onChange={(e) => updateField("vehicle_make", e.target.value)}
              error={errors.vehicle_make}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label htmlFor="vehicle_model" className="block text-body-sm font-medium text-[#4a555e]">Model</label>
              {autoFilled.has("vehicle_model") && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-coral/5 text-caption text-coral">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
            </div>
            <Input
              id="vehicle_model"
              placeholder="e.g., Camry SE"
              value={formData.vehicle_model}
              onChange={(e) => updateField("vehicle_model", e.target.value)}
              error={errors.vehicle_model}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ---- Step 5: Policy Upload ---- */
  function renderPolicyUpload() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-heading-lg text-black">
            Upload your insurance policy
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
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

        <div className="border border-black/10 p-4">
          <p className="text-body-sm font-medium text-black">
            Where do I find my policy?
          </p>
          <ul className="mt-2 list-disc pl-4 space-y-1 text-body-sm text-[#4a555e]">
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
          <h2 className="text-heading-lg text-black">
            Review your information
          </h2>
          <p className="mt-2 text-body text-[#4a555e]">
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
            {formData.state && (
              <SummaryRow
                label="State"
                value={US_STATES.find((s) => s.value === formData.state)?.label || formData.state}
              />
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
        <div className="border border-black/10 p-4">
          <p className="text-body-sm text-[#4a555e] leading-relaxed">
            <span className="font-medium text-[#4a555e]">Disclaimer:</span>{" "}
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
    <div className="min-h-screen bg-frame flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/*  Header + Progress bar                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="bg-panel border-b border-black/10 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            <span className="text-black">Claim</span>
            <span className="text-black">Coach</span>
          </Link>

          <span className="text-caption text-[#4a555e]/60">
            Step {currentStep} of {TOTAL_STEPS}
            <span className="hidden sm:inline">
              {" "}&mdash;{" "}
              <span className="text-[#4a555e]">
                {STEP_LABELS[currentStep - 1]}
              </span>
            </span>
          </span>
        </div>

        {/* Progress bar: h-1 with coral fill */}
        <div className="h-1 bg-black/10">
          <div
            className="h-full bg-coral transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*  Main content                                                        */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card>
            <CardContent className="p-6 sm:p-8">
              {renderCurrentStep()}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/*  Navigation footer                                                   */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-panel border-t border-black/10 sticky bottom-0 z-30">
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
              className="sm:min-w-[180px] bg-black hover:bg-black"
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
    <div className="border-b border-black/5 last:border-b-0 pb-4 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-body font-semibold text-black">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-body-sm text-coral hover:text-coral font-medium transition-colors"
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
      <dt className="text-body-sm text-[#4a555e]/60 sm:w-40 shrink-0">{label}</dt>
      <dd className="text-body-sm text-black break-words">{value}</dd>
    </div>
  );
}
