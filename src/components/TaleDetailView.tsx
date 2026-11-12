import { SiteContent, Tale } from '../utils/contentStore';

interface TaleDetailViewProps {
  content: SiteContent;
  tale: Tale;
  onBackToTales: () => void;
  onBackToHome: () => void;
  onSelectTale: (tale: Tale) => void;
}

export function TaleDetailView({
  content,
  tale,
  onBackToTales,
  onBackToHome,
  onSelectTale
}: TaleDetailViewProps) {
  const currentIndex = content.tales.findIndex((t) => t.id === tale.id);
  const prevTale = currentIndex > 0 ? content.tales[currentIndex - 1] : null;
  const nextTale = currentIndex < content.tales.length - 1 ? content.tales[currentIndex + 1] : null;

  // Split multi-paragraph text by newlines
  const paragraphs = tale.text.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <main className="w-full max-w-[720px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title */}
      <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] italic tracking-[2px] leading-tight mb-2">
        {content.title}
      </h1>

      <div className="italic text-[#A93341] text-lg sm:text-[22px] mb-6 font-serif">
        — Tale {tale.id}{tale.title ? `: ${tale.title}` : ''} —
      </div>

      <hr className="ub-rule" />

      {/* Tale Prose */}
      <div className="my-8 text-[#FFFF00] text-base sm:text-lg leading-[1.7] text-left max-w-[600px] mx-auto px-4 font-serif space-y-4">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Prev / Next Tale navigation */}
      <div className="flex items-center justify-center gap-6 my-6 text-sm text-[#F5A623]">
        {prevTale ? (
          <button
            type="button"
            onClick={() => onSelectTale(prevTale)}
            className="hover:text-[#FFFF00] underline"
          >
            ← Tale {prevTale.id}
          </button>
        ) : (
          <span className="opacity-30">← Previous</span>
        )}
        <span>|</span>
        {nextTale ? (
          <button
            type="button"
            onClick={() => onSelectTale(nextTale)}
            className="hover:text-[#FFFF00] underline"
          >
            Tale {nextTale.id} →
          </button>
        ) : (
          <span className="opacity-30">Next →</span>
        )}
      </div>

      <hr className="ub-rule" />

      {/* Back to tales & home */}
      <div className="mt-8 mb-4 text-base sm:text-lg flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onBackToTales}
          className="text-[#FFFF00] hover:text-[#A93341] underline cursor-pointer"
        >
          « Back to Tales
        </button>
        <span className="text-[#F5A623]">·</span>
        <button
          type="button"
          onClick={onBackToHome}
          className="text-[#FFFF00] hover:text-[#A93341] underline cursor-pointer"
        >
          Home
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-xs text-[#F5A623]">
        {content.copyright}
      </footer>
    </main>
  );
}
