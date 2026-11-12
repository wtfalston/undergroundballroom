import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

export function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn('Audio playback error (browser policy):', err);
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        loop
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.warn('Audio source warning:', e)}
      />

      {showControls && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] border-t-2 border-l-2 border-[#6a6a6a] border-r-2 border-b-2 border-[#1a1a1a] shadow-lg text-xs text-[#F5A623]">
          <button
            type="button"
            onClick={toggleMute}
            className="hover:text-[#FFFF00] transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 accent-[#F5A623] cursor-pointer h-1 bg-black"
          />
        </div>
      )}

      {/* Signature Underground Ballroom button style */}
      <button
        id="bg-audio-play"
        type="button"
        onClick={togglePlay}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowControls(!showControls);
        }}
        title="Click to Play/Pause, Right-click for volume"
        className="px-3.5 py-2 text-sm tracking-wide bg-[#5a1e1e] hover:bg-[#FFFF00] text-[#f5d76e] hover:text-[#5a1e1e] border border-[#f5d76e] cursor-pointer transition-colors flex items-center gap-1.5 select-none font-serif shadow-md"
      >
        {isPlaying ? (
          <>
            <Pause size={14} className="fill-current" />
            <span>Pause music</span>
          </>
        ) : (
          <>
            <Play size={14} className="fill-current" />
            <span>&#9658; Play music</span>
          </>
        )}
      </button>
    </div>
  );
}
