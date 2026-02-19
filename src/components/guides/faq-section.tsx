import type { GuideFAQ } from "@/lib/guides/registry";

export function FAQSection({ faqs }: { faqs: GuideFAQ[] }) {
  return (
    <section className="mt-12" id="faq">
      <h2 className="text-heading-lg font-semibold text-black mb-4">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="border-b border-black/10 group"
        >
          <summary className="w-full text-left py-4 text-body font-medium cursor-pointer flex justify-between items-center text-black">
            <span>{faq.question}</span>
            <span className="text-[#4a555e] group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">
              +
            </span>
          </summary>
          <div className="pb-4 text-body-sm text-[#4a555e]">
            {faq.answer}
          </div>
        </details>
      ))}
    </section>
  );
}
