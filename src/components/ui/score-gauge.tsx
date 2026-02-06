"use client";

import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function ScoreGauge({ score, size = "md", label, className }: ScoreGaugeProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  const getColor = () => {
    if (clampedScore >= 80) return { stroke: "#10b981", text: "text-accent-500" };
    if (clampedScore >= 60) return { stroke: "#f59e0b", text: "text-warning-500" };
    return { stroke: "#ef4444", text: "text-danger-500" };
  };

  const getLabel = () => {
    if (clampedScore >= 80) return "Fair";
    if (clampedScore >= 60) return "Borderline";
    return "Below Fair Value";
  };

  const color = getColor();

  const sizes = {
    sm: { container: "w-24 h-24", number: "text-heading-lg", sub: "text-caption", label: "text-caption" },
    md: { container: "w-36 h-36", number: "text-display-sm", sub: "text-body-sm", label: "text-body-sm" },
    lg: { container: "w-48 h-48", number: "text-display", sub: "text-body", label: "text-body" },
  };

  const s = sizes[size];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", s.container)}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring: zinc-200 */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="8"
          />
          {/* Score ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", s.number, color.text)}>{clampedScore}</span>
          <span className={cn("font-medium text-zinc-400", s.sub)}>/ 100</span>
        </div>
      </div>
      {/* Plain text label below gauge -- no colored bg pill */}
      <span className={cn("font-medium text-zinc-500", s.label)}>
        {label || getLabel()}
      </span>
    </div>
  );
}
