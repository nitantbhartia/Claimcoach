interface CaseStudyProps {
  name: string;
  vehicle: string;
  state: string;
  initialOffer: string;
  finalSettlement: string;
  gap: string;
  narrative: React.ReactNode;
}

export function CaseStudy(props: CaseStudyProps) {
  return (
    <div className="border border-black/10 bg-white p-5 my-6">
      <p className="text-label uppercase text-[#4a555e]/60 mb-2">
        Case Study
      </p>
      <p className="text-body font-semibold text-black mb-3">
        {props.name} &middot; {props.vehicle} &middot; {props.state}
      </p>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-black/[0.02] border border-black/5">
          <p className="text-caption text-[#4a555e]">Initial offer</p>
          <p className="font-mono font-semibold text-black">
            {props.initialOffer}
          </p>
        </div>
        <div className="text-center p-2 bg-black/[0.02] border border-black/5">
          <p className="text-caption text-[#4a555e]">Final settlement</p>
          <p className="font-mono font-semibold text-black">
            {props.finalSettlement}
          </p>
        </div>
        <div className="text-center p-2 bg-coral/5 border border-coral/20">
          <p className="text-caption text-coral">Increase</p>
          <p className="font-mono font-semibold text-coral">{props.gap}</p>
        </div>
      </div>
      <div className="text-body-sm text-[#4a555e]">{props.narrative}</div>
    </div>
  );
}
