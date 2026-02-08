"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { autoClaimChecklist } from "@/lib/utils/checklist";
import { ChecklistItem, FinancialImpact } from "@/types";
import { Check, Circle, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
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
// Mock data
// ---------------------------------------------------------------------------

const MOCK_UPLOADED_FILES = [
  {
    id: "doc-1",
    fileName: "front-bumper-damage.jpg",
    fileType: "image/jpeg",
    category: "vehicle_damage",
    uploadedAt: "2025-12-01T14:23:00Z",
    size: 2_340_000,
  },
  {
    id: "doc-2",
    fileName: "rear-view.jpg",
    fileType: "image/jpeg",
    category: "vehicle_damage",
    uploadedAt: "2025-12-01T14:24:00Z",
    size: 1_870_000,
  },
  {
    id: "doc-3",
    fileName: "police-report-SF-2025.pdf",
    fileType: "application/pdf",
    category: "police_report",
    uploadedAt: "2025-12-02T09:10:00Z",
    size: 456_000,
  },
];

const MOCK_INITIAL_EXPENSES: FinancialImpact[] = [
  {
    id: "exp-1",
    claim_id: "demo-claim-001",
    category: "rental_car",
    description: "Enterprise rental - 5 days while car in shop",
    amount: 247,
    date: "2025-12-03",
    receipt_url: null,
  },
  {
    id: "exp-2",
    claim_id: "demo-claim-001",
    category: "towing",
    description: "AAA tow from accident scene to body shop",
    amount: 185,
    date: "2025-11-14",
    receipt_url: null,
  },
];

const INITIAL_COMPLETED_IDS = new Set(["photo-front", "photo-rear", "police-report"]);

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function DocumentsPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() =>
    autoClaimChecklist.map((item) => ({
      ...item,
      completed: INITIAL_COMPLETED_IDS.has(item.id),
    }))
  );
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  // Expense state
  const [expenses, setExpenses] = useState<FinancialImpact[]>(MOCK_INITIAL_EXPENSES);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
  });

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

  function handleFilesSelected(_files: File[]) {
    // Placeholder: would upload to storage and mark item complete
  }

  function addExpense() {
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.date)
      return;
    const expense: FinancialImpact = {
      id: `exp-${Date.now()}`,
      claim_id: claimId,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
      receipt_url: null,
    };
    setExpenses((prev) => [...prev, expense]);
    setNewExpense({ category: "", description: "", amount: "", date: "" });
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function formatFileSize(bytes: number): string {
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    return `${(bytes / 1_000).toFixed(0)} KB`;
  }

  function formatExpenseCategory(value: string): string {
    return EXPENSE_CATEGORIES.find((c) => c.value === value)?.label ?? value;
  }

  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-10">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <h1 className="text-heading-lg text-slate-900">Documentation</h1>
          <p className="text-body-sm text-slate-500 mt-1">
            {completedRequired} of {requiredItems.length} required items completed
          </p>
          <div className="mt-3 h-1 w-full rounded-full bg-slate-200">
            <div
              className="h-1 rounded-full bg-ink-800 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Checklist                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card">
          {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((category, catIdx) => {
            const items = grouped[category];
            const isCollapsed = collapsedSections[category] ?? false;
            const catCompleted = items.filter((i) => i.completed).length;

            return (
              <div key={category} className={catIdx > 0 ? "border-t border-slate-200" : ""}>
                {/* Section header */}
                <button
                  type="button"
                  onClick={() => toggleSection(category)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-body-sm font-medium uppercase tracking-wider text-slate-400">
                      {CATEGORY_LABELS[category] ?? category}
                    </span>
                    <span className="text-caption text-slate-400">
                      {catCompleted}/{items.length}
                    </span>
                  </div>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Section items */}
                {!isCollapsed && (
                  <div>
                    {items.map((item, i) => (
                      <div key={item.id}>
                        {i > 0 && <div className="mx-5 border-t border-slate-100" />}
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
                              <div className="w-5 h-5 rounded-full bg-ink-800 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300" />
                            )}
                          </button>

                          {/* Label */}
                          <span
                            className={`flex-1 text-body-sm ${
                              item.completed ? "line-through text-slate-400" : "text-slate-900"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Required / Optional -- hide on small screens */}
                          <span className="hidden sm:inline text-caption text-slate-400 flex-shrink-0">
                            {item.required ? "Required" : "Optional"}
                          </span>

                          {/* Upload toggle */}
                          <button
                            type="button"
                            onClick={() => handleUploadClick(item.id)}
                            className="text-body-sm text-ink-800 hover:text-ink-800 transition-colors flex-shrink-0"
                          >
                            Upload
                          </button>
                        </div>

                        {/* Inline file upload */}
                        {activeUploadId === item.id && (
                          <div className="px-5 pb-3 ml-8">
                            <FileUpload
                              onFilesSelected={handleFilesSelected}
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
            <h2 className="text-heading text-slate-900">Expenses</h2>
            <span className="text-heading text-slate-900">{formatCurrency(expenseTotal)}</span>
          </div>

          {expenses.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-card divide-y divide-slate-100">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-slate-900 truncate">
                      {expense.description}
                    </p>
                    <p className="text-caption text-slate-400 sm:hidden">
                      {formatExpenseCategory(expense.category)}
                    </p>
                  </div>
                  <span className="hidden sm:inline text-caption text-slate-400 flex-shrink-0">
                    {formatExpenseCategory(expense.category)}
                  </span>
                  <span className="text-body-sm font-medium text-slate-900 flex-shrink-0">
                    {formatCurrency(expense.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExpense(expense.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label={`Remove expense: ${expense.description}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {expenses.length === 0 && (
            <p className="text-body-sm text-slate-400 py-6 text-center">
              No expenses tracked yet. Add your first below.
            </p>
          )}

          {/* Add expense form */}
          <div className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-2">
            <div className="sm:w-40">
              <Select
                id="expense-category"
                value={newExpense.category}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, category: e.target.value }))}
                options={EXPENSE_CATEGORIES}
                placeholder="Category"
              />
            </div>
            <div className="sm:flex-1 sm:min-w-[140px]">
              <Input
                id="expense-description"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 sm:w-28 sm:flex-initial">
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
              <div className="flex-1 sm:w-36 sm:flex-initial">
                <Input
                  id="expense-date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>
            <Button
              size="sm"
              onClick={addExpense}
              disabled={
                !newExpense.category ||
                !newExpense.description ||
                !newExpense.amount ||
                !newExpense.date
              }
              className="w-full sm:w-auto flex-shrink-0"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Files                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-heading text-slate-900">Files</h2>
            <span className="text-body-sm text-slate-400">{MOCK_UPLOADED_FILES.length}</span>
          </div>

          {MOCK_UPLOADED_FILES.length > 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-card divide-y divide-slate-100">
              {MOCK_UPLOADED_FILES.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-slate-900 truncate">
                      {doc.fileName}
                    </p>
                    <p className="text-caption text-slate-400 sm:hidden">
                      {CATEGORY_LABELS[doc.category] ?? doc.category} &middot; {formatFileSize(doc.size)}
                    </p>
                  </div>
                  <span className="hidden sm:inline text-caption text-slate-400 flex-shrink-0">
                    {CATEGORY_LABELS[doc.category] ?? doc.category}
                  </span>
                  <span className="hidden sm:inline text-caption text-slate-400 flex-shrink-0">
                    {formatFileSize(doc.size)}
                  </span>
                  <span className="text-caption text-slate-400 flex-shrink-0">
                    {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-slate-400 py-6 text-center">No files uploaded yet.</p>
          )}
        </div>
      </div>
    </ClaimLayout>
  );
}
