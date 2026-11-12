import { SiteContent, Track } from '../utils/contentStore';

interface TrackDetailViewProps {
  content: SiteContent;
  track: Track;
  onBackToLyrics: () => void;
  onBackToHome: () => void;
  onSelectTrack: (track: Track) => void;
}

export function TrackDetailView({
  content,
  track,
  onBackToLyrics,
  onBackToHome,
  onSelectTrack
}: TrackDetailViewProps) {
  const currentIndex = content.tracks.findIndex((t) => t.id === track.id);
  const prevTrack = currentIndex > 0 ? content.tracks[currentIndex - 1] : null;
  const nextTrack = currentIndex < content.tracks.length - 1 ? content.tracks[currentIndex + 1] : null;

  return (
    <main className="w-full max-w-[720px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title */}
      <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] italic tracking-[2px] leading-tight mb-2">
        {content.title}
      </h1>

      <div className="italic text-[#A93341] text-lg sm:text-[22px] mb-6 font-serif">
        — Track {track.id}. {track.title} —
      </div>

      <hr className="ub-rule" />

      {/* Lyrics Box */}
      <div className="my-8 text-[#FFFF00] text-lg sm:text-[22px] leading-[1.8] whitespace-pre-line font-serif max-w-[620px] mx-auto px-4">
        {track.lyrics}
      </div>

      {track.notes && (
        <div className="text-xs text-[#F5A623] italic max-w-[480px] mx-auto mb-6">
          * {track.notes}
        </div>
      )}

      {/* Prev / Next Track navigation */}
      <div className="flex items-center justify-center gap-6 my-6 text-sm text-[#F5A623]">
        {prevTrack ? (
          <button
            type="button"
            onClick={() => onSelectTrack(prevTrack)}
            className="hover:text-[#FFFF00] underline"
          >
            ← Previous: {prevTrack.title}
          </button>
        ) : (
          <span className="opacity-30">← Previous</span>
        )}
        <span>|</span>
        {nextTrack ? (
          <button
            type="button"
            onClick={() => onSelectTrack(nextTrack)}
            className="hover:text-[#FFFF00] underline"
          >
            Next: {nextTrack.title} →
          </button>
        ) : (
          <span className="opacity-30">Next →</span>
        )}
      </div>

      <hr className="ub-rule" />

      {/* Back to track list & home */}
      <div className="mt-8 mb-4 text-base sm:text-lg flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onBackToLyrics}
          className="text-[#FFFF00] hover:text-[#A93341] underline cursor-pointer"
        >
          « Back to Track List
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
