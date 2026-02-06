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
    if (clampedScore >= 80) return { stroke: "#22c55e", text: "text-green-600", bg: "bg-green-50" };
    if (clampedScore >= 60) return { stroke: "#f59e0b", text: "text-yellow-600", bg: "bg-yellow-50" };
    return { stroke: "#ef4444", text: "text-red-600", bg: "bg-red-50" };
  };

  const getLabel = () => {
    if (clampedScore >= 80) return "Fair";
    if (clampedScore >= 60) return "Borderline";
    return "Below Fair Value";
  };

  const color = getColor();

  const sizes = {
    sm: { container: "w-24 h-24", text: "text-xl", label: "text-xs" },
    md: { container: "w-36 h-36", text: "text-3xl", label: "text-sm" },
    lg: { container: "w-48 h-48", text: "text-4xl", label: "text-base" },
  };

  const s = sizes[size];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", s.container)}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
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
          <span className={cn("font-bold", s.text, color.text)}>{clampedScore}</span>
          <span className={cn("font-medium text-gray-500", s.label)}>/ 100</span>
        </div>
      </div>
      <div className={cn("px-3 py-1 rounded-full font-medium", s.label, color.bg, color.text)}>
        {label || getLabel()}
      </div>
    </div>
  );
}
