import { SiteContent, Track } from '../utils/contentStore';

interface LyricsViewProps {
  content: SiteContent;
  onSelectTrack: (track: Track) => void;
  onBackToHome: () => void;
}

export function LyricsView({ content, onSelectTrack, onBackToHome }: LyricsViewProps) {
  return (
    <main className="w-full max-w-[720px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title */}
      <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] italic tracking-[2px] leading-tight mb-2">
        {content.title}
      </h1>

      <div className="italic text-[#A93341] text-xl sm:text-[22px] mb-6 font-serif">
        — {content.leftSectionTitle} —
      </div>

      <hr className="ub-rule" />

      {/* Track List */}
      <div className="my-8 max-w-[440px] mx-auto">
        <ol className="list-decimal list-inside text-left sm:text-center space-y-2 text-[#FFFF00] text-base sm:text-lg leading-relaxed font-serif">
          {content.tracks.map((track, idx) => (
            <li key={track.id} className="marker:text-[#F5A623]">
              <button
                type="button"
                onClick={() => onSelectTrack(track)}
                className="text-[#FFFF00] hover:text-[#A93341] underline underline-offset-2 transition-colors cursor-pointer select-none"
              >
                {track.title}
              </button>
            </li>
          ))}
        </ol>
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
