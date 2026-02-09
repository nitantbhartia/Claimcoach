"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { autoClaimChecklist } from "@/lib/utils/checklist";
import { ChecklistItem, FinancialImpact } from "@/types";
import { Check, Circle, ChevronDown, ChevronUp, Plus, Trash2, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Category helpers
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  vehicle_damage: "Vehicle Damage",
  accident_scene: "Accident Scene",
  other: "Third-Party Info",
  police_report: "Police Report",
};

const CATEGORY_ORDER = ["vehicle_damage", "accident_scene", "other", "police_report"];

function groupByCategory(items: ChecklistItem[]): Record<string, ChecklistItem[]> {
  const groups: Record<string, ChecklistItem[]> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Expense categories
// ---------------------------------------------------------------------------

const EXPENSE_CATEGORIES = [
  { value: "rental_car", label: "Rental Car" },
  { value: "towing", label: "Towing" },
  { value: "missed_work", label: "Missed Work" },
  { value: "transportation", label: "Transportation" },
  { value: "medical", label: "Medical" },
  { value: "repair_estimate", label: "Repair Estimate" },
  { value: "other", label: "Other" },
];

// ---------------------------------------------------------------------------
// Uploaded file shape (matches API response)
// ---------------------------------------------------------------------------

interface UploadedFile {
  id: string;
  claim_id: string;
  category: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  notes: string | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function DocumentsPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  // Loading state
  const [loading, setLoading] = useState(true);

  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() =>
    autoClaimChecklist.map((item) => ({
      ...item,
      completed: false,
    }))
  );
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  // Uploaded files state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Expense state
  const [expenses, setExpenses] = useState<FinancialImpact[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
  });

  // Fetch claim data on mount
  useEffect(() => {
    async function fetchClaimData() {
      try {
        const res = await fetch(`/api/claims/${claimId}`);
        if (res.ok) {
          const data = await res.json();

          // Initialize uploaded files from fetched documents
          if (data.documents) {
            setUploadedFiles(data.documents);
          }

          // Initialize expenses from fetched data
          if (data.expenses) {
            setExpenses(data.expenses);
          }

          // Mark checklist items as completed based on existing documents
          if (data.documents && data.documents.length > 0) {
            const docCategories = new Set(
              data.documents.map((doc: UploadedFile) => doc.category)
            );
            setChecklist((prev) =>
              prev.map((item) => ({
                ...item,
                completed: docCategories.has(item.category),
              }))
            );
          }
        }
      } catch {
        // Silently handle fetch errors; user sees empty state
      } finally {
        setLoading(false);
      }
    }

    fetchClaimData();
  }, [claimId]);

  // Derived
  const grouped = groupByCategory(checklist);
  const requiredItems = checklist.filter((i) => i.required);
  const completedRequired = requiredItems.filter((i) => i.completed).length;
  const progressPercent =
    requiredItems.length > 0 ? (completedRequired / requiredItems.length) * 100 : 0;
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Handlers
  function toggleItem(id: string) {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  }

  function toggleSection(category: string) {
    setCollapsedSections((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  function handleUploadClick(itemId: string) {
    setActiveUploadId((prev) => (prev === itemId ? null : itemId));
  }

  async function handleFilesSelected(files: File[], itemId?: string) {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", checklist.find((i) => i.id === itemId)?.category || "other");
      const res = await fetch(`/api/claims/${claimId}/documents`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedFiles((prev) => [data.document, ...prev]);
      }
    }
    if (itemId) {
      toggleItem(itemId);
    }
  }

  async function addExpense() {
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.date)
      return;
    const body = {
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
    };
    try {
      const res = await fetch(`/api/claims/${claimId}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        setExpenses((prev) => [...prev, data.expense]);
        setNewExpense({ category: "", description: "", amount: "", date: "" });
      }
    } catch {
      // Silently handle errors
    }
  }

  async function removeExpense(id: string) {
    try {
      const res = await fetch(`/api/claims/${claimId}/expenses`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      // Silently handle errors
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    return `${(bytes / 1_000).toFixed(0)} KB`;
  }

  function formatExpenseCategory(value: string): string {
    return EXPENSE_CATEGORIES.find((c) => c.value === value)?.label ?? value;
  }

  if (loading) {
    return (
      <ClaimLayout claimId={claimId}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[#4a555e]" />
        </div>
      </ClaimLayout>
    );
  }

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-10">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <h1 className="text-heading-lg text-black">Documentation</h1>
          <p className="text-body-sm text-[#4a555e] mt-1">
            {completedRequired} of {requiredItems.length} required items completed
          </p>
          <div className="mt-3 h-1 w-full rounded-full bg-black/10">
            <div
              className="h-1 rounded-full bg-black transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Checklist                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-panel border border-black/10">
          {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((category, catIdx) => {
            const items = grouped[category];
            const isCollapsed = collapsedSections[category] ?? false;
            const catCompleted = items.filter((i) => i.completed).length;

            return (
              <div key={category} className={catIdx > 0 ? "border-t border-black/10" : ""}>
                {/* Section header */}
                <button
                  type="button"
                  onClick={() => toggleSection(category)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-panel-alt transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-body-sm font-medium uppercase tracking-wider text-[#4a555e] truncate">
                      {CATEGORY_LABELS[category] ?? category}
                    </span>
                    <span className="text-caption text-[#4a555e]">
                      {catCompleted}/{items.length}
                    </span>
                  </div>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-[#4a555e]" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-[#4a555e]" />
                  )}
                </button>

                {/* Section items */}
                {!isCollapsed && (
                  <div>
                    {items.map((item, i) => (
                      <div key={item.id}>
                        {i > 0 && <div className="mx-5 border-t border-black/10" />}
                        <div className="flex items-center gap-3 px-5 py-2.5">
                          {/* Checkbox */}
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 focus:outline-none"
                            aria-label={
                              item.completed
                                ? `Mark "${item.label}" incomplete`
                                : `Mark "${item.label}" complete`
                            }
                          >
                            {item.completed ? (
                              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <Circle className="w-5 h-5 text-[#4a555e]" />
                            )}
                          </button>

                          {/* Label */}
                          <span
                            className={`flex-1 text-body-sm ${
                              item.completed ? "line-through text-[#4a555e]" : "text-black"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Required / Optional -- hide on small screens */}
                          <span className="hidden sm:inline text-caption text-[#4a555e] flex-shrink-0">
                            {item.required ? "Required" : "Optional"}
                          </span>

                          {/* Upload toggle */}
                          <button
                            type="button"
                            onClick={() => handleUploadClick(item.id)}
                            className="text-body-sm text-black hover:text-black transition-colors flex-shrink-0"
                          >
                            Upload
                          </button>
                        </div>

                        {/* Inline file upload */}
                        {activeUploadId === item.id && (
                          <div className="px-5 pb-3 ml-8">
                            <FileUpload
                              onFilesSelected={(files) => handleFilesSelected(files, item.id)}
                              label={`Upload: ${item.label}`}
                              hint="Drag and drop photos or PDFs, or click to browse. Max 10 MB per file."
                              maxFiles={5}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Expenses                                                         */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-heading text-black">Expenses</h2>
            <span className="text-heading text-black">{formatCurrency(expenseTotal)}</span>
          </div>

          {expenses.length > 0 && (
            <div className="bg-panel border border-black/10 divide-y divide-black/10">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-black truncate">
                      {expense.description}
                    </p>
                    <p className="text-caption text-[#4a555e] sm:hidden">
                      {formatExpenseCategory(expense.category)}
                    </p>
                  </div>
                  <span className="hidden sm:inline text-caption text-[#4a555e] flex-shrink-0">
                    {formatExpenseCategory(expense.category)}
                  </span>
                  <span className="text-body-sm font-medium text-black flex-shrink-0">
                    {formatCurrency(expense.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExpense(expense.id)}
                    className="p-1 text-[#4a555e] hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label={`Remove expense: ${expense.description}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {expenses.length === 0 && (
            <p className="text-body-sm text-[#4a555e] py-6 text-center">
              No expenses tracked yet. Add your first below.
            </p>
          )}

          {/* Add expense form */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Select
                id="expense-category"
                value={newExpense.category}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, category: e.target.value }))}
                options={EXPENSE_CATEGORIES}
                placeholder="Category"
              />
            </div>
            <div>
              <Input
                id="expense-description"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Input
                id="expense-amount"
                type="number"
                placeholder="Amount ($)"
                min="0"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Input
                id="expense-date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                size="sm"
                onClick={addExpense}
                disabled={
                  !newExpense.category ||
                  !newExpense.description ||
                  !newExpense.amount ||
                  !newExpense.date
                }
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Files                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-heading text-black">Files</h2>
            <span className="text-body-sm text-[#4a555e]">{uploadedFiles.length}</span>
          </div>

          {uploadedFiles.length > 0 ? (
            <div className="bg-panel border border-black/10 divide-y divide-black/10">
              {uploadedFiles.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-black truncate">
                      {doc.file_name}
                    </p>
                    <p className="text-caption text-[#4a555e] sm:hidden">
                      {CATEGORY_LABELS[doc.category] ?? doc.category} &middot; {formatFileSize(doc.file_size)}
                    </p>
                  </div>
                  <span className="hidden sm:inline text-caption text-[#4a555e] flex-shrink-0">
                    {CATEGORY_LABELS[doc.category] ?? doc.category}
                  </span>
                  <span className="hidden sm:inline text-caption text-[#4a555e] flex-shrink-0">
                    {formatFileSize(doc.file_size)}
                  </span>
                  <span className="text-caption text-[#4a555e] flex-shrink-0">
                    {new Date(doc.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-[#4a555e] py-6 text-center">No files uploaded yet.</p>
          )}
        </div>
      </div>
    </ClaimLayout>
  );
}
