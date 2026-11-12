import { SiteContent } from '../utils/contentStore';

interface HomeViewProps {
  content: SiteContent;
  onNavigate: (view: 'lyrics' | 'tales' | 'secret') => void;
}

export function HomeView({ content, onNavigate }: HomeViewProps) {
  // Extract key letter and rest of word for Left and Right section links
  const leftKey = content.leftSectionKey || content.leftSectionTitle[0] || 'L';
  const leftRest = content.leftSectionTitle.startsWith(leftKey)
    ? content.leftSectionTitle.slice(leftKey.length)
    : content.leftSectionTitle;

  const rightKey = content.rightSectionKey || content.rightSectionTitle[0] || 'T';
  const rightRest = content.rightSectionTitle.startsWith(rightKey)
    ? content.rightSectionTitle.slice(rightKey.length)
    : content.rightSectionTitle;

  return (
    <main className="w-full max-w-[800px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] tracking-[2px] font-normal leading-tight">
          {content.title}
        </h1>
      </div>

      <hr className="ub-rule" />

      {/* Intro Subtitle & Credits */}
      <div className="text-[#F5A623] text-sm sm:text-[15px] leading-relaxed max-w-[560px] mx-auto my-3 px-3 text-left sm:text-center">
        {content.introQuote && (
          <span className="block mb-1 text-[#F5A623] font-medium">
            {content.introQuote}
          </span>
        )}
        <span className="block text-[#F5A623]/90">
          {content.introCredits}
        </span>
      </div>

      {/* The Iconic Central Beveled Frame with 3-cell Grid */}
      <div className="ub-frame my-6 mx-auto w-full max-w-[640px] p-2">
        <div className="grid grid-cols-[1fr_1.2fr_1fr] bg-black border border-[#888888]">
          {/* Left Cell: e.g. Lyrics */}
          <div className="border border-[#888888] p-4 sm:p-6 flex items-center justify-center min-h-[90px] bg-black">
            <button
              type="button"
              onClick={() => onNavigate('lyrics')}
              className="group text-[#FFFF00] text-2xl sm:text-[28px] tracking-[1px] hover:text-[#FFFF00] transition-transform active:scale-95 cursor-pointer select-none"
              title={`Explore ${content.leftSectionTitle}`}
            >
              <span className="text-3xl sm:text-[34px] underline text-[#FFFF00] font-normal">
                {leftKey}
              </span>
              <span>{leftRest}</span>
            </button>
          </div>

          {/* Center Cell: Portrait with link to secret gallery */}
          <div className="border border-[#888888] p-0 min-h-[260px] sm:min-h-[360px] overflow-hidden bg-black flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate('secret')}
              aria-label="Secret archive chamber"
              className="w-full h-full block cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#8B2635]"
              title="Click to enter secret chamber"
            >
              <img
                src={content.portraitImage}
                alt={content.portraitAlt || 'Terrified portrait'}
                referrerPolicy="no-referrer"
                className="w-full h-full min-h-[260px] sm:min-h-[360px] object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500 crisp-img contrast-105 saturate-110"
                onError={(e) => {
                  // Fallback to high-res bundled image if external URL fails
                  e.currentTarget.src = '/src/assets/images/ballroom_portrait_1794497955657.jpg';
                }}
              />
            </button>
          </div>

          {/* Right Cell: e.g. Tales */}
          <div className="border border-[#888888] p-4 sm:p-6 flex items-center justify-center min-h-[90px] bg-black">
            <button
              type="button"
              onClick={() => onNavigate('tales')}
              className="group text-[#FFFF00] text-2xl sm:text-[28px] tracking-[1px] hover:text-[#FFFF00] transition-transform active:scale-95 cursor-pointer select-none"
              title={`Explore ${content.rightSectionTitle}`}
            >
              <span className="text-3xl sm:text-[34px] underline text-[#FFFF00] font-normal">
                {rightKey}
              </span>
              <span>{rightRest}</span>
            </button>
          </div>
        </div>
      </div>

      <hr className="ub-rule" />

      {/* Footer */}
      <footer className="mt-8 text-sm text-[#F5A623] leading-relaxed select-none">
        <div>{content.copyright}</div>
        <div className="mt-1">
          <strong className="text-[#F5A623] font-bold">Creation Date:</strong>{' '}
          <span>{content.creationDate}</span>
        </div>
        <div className="mt-0.5">
          <strong className="text-[#F5A623] font-bold">Last Updated:</strong>{' '}
          <span className="text-[#FFFF00]">{content.lastUpdated}</span>
        </div>
      </footer>
    </main>
  );
}
