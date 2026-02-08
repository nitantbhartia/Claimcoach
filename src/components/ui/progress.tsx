import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "brand" | "success" | "warning" | "danger";
  showLabel?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  color = "brand",
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const colors = {
    brand: "bg-coral",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-200 overflow-hidden", sizes[size])}>
        <div
          className={cn("h-full transition-all duration-500 ease-out", colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
