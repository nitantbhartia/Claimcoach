import { Lightbulb } from "lucide-react";

export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-coral bg-coral/5 p-5 my-6">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
        <div className="text-body text-black">{children}</div>
      </div>
    </div>
  );
}
