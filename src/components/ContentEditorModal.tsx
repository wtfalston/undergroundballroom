import { useState } from 'react';
import {
  SiteContent,
  Track,
  Tale,
  DEFAULT_SITE_CONTENT,
  exportContentAsJSON,
  importContentFromJSON
} from '../utils/contentStore';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Download,
  Upload,
  Music,
  BookOpen,
  Image as ImageIcon,
  Shield,
  Sliders,
  Sparkles,
  Check
} from 'lucide-react';

interface ContentEditorModalProps {
  content: SiteContent;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: SiteContent) => void;
  onReset: () => void;
}

type TabType = 'general' | 'images' | 'tracks' | 'tales' | 'audio' | 'presets';

export function ContentEditorModal({
  content,
  isOpen,
  onClose,
  onSave,
  onReset
}: ContentEditorModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [formData, setFormData] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  // Editing track state
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);
  // Editing tale state
  const [selectedTaleIndex, setSelectedTaleIndex] = useState<number>(0);

  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Track manipulation
  const handleAddTrack = () => {
    const nextId = formData.tracks.length > 0 ? Math.max(...formData.tracks.map((t) => t.id)) + 1 : 1;
    const newTrack: Track = {
      id: nextId,
      title: `Track ${nextId}`,
      lyrics: 'Write your lyrics here...',
      duration: '3:00'
    };
    const updated = [...formData.tracks, newTrack];
    setFormData((prev) => ({ ...prev, tracks: updated }));
    setSelectedTrackIndex(updated.length - 1);
  };

  const handleDeleteTrack = (index: number) => {
    if (formData.tracks.length <= 1) return;
    const updated = formData.tracks.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tracks: updated }));
    setSelectedTrackIndex(Math.max(0, index - 1));
  };

  const handleUpdateCurrentTrack = (field: keyof Track, value: string) => {
    const updated = [...formData.tracks];
    if (updated[selectedTrackIndex]) {
      updated[selectedTrackIndex] = {
        ...updated[selectedTrackIndex],
        [field]: value
      };
      setFormData((prev) => ({ ...prev, tracks: updated }));
    }
  };

  // Tale manipulation
  const handleAddTale = () => {
    const nextId = formData.tales.length > 0 ? Math.max(...formData.tales.map((t) => t.id)) + 1 : 1;
    const newTale: Tale = {
      id: nextId,
      title: '',
      text: 'Write the narrative of this tale here...'
    };
    const updated = [...formData.tales, newTale];
    setFormData((prev) => ({ ...prev, tales: updated }));
    setSelectedTaleIndex(updated.length - 1);
  };

  const handleDeleteTale = (index: number) => {
    if (formData.tales.length <= 1) return;
    const updated = formData.tales.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tales: updated }));
    setSelectedTaleIndex(Math.max(0, index - 1));
  };

  const handleUpdateCurrentTale = (field: keyof Tale, value: string) => {
    const updated = [...formData.tales];
    if (updated[selectedTaleIndex]) {
      updated[selectedTaleIndex] = {
        ...updated[selectedTaleIndex],
        [field]: value
      };
      setFormData((prev) => ({ ...prev, tales: updated }));
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = exportContentAsJSON(formData);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.title.toLowerCase().replace(/\s+/g, '_')}_content.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = () => {
    try {
      setImportError('');
      const imported = importContentFromJSON(importJsonText);
      setFormData(imported);
      onSave(imported);
      setImportJsonText('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: unknown) {
      setImportError(err instanceof Error ? err.message : 'Invalid JSON content');
    }
  };

  // Preset loaders
  const loadPresetPoet = () => {
    const poetData: SiteContent = {
      ...DEFAULT_SITE_CONTENT,
      title: 'Midnight Soliloquy',
      introQuote: '“Words carved in obsidian.”',
      introCredits: 'An anthology of prose, confessions & lost correspondence. Curated by A. Sterling.',
      leftSectionTitle: 'Poems',
      leftSectionKey: 'P',
      rightSectionTitle: 'Chronicles',
      rightSectionKey: 'C',
      portraitImage: '/src/assets/images/ballroom_portrait_1794497955657.jpg',
      secretImage: '/src/assets/images/secret_ballroom_1794497956101.jpg',
      copyright: '© Obsidian Press 2026',
      creationDate: 'November 12, 2026',
      lastUpdated: '11/12/26',
      tracks: [
        { id: 1, title: 'The Ink That Never Dries', lyrics: `There is a line I wrote upon your wrist\nBefore the morning rose and turned to mist\nDo not wash it away with tears or rain\nSome words are meant to outlive all our pain.` },
        { id: 2, title: 'Echoes in the Belfry', lyrics: `The bell tolls once for the daylight lost\nThe bell tolls twice for the winter frost\nThe third chime belongs to none who wake\nA silent vow we were born to break.` }
      ],
      tales: [
        { id: 1, title: 'The First Letter', text: 'I write to you from a desk made of driftwood salvaged after the storm. The chimney draws poorly and the smoke curls like gray ribbon across the rafters...' },
        { id: 2, title: 'The Clockmaker’s Daughter', text: 'She wound every clock in the town precisely three seconds slow, so that everyone lived perpetually in a minute that had already been forgiven...' }
      ]
    };
    setFormData(poetData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#161616] border-2 border-[#555555] shadow-2xl text-[#F5A623] font-serif overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#222222] border-b border-[#444444]">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[#FFFF00]" />
            <h2 className="text-lg font-bold tracking-wide text-[#FFFF00]">
              Content Customizer & Site Editor
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="flex items-center gap-1 text-xs text-[#5DADE2] bg-black/50 px-2 py-1 rounded">
                <Check size={14} /> Saved Live!
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#8B2635] hover:bg-[#A93341] text-[#FFFF00] text-sm ub-btn-beveled cursor-pointer"
            >
              <Save size={14} />
              <span>Apply Changes</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:text-[#FFFF00] transition-colors cursor-pointer text-[#888888]"
              title="Close Editor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#333333] bg-[#1c1c1c] overflow-x-auto text-xs sm:text-sm">
          {[
            { id: 'general', label: 'Identity & Info', icon: Sliders },
            { id: 'images', label: 'Portraits & Art', icon: ImageIcon },
            { id: 'tracks', label: `Tracks (${formData.tracks.length})`, icon: Music },
            { id: 'tales', label: `Tales (${formData.tales.length})`, icon: BookOpen },
            { id: 'audio', label: 'Audio & Lock', icon: Shield },
            { id: 'presets', label: 'Presets & JSON', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 px-4 py-2.5 whitespace-nowrap transition-colors border-b-2 font-sans ${
                  isActive
                    ? 'border-[#FFFF00] text-[#FFFF00] bg-[#262626] font-semibold'
                    : 'border-transparent text-[#999999] hover:text-[#F5A623]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm font-sans">
          {/* TAB 1: GENERAL & IDENTITY */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                  Site / Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full p-2.5 text-base bg-black text-[#FFFF00] ub-input-inset font-serif"
                  placeholder="e.g. Underground Ballroom"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                    Intro Quote / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.introQuote}
                    onChange={(e) => handleFieldChange('introQuote', e.target.value)}
                    className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset"
                    placeholder="e.g. “Terrified .”"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                    Production / Author Credits
                  </label>
                  <textarea
                    rows={2}
                    value={formData.introCredits}
                    onChange={(e) => handleFieldChange('introCredits', e.target.value)}
                    className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset"
                    placeholder="e.g. The debut album by fakemink..."
                  />
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-[#333333] rounded space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5DADE2]">
                  Center Frame Section Labels
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#AAAAAA] mb-1">Left Section (Title & Key Letter)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.leftSectionTitle}
                        onChange={(e) => handleFieldChange('leftSectionTitle', e.target.value)}
                        className="flex-1 p-1.5 bg-black text-[#FFFF00] ub-input-inset text-sm"
                        placeholder="Lyrics"
                      />
                      <input
                        type="text"
                        maxLength={1}
                        value={formData.leftSectionKey}
                        onChange={(e) => handleFieldChange('leftSectionKey', e.target.value.toUpperCase())}
                        className="w-12 p-1.5 bg-black text-[#FFFF00] ub-input-inset text-center uppercase font-bold"
                        title="Highlighted Key Letter"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#AAAAAA] mb-1">Right Section (Title & Key Letter)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.rightSectionTitle}
                        onChange={(e) => handleFieldChange('rightSectionTitle', e.target.value)}
                        className="flex-1 p-1.5 bg-black text-[#FFFF00] ub-input-inset text-sm"
                        placeholder="Tales"
                      />
                      <input
                        type="text"
                        maxLength={1}
                        value={formData.rightSectionKey}
                        onChange={(e) => handleFieldChange('rightSectionKey', e.target.value.toUpperCase())}
                        className="w-12 p-1.5 bg-black text-[#FFFF00] ub-input-inset text-center uppercase font-bold"
                        title="Highlighted Key Letter"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#AAAAAA] mb-1">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={formData.copyright}
                    onChange={(e) => handleFieldChange('copyright', e.target.value)}
                    className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#AAAAAA] mb-1">
                    Creation Date
                  </label>
                  <input
                    type="text"
                    value={formData.creationDate}
                    onChange={(e) => handleFieldChange('creationDate', e.target.value)}
                    className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#AAAAAA] mb-1">
                    Last Updated
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={formData.lastUpdated}
                      onChange={(e) => handleFieldChange('lastUpdated', e.target.value)}
                      className="flex-1 p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const now = new Date();
                        const mm = String(now.getMonth() + 1).padStart(2, '0');
                        const dd = String(now.getDate()).padStart(2, '0');
                        const yy = String(now.getFullYear()).slice(-2);
                        handleFieldChange('lastUpdated', `${mm}/${dd}/${yy}`);
                      }}
                      className="px-2 py-1 bg-[#2a2a2a] text-xs text-[#F5A623] hover:text-[#FFFF00] ub-btn-beveled"
                      title="Set to today"
                    >
                      Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTRAITS & ARTWORK */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                  Center Portrait Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.portraitImage}
                    onChange={(e) => handleFieldChange('portraitImage', e.target.value)}
                    className="flex-1 p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                    placeholder="/src/assets/images/... or https://..."
                  />
                </div>
                <div className="mt-2 text-xs text-[#AAAAAA]">
                  Quick Presets:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  {[
                    { label: 'Hooded Candle', path: '/src/assets/images/ballroom_portrait_1794497955657.jpg' },
                    { label: 'Ballroom Hall', path: '/src/assets/images/secret_ballroom_1794497956101.jpg' },
                    { label: 'Candelabra Relic', path: '/src/assets/images/ballroom_relic_1794497956485.jpg' },
                    { label: 'Original 2026', path: '/terrified-portrait.webp' }
                  ].map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => handleFieldChange('portraitImage', preset.path)}
                      className={`p-1.5 text-xs text-left bg-black border ${
                        formData.portraitImage === preset.path ? 'border-[#FFFF00] text-[#FFFF00]' : 'border-[#444444] text-[#888888]'
                      } hover:border-[#F5A623] truncate flex items-center gap-1.5`}
                    >
                      <img src={preset.path} alt="" className="w-5 h-5 object-cover rounded-xs" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                  Secret Room Main Artwork URL
                </label>
                <input
                  type="text"
                  value={formData.secretImage}
                  onChange={(e) => handleFieldChange('secretImage', e.target.value)}
                  className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                  placeholder="/src/assets/images/... or https://..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#FFFF00] mb-1">
                  Secret Room Message
                </label>
                <textarea
                  rows={2}
                  value={formData.secretMessage}
                  onChange={(e) => handleFieldChange('secretMessage', e.target.value)}
                  className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm font-serif"
                />
              </div>

              {/* Secret Gallery item URLs */}
              <div className="p-3 bg-black/40 border border-[#333333] rounded">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5DADE2] mb-2">
                  Secret Gallery 3-Item Archive
                </div>
                <div className="space-y-2">
                  {formData.secretGallery.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-[#888888] w-6">#{idx + 1}</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.secretGallery];
                          updated[idx] = e.target.value;
                          handleFieldChange('secretGallery', updated);
                        }}
                        className="flex-1 p-1.5 bg-black text-[#FFFF00] ub-input-inset text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRACKS & LYRICS */}
          {activeTab === 'tracks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Track list column */}
              <div className="md:col-span-1 border border-[#333333] p-2 bg-black/50 max-h-[420px] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333]">
                  <span className="text-xs uppercase tracking-wider text-[#FFFF00]">
                    Tracks ({formData.tracks.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddTrack}
                    className="p-1 text-xs bg-[#8B2635] text-[#FFFF00] ub-btn-beveled flex items-center gap-1"
                    title="Add new track"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.tracks.map((track, i) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setSelectedTrackIndex(i)}
                      className={`w-full text-left p-2 text-xs truncate flex items-center justify-between ${
                        selectedTrackIndex === i
                          ? 'bg-[#8B2635] text-[#FFFF00] font-bold'
                          : 'hover:bg-[#222222] text-[#F5A623]'
                      }`}
                    >
                      <span className="truncate">
                        {track.id}. {track.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Track editor column */}
              <div className="md:col-span-2 border border-[#333333] p-4 bg-black/40 space-y-3">
                {formData.tracks[selectedTrackIndex] ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase text-[#5DADE2]">
                        Editing Track #{formData.tracks[selectedTrackIndex].id}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTrack(selectedTrackIndex)}
                        disabled={formData.tracks.length <= 1}
                        className="text-xs text-[#A93341] hover:text-red-400 flex items-center gap-1 disabled:opacity-30"
                      >
                        <Trash2 size={13} /> Delete Track
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAAAAA] mb-1">Track Title</label>
                      <input
                        type="text"
                        value={formData.tracks[selectedTrackIndex].title}
                        onChange={(e) => handleUpdateCurrentTrack('title', e.target.value)}
                        className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm font-serif"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAAAAA] mb-1">Lyrics Content</label>
                      <textarea
                        rows={10}
                        value={formData.tracks[selectedTrackIndex].lyrics}
                        onChange={(e) => handleUpdateCurrentTrack('lyrics', e.target.value)}
                        className="w-full p-2.5 bg-black text-[#FFFF00] ub-input-inset text-sm font-serif leading-relaxed whitespace-pre"
                        placeholder="Write or paste lyrics here..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAAAAA] mb-1">Optional Notes / Subtext</label>
                      <input
                        type="text"
                        value={formData.tracks[selectedTrackIndex].notes || ''}
                        onChange={(e) => handleUpdateCurrentTrack('notes', e.target.value)}
                        className="w-full p-1.5 bg-black text-[#FFFF00] ub-input-inset text-xs"
                        placeholder="e.g. Recorded in London, June 2026"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-xs text-[#888888]">
                    No track selected.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: TALES & STORIES */}
          {activeTab === 'tales' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tale list column */}
              <div className="md:col-span-1 border border-[#333333] p-2 bg-black/50 max-h-[420px] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333]">
                  <span className="text-xs uppercase tracking-wider text-[#FFFF00]">
                    Tales ({formData.tales.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddTale}
                    className="p-1 text-xs bg-[#8B2635] text-[#FFFF00] ub-btn-beveled flex items-center gap-1"
                    title="Add new tale"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.tales.map((tale, i) => (
                    <button
                      key={tale.id}
                      type="button"
                      onClick={() => setSelectedTaleIndex(i)}
                      className={`w-full text-left p-2 text-xs truncate flex items-center justify-between ${
                        selectedTaleIndex === i
                          ? 'bg-[#8B2635] text-[#FFFF00] font-bold'
                          : 'hover:bg-[#222222] text-[#F5A623]'
                      }`}
                    >
                      <span className="truncate">
                        Tale {tale.id} {tale.title ? `(${tale.title})` : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tale editor column */}
              <div className="md:col-span-2 border border-[#333333] p-4 bg-black/40 space-y-3">
                {formData.tales[selectedTaleIndex] ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase text-[#5DADE2]">
                        Editing Tale #{formData.tales[selectedTaleIndex].id}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTale(selectedTaleIndex)}
                        disabled={formData.tales.length <= 1}
                        className="text-xs text-[#A93341] hover:text-red-400 flex items-center gap-1 disabled:opacity-30"
                      >
                        <Trash2 size={13} /> Delete Tale
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAAAAA] mb-1">Optional Tale Title</label>
                      <input
                        type="text"
                        value={formData.tales[selectedTaleIndex].title || ''}
                        onChange={(e) => handleUpdateCurrentTale('title', e.target.value)}
                        className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm font-serif"
                        placeholder="e.g. My, My or leave blank for numbered tale"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#AAAAAA] mb-1">Tale Narrative Text</label>
                      <textarea
                        rows={11}
                        value={formData.tales[selectedTaleIndex].text}
                        onChange={(e) => handleUpdateCurrentTale('text', e.target.value)}
                        className="w-full p-2.5 bg-black text-[#FFFF00] ub-input-inset text-sm font-serif leading-relaxed"
                        placeholder="Write story narrative..."
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-xs text-[#888888]">
                    No tale selected.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIO & SECURITY */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div className="p-4 bg-black/40 border border-[#333333] rounded space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FFFF00] flex items-center gap-1.5">
                  <Music size={14} /> Background Music Soundtrack
                </div>
                <div>
                  <label className="block text-xs text-[#AAAAAA] mb-1">Audio Source URL</label>
                  <input
                    type="text"
                    value={formData.audioSrc}
                    onChange={(e) => handleFieldChange('audioSrc', e.target.value)}
                    className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-sm"
                    placeholder="/under-96.mp3 or https://..."
                  />
                  <div className="mt-1 text-xs text-[#888888]">
                    Default is <code className="text-[#F5A623]">/under-96.mp3</code> (the authentic Underground Ballroom soundtrack).
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-[#333333] rounded space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FFFF00] flex items-center gap-1.5">
                  <Shield size={14} /> Password Protection Gate (auth.js)
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPasswordProtected"
                    checked={formData.isPasswordProtected}
                    onChange={(e) => handleFieldChange('isPasswordProtected', e.target.checked)}
                    className="w-4 h-4 accent-[#8B2635] cursor-pointer"
                  />
                  <label htmlFor="isPasswordProtected" className="text-sm text-[#F5A623] cursor-pointer">
                    Enable password protection screen before entering site
                  </label>
                </div>

                {formData.isPasswordProtected && (
                  <div>
                    <label className="block text-xs text-[#AAAAAA] mb-1">Required Password</label>
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      className="w-full sm:w-64 p-2 bg-black text-[#FFFF00] ub-input-inset text-sm font-mono"
                      placeholder="Coppola1979"
                    />
                    <div className="mt-1 text-xs text-[#888888]">
                      Default password from original site is <code className="text-[#F5A623]">Coppola1979</code>.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PRESETS & JSON IMPORT/EXPORT */}
          {activeTab === 'presets' && (
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#FFFF00] mb-2">
                  Sample Content Presets
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(DEFAULT_SITE_CONTENT)}
                    className="p-3 text-left bg-black border border-[#444444] hover:border-[#FFFF00] transition-colors"
                  >
                    <div className="text-sm font-bold text-[#FFFF00]">Underground Ballroom (Original)</div>
                    <div className="text-xs text-[#888888] mt-1">
                      Full 19 tracks, 27 tales, authentic Fakemink credits & metadata.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={loadPresetPoet}
                    className="p-3 text-left bg-black border border-[#444444] hover:border-[#FFFF00] transition-colors"
                  >
                    <div className="text-sm font-bold text-[#FFFF00]">Midnight Soliloquy (Gothic Poetry)</div>
                    <div className="text-xs text-[#888888] mt-1">
                      Custom sections "Poems" & "Chronicles", literary prose template.
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-[#333333] rounded space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5DADE2]">
                    Export or Import Site JSON
                  </div>
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 bg-[#2a2a2a] text-[#FFFF00] ub-btn-beveled"
                  >
                    <Download size={13} /> Download JSON
                  </button>
                </div>
                <p className="text-xs text-[#AAAAAA]">
                  You can backup your entire website configuration or paste a JSON string below to import:
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste site JSON configuration here to import..."
                  className="w-full p-2 bg-black text-[#FFFF00] ub-input-inset text-xs font-mono"
                />
                {importError && (
                  <div className="text-xs text-[#A93341]">{importError}</div>
                )}
                <button
                  type="button"
                  onClick={handleImportJSON}
                  disabled={!importJsonText.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B2635] text-[#FFFF00] text-xs ub-btn-beveled disabled:opacity-40"
                >
                  <Upload size={13} /> Load JSON Into Site
                </button>
              </div>

              <div className="pt-2 border-t border-[#333333] flex justify-between items-center">
                <span className="text-xs text-[#888888]">
                  Want to clear all changes and restore original website?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to restore default content?')) {
                      onReset();
                      setFormData(DEFAULT_SITE_CONTENT);
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-[#A93341] hover:text-red-400 p-1"
                >
                  <RotateCcw size={12} /> Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#1e1e1e] border-t border-[#333333] text-xs">
          <span className="text-[#888888]">
            Tip: Press <kbd className="px-1.5 py-0.5 bg-black border border-[#444444] text-[#FFFF00] rounded">Shift + E</kbd> to toggle this editor anytime.
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#2a2a2a] text-[#F5A623] hover:text-[#FFFF00] ub-btn-beveled"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-1.5 bg-[#8B2635] text-[#FFFF00] font-bold ub-btn-beveled flex items-center gap-1"
            >
              <Save size={14} /> Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
