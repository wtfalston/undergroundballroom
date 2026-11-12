import { useState, useEffect } from 'react';
import {
  SiteContent,
  Track,
  Tale,
  loadSiteContent,
  saveSiteContent,
  resetSiteContent
} from './utils/contentStore';
import { HomeView } from './components/HomeView';
import { LyricsView } from './components/LyricsView';
import { TrackDetailView } from './components/TrackDetailView';
import { TalesView } from './components/TalesView';
import { TaleDetailView } from './components/TaleDetailView';
import { SecretView } from './components/SecretView';
import { AudioPlayer } from './components/AudioPlayer';
import { PasswordGate } from './components/PasswordGate';
import { ContentEditorModal } from './components/ContentEditorModal';
import { Edit3, Eye, Monitor } from 'lucide-react';

type ViewType = 'home' | 'lyrics' | 'track' | 'tales' | 'tale' | 'secret';

export default function App() {
  const [content, setContent] = useState<SiteContent>(loadSiteContent);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [activeTale, setActiveTale] = useState<Tale | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ub_auth_ok') === '1' || !content.isPasswordProtected;
    }
    return true;
  });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [hideEditorButton, setHideEditorButton] = useState(false);
  const [enableScanlines, setEnableScanlines] = useState(false);

  // Keyboard shortcut: Shift + E to open editor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsEditorOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isEditorOpen) {
          setIsEditorOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditorOpen]);

  // Update document title dynamically
  useEffect(() => {
    let pageSuffix = '';
    if (currentView === 'lyrics') pageSuffix = ' — Lyrics';
    else if (currentView === 'track' && activeTrack) pageSuffix = ` — ${activeTrack.title}`;
    else if (currentView === 'tales') pageSuffix = ' — Tales';
    else if (currentView === 'tale' && activeTale) pageSuffix = ` — Tale ${activeTale.id}`;
    else if (currentView === 'secret') pageSuffix = ' — ?';

    document.title = `${content.title}${pageSuffix}`;
  }, [currentView, activeTrack, activeTale, content.title]);

  const handleSaveContent = (updated: SiteContent) => {
    setContent(updated);
    saveSiteContent(updated);
    // If password requirement changed
    if (!updated.isPasswordProtected) {
      setIsUnlocked(true);
    }
  };

  const handleResetContent = () => {
    const fresh = resetSiteContent();
    setContent(fresh);
    setIsUnlocked(true);
  };

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ub_auth_ok', '1');
    }
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-black text-[#F5A623] relative selection:bg-[#8B2635] selection:text-[#FFFF00]">
      {/* CRT Vignette Overlay */}
      <div className="crt-vignette" />

      {/* Optional CRT Scanlines */}
      {enableScanlines && <div className="crt-scanlines" />}

      {/* Floating Toolbar for Customization / Pure View */}
      {!hideEditorButton && (
        <aside aria-label="Editor controls" className="fixed top-3 right-3 z-40 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setEnableScanlines(!enableScanlines)}
            className={`p-1.5 text-xs ub-btn-beveled flex items-center gap-1 cursor-pointer ${
              enableScanlines ? 'text-[#FFFF00]' : 'text-[#888888]'
            }`}
            title="Toggle Retro CRT Scanlines"
          >
            <Monitor size={13} />
            <span className="hidden sm:inline">Scanlines</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className="px-2.5 py-1.5 text-xs bg-[#8B2635] text-[#FFFF00] ub-btn-beveled flex items-center gap-1.5 cursor-pointer shadow-lg font-sans font-medium"
            title="Edit all content: titles, lyrics, stories, images, and audio (Shift + E)"
          >
            <Edit3 size={13} />
            <span>Edit Content</span>
          </button>

          <button
            type="button"
            onClick={() => setHideEditorButton(true)}
            className="p-1.5 text-xs text-[#666666] hover:text-[#FFFF00] bg-black/60 rounded"
            title="Hide editor button for clean view (press Shift+E to bring back)"
          >
            <Eye size={13} />
          </button>
        </aside>
      )}

      {/* Optional Password Gate */}
      {content.isPasswordProtected && !isUnlocked ? (
        <PasswordGate
          siteTitle={content.title}
          expectedPassword={content.password}
          onUnlocked={handleUnlock}
        />
      ) : (
        <div className="min-h-screen flex flex-col justify-between relative z-10">
          {/* Active View Router */}
          {currentView === 'home' && (
            <HomeView
              content={content}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'lyrics' && (
            <LyricsView
              content={content}
              onSelectTrack={(track) => {
                setActiveTrack(track);
                setCurrentView('track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'track' && activeTrack && (
            <TrackDetailView
              content={content}
              track={activeTrack}
              onBackToLyrics={() => {
                setCurrentView('lyrics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectTrack={(track) => {
                setActiveTrack(track);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'tales' && (
            <TalesView
              content={content}
              onSelectTale={(tale) => {
                setActiveTale(tale);
                setCurrentView('tale');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'tale' && activeTale && (
            <TaleDetailView
              content={content}
              tale={activeTale}
              onBackToTales={() => {
                setCurrentView('tales');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectTale={(tale) => {
                setActiveTale(tale);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'secret' && (
            <SecretView
              content={content}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* Background Ambient Audio Player */}
          <AudioPlayer audioSrc={content.audioSrc} />
        </div>
      )}

      {/* Content Customizer Modal */}
      <ContentEditorModal
        content={content}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveContent}
        onReset={handleResetContent}
      />
    </div>
  );
}
