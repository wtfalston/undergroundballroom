import { SiteContent, Tale } from '../utils/contentStore';

interface TalesViewProps {
  content: SiteContent;
  onSelectTale: (tale: Tale) => void;
  onBackToHome: () => void;
}

export function TalesView({ content, onSelectTale, onBackToHome }: TalesViewProps) {
  return (
    <main className="w-full max-w-[720px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title */}
      <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] italic tracking-[2px] leading-tight mb-2">
        {content.title}
      </h1>

      <div className="italic text-[#A93341] text-xl sm:text-[22px] mb-6 font-serif">
        — {content.rightSectionTitle} —
      </div>

      <hr className="ub-rule" />

      {/* Numbered Tales Vertical Column */}
      <div className="my-8 max-w-[320px] mx-auto">
        <ul className="space-y-2 text-center text-[#FFFF00] text-lg font-serif">
          {content.tales.map((tale) => (
            <li key={tale.id}>
              <button
                type="button"
                onClick={() => onSelectTale(tale)}
                className="text-[#FFFF00] hover:text-[#A93341] underline underline-offset-2 transition-colors cursor-pointer select-none"
              >
                {tale.title ? `${tale.id}. ${tale.title}` : tale.id}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr className="ub-rule" />

      {/* Back button */}
      <div className="mt-8 mb-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-[#FFFF00] hover:text-[#A93341] underline text-base sm:text-lg cursor-pointer"
        >
          « Back to Homepage
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-xs text-[#F5A623]">
        {content.copyright}
      </footer>
    </main>
  );
}
