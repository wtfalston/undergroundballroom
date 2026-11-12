import { SiteContent } from '../utils/contentStore';

interface SecretViewProps {
  content: SiteContent;
  onBackToHome: () => void;
}

export function SecretView({ content, onBackToHome }: SecretViewProps) {
  return (
    <main className="w-full max-w-[840px] mx-auto text-center px-4 pt-12 sm:pt-6 pb-8">
      {/* Title */}
      <h1 className="text-[34px] sm:text-[44px] text-[#8B2635] underline decoration-[#8B2635] italic tracking-[2px] leading-tight mb-2">
        {content.title}
      </h1>

      <div className="italic text-[#A93341] text-lg sm:text-[22px] mb-4 font-serif">
        — The Inner Chamber —
      </div>

      <hr className="ub-rule" />

      {/* Secret message */}
      <div className="text-sm sm:text-base text-[#F5A623] italic max-w-[540px] mx-auto my-4 font-serif">
        {content.secretMessage || 'You have found the hidden gallery beneath the floorboards.'}
      </div>

      {/* Main Secret Image in Beveled Frame */}
      <div className="ub-frame my-6 mx-auto w-full max-w-[640px] p-2">
        <div className="bg-black border border-[#888888]">
          <div className="min-h-[340px] sm:min-h-[440px] flex items-center justify-center p-1 bg-black">
            <img
              src={content.secretImage}
              alt="Secret Ballroom Relic"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[500px] object-contain crisp-img contrast-105"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/secret_ballroom_1794497956101.jpg';
              }}
            />
          </div>
        </div>
      </div>

      {/* Secret 3-photo Archive Gallery */}
      {content.secretGallery && content.secretGallery.length > 0 && (
        <div className="mt-8 mb-6">
          <div className="text-xs uppercase tracking-widest text-[#F5A623] mb-3">
            Archival Relics
          </div>
          <div className="ub-frame max-w-[700px] mx-auto p-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-black p-2 border border-[#888888]">
              {content.secretGallery.map((imgSrc, idx) => (
                <div key={idx} className="aspect-square bg-black border border-[#555555] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`Relic ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover crisp-img hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/images/ballroom_relic_1794497956485.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
