"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClaimLayout } from "@/components/layout/claim-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { autoClaimChecklist } from "@/lib/utils/checklist";
import { ChecklistItem, FinancialImpact } from "@/types";
import {
  Camera,
  CheckCircle2,
  Circle,
  Plus,
  DollarSign,
  Trash2,
  Image as ImageIcon,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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

const CATEGORY_ORDER = [
  "vehicle_damage",
  "accident_scene",
  "other",
  "police_report",
];

function groupByCategory(items: ChecklistItem[]): Record<string, ChecklistItem[]> {
  const groups: Record<string, ChecklistItem[]> = {};
  for (const item of items) {
    const cat = item.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
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

const MOCK_UPLOADED_DOCUMENTS = [
  {
    id: "doc-1",
    fileName: "front-bumper-damage.jpg",
    fileType: "image/jpeg",
    category: "vehicle_damage",
    uploadedAt: "2025-12-01T14:23:00Z",
    size: 2_340_000,
    thumbnailUrl: "/placeholder-car-front.jpg",
  },
  {
    id: "doc-2",
    fileName: "rear-view.jpg",
    fileType: "image/jpeg",
    category: "vehicle_damage",
    uploadedAt: "2025-12-01T14:24:00Z",
    size: 1_870_000,
    thumbnailUrl: "/placeholder-car-rear.jpg",
  },
  {
    id: "doc-3",
    fileName: "police-report-SF-2025.pdf",
    fileType: "application/pdf",
    category: "police_report",
    uploadedAt: "2025-12-02T09:10:00Z",
    size: 456_000,
    thumbnailUrl: null,
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

// Items pre-completed to match mock uploaded documents
const INITIAL_COMPLETED_IDS = new Set(["photo-front", "photo-rear", "police-report"]);

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function DocumentsPage() {
  const params = useParams<{ id: string }>();
  const claimId = params.id;

  // ---- Checklist state ----
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() =>
    autoClaimChecklist.map((item) => ({
      ...item,
      completed: INITIAL_COMPLETED_IDS.has(item.id),
    }))
  );
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  // ---- Expense state ----
  const [expenses, setExpenses] = useState<FinancialImpact[]>(MOCK_INITIAL_EXPENSES);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
  });

  // ---- Derived values ----
  const grouped = groupByCategory(checklist);
  const totalItems = checklist.length;
  const completedItems = checklist.filter((i) => i.completed).length;
  const requiredItems = checklist.filter((i) => i.required);
  const completedRequired = requiredItems.filter((i) => i.completed).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  // ---- Handlers ----
  function toggleItem(id: string) {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function toggleSection(category: string) {
    setCollapsedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  function handleUploadClick(itemId: string) {
    setActiveUploadId((prev) => (prev === itemId ? null : itemId));
  }

  function handleFilesSelected(_files: File[]) {
    // In a real app this would upload to storage and mark the item complete.
    // For now this is a no-op placeholder.
  }

  function addExpense() {
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.date) {
      return;
    }
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
    const match = EXPENSE_CATEGORIES.find((c) => c.value === value);
    return match ? match.label : value;
  }

  // ---- Render ----
  return (
    <ClaimLayout claimId={claimId}>
      <div className="space-y-8">
        {/* --------------------------------------------------------------- */}
        {/* 1. Documentation Progress                                       */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Claim Documentation
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Gather photos, documents, and expense records to strengthen
                  your claim.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge variant="info" size="md">
                  {completedRequired} of {requiredItems.length} required
                </Badge>
                <Badge variant="default" size="md">
                  {completedItems} of {totalItems} total
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Overall progress</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress
                value={completedItems}
                max={totalItems}
                size="lg"
                color={progressPercent === 100 ? "success" : "brand"}
              />
            </div>

            {completedRequired < requiredItems.length && (
              <div className="mt-4 flex items-start gap-3 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">
                    {requiredItems.length - completedRequired} required{" "}
                    {requiredItems.length - completedRequired === 1
                      ? "item"
                      : "items"}{" "}
                    remaining.
                  </span>{" "}
                  Complete all required items before submitting your claim for
                  the best chance of a fair settlement.
                </p>
              </div>
            )}

            {completedRequired === requiredItems.length && (
              <div className="mt-4 flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">
                  <span className="font-semibold">All required items complete!</span>{" "}
                  Consider filling in the optional items for an even stronger claim.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 2. Photo Checklist                                              */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Photo &amp; Document Checklist
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((category) => {
              const items = grouped[category];
              const isCollapsed = collapsedSections[category] ?? false;
              const catCompleted = items.filter((i) => i.completed).length;
              const catRequired = items.filter((i) => i.required).length;
              const catRequiredDone = items.filter(
                (i) => i.required && i.completed
              ).length;

              return (
                <div key={category} className="border-b border-gray-100 last:border-b-0">
                  {/* Section header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(category)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {CATEGORY_LABELS[category] ?? category}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {catCompleted}/{items.length} done
                        {catRequired > 0 && (
                          <span className="ml-1">
                            ({catRequiredDone}/{catRequired} required)
                          </span>
                        )}
                      </span>
                      {catRequiredDone === catRequired && catRequired > 0 && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Section items */}
                  {!isCollapsed && (
                    <ul className="pb-2">
                      {items.map((item) => (
                        <li key={item.id}>
                          <div className="flex items-start gap-3 px-6 py-3 hover:bg-gray-50 transition-colors">
                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={() => toggleItem(item.id)}
                              className="mt-0.5 flex-shrink-0 focus:outline-none"
                              aria-label={
                                item.completed
                                  ? `Mark "${item.label}" incomplete`
                                  : `Mark "${item.label}" complete`
                              }
                            >
                              {item.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                              )}
                            </button>

                            {/* Label & description */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-sm font-medium ${
                                    item.completed
                                      ? "text-gray-400 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {item.required ? (
                                  <Badge variant="danger" size="sm">
                                    Required
                                  </Badge>
                                ) : (
                                  <Badge variant="default" size="sm">
                                    Optional
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            {/* Upload button */}
                            <Button
                              variant={
                                activeUploadId === item.id ? "primary" : "outline"
                              }
                              size="sm"
                              onClick={() => handleUploadClick(item.id)}
                              className="flex-shrink-0"
                            >
                              <Camera className="w-4 h-4 mr-1" />
                              Upload
                            </Button>
                          </div>

                          {/* Inline upload area */}
                          {activeUploadId === item.id && (
                            <div className="px-6 pb-4 pl-14">
                              <FileUpload
                                onFilesSelected={handleFilesSelected}
                                label={`Upload: ${item.label}`}
                                hint="Drag and drop photos or PDFs, or click to browse. Max 10 MB per file."
                                maxFiles={5}
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 3. Financial Impact Tracker                                     */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Financial Impact Tracker
              </h2>
              <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <DollarSign className="w-5 h-5 text-green-600" />
                {formatCurrency(expenseTotal)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Expense list */}
            {expenses.length > 0 && (
              <div className="mb-6 space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">
                          {expense.description}
                        </span>
                        <Badge variant="default" size="sm">
                          {formatExpenseCategory(expense.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {formatCurrency(expense.amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExpense(expense.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label={`Remove expense: ${expense.description}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Running total */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    Total ({expenses.length}{" "}
                    {expenses.length === 1 ? "expense" : "expenses"})
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {formatCurrency(expenseTotal)}
                  </span>
                </div>
              </div>
            )}

            {expenses.length === 0 && (
              <div className="mb-6 text-center py-6 text-gray-400">
                <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  No expenses tracked yet. Add your first expense below.
                </p>
              </div>
            )}

            {/* Add expense form */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Add Expense
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Select
                  id="expense-category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  options={EXPENSE_CATEGORIES}
                  placeholder="Category"
                />
                <Input
                  id="expense-description"
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="Amount ($)"
                  min="0"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
                <Input
                  id="expense-date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  onClick={addExpense}
                  disabled={
                    !newExpense.category ||
                    !newExpense.description ||
                    !newExpense.amount ||
                    !newExpense.date
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Expense
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --------------------------------------------------------------- */}
        {/* 4. Uploaded Files Preview                                       */}
        {/* --------------------------------------------------------------- */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Uploaded Files
              </h2>
              <Badge variant="info" size="md">
                {MOCK_UPLOADED_DOCUMENTS.length}{" "}
                {MOCK_UPLOADED_DOCUMENTS.length === 1 ? "file" : "files"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {MOCK_UPLOADED_DOCUMENTS.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No files uploaded yet.</p>
              </div>
            )}

            {MOCK_UPLOADED_DOCUMENTS.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_UPLOADED_DOCUMENTS.map((doc) => {
                  const isImage = doc.fileType.startsWith("image/");
                  return (
                    <div
                      key={doc.id}
                      className="group relative rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Thumbnail area */}
                      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                        {isImage ? (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <ImageIcon className="w-10 h-10 text-gray-300" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                            <FileText className="w-10 h-10 text-red-300" />
                          </div>
                        )}
                      </div>

                      {/* Category badge overlay */}
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant={isImage ? "info" : "warning"}
                          size="sm"
                        >
                          {CATEGORY_LABELS[doc.category] ?? doc.category}
                        </Badge>
                      </div>

                      {/* File info */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.fileName}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {formatFileSize(doc.size)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClaimLayout>
  );
}
