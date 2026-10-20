import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Play,
  Video,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const { content, openOrderModal } = useContent();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Clean, professional icon mapping (Zero shopping basket/cart icons)
  const iconMap: Record<string, React.ReactNode> = {
    Store: <Building2 className="w-6 h-6 text-blue-600" />,
    Building2: <Building2 className="w-6 h-6 text-indigo-600" />,
    Briefcase: <Briefcase className="w-6 h-6 text-sky-600" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
  };

  // Helper to extract embeddable YouTube / Vimeo URL or direct video
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
      if (ytMatch && ytMatch[1]) {
        return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
      }
      const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
      if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&playsinline=1`;
      }
    } catch {
      return url;
    }
    return url;
  };

  // Active promotional video/media URL (Strictly user-uploaded, no forced video)
  const activeMediaUrl = content.audienceMediaUrl?.trim() || content.promoVideoUrl?.trim() || '';
  const isImageMedia = content.audienceMediaType === 'image' || activeMediaUrl.startsWith('data:image') || /\.(jpeg|jpg|gif|png|webp)($|\?)/i.test(activeMediaUrl);
  const mediaTitle = content.audienceMediaTitle || 'Promotional Media Showcase';
  const mediaCaption = content.audienceMediaCaption || 'Official Moniepoint Merchant Solutions';

  return (
    <section id="audience" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3">
            About The Products & Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Financial Infrastructure For Every Growth Sector
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you run a high-traffic retail outlet, a corporate firm, or an independent creative studio, our Moniepoint payment ecosystem is built to eliminate payment friction, provide instant working capital, and give you complete peace of mind.
          </p>
        </div>

        {/* 6 Grid items: 5 Audiences + 1 Media / Video Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* First 5 Target Audiences */}
          {content.audiences.map((audience, idx) => (
            <div
              key={audience.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                idx === 0 
                  ? 'bg-gradient-to-br from-blue-50/50 via-white to-white border-blue-200 shadow-md ring-1 ring-blue-500/10' 
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                    {iconMap[audience.iconName] || <Building2 className="w-6 h-6 text-blue-600" />}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {audience.exampleBusiness}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {audience.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {audience.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-2">
                <button
                  onClick={() => openOrderModal('pos_modal', { businessName: `${audience.title} Inquiry` })}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
                >
                  <span>Request Solution for {audience.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* 6th Slot: User Video / Image Media Space */}
          {activeMediaUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-950 group flex flex-col justify-between min-h-[360px]">
              {isImageMedia ? (
                // User-uploaded Image Display
                <div className="relative w-full h-full min-h-[360px] flex items-center justify-center overflow-hidden">
                  <img
                    src={activeMediaUrl}
                    alt={mediaTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="text-xs font-bold bg-blue-600/90 px-2.5 py-1 rounded-lg backdrop-blur-xs inline-block mb-1.5">
                      {mediaTitle}
                    </span>
                    <p className="text-xs text-slate-200 line-clamp-2">{mediaCaption}</p>
                  </div>
                </div>
              ) : isPlayingVideo ? (
                // Video Playing (User Embed or Direct)
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] aspect-video flex items-center justify-center bg-black">
                  {activeMediaUrl.startsWith('data:video') ? (
                    <video
                      src={activeMediaUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(activeMediaUrl)}
                      title={mediaTitle}
                      className="w-full h-full border-0 absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : (
                // Video Poster Ready to Play
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
                  <img
                    src={content.heroImageUrl || "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80"}
                    alt={mediaTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Play Trigger */}
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative z-10 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/80 group/btn"
                    aria-label="Play uploaded video"
                  >
                    <Play className="w-7 h-7 fill-white ml-1 text-white group-hover/btn:scale-110 transition-transform" />
                  </button>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/95 bg-black/75 px-3 py-1.5 rounded-lg backdrop-blur-xs flex items-center gap-2 border border-white/10 shadow-xs">
                      <Video className="w-4 h-4 text-blue-400" />
                      <span>{mediaTitle} • Click to Play</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Empty / Ready State: Clean User Media & Video Space (Space ready for user's official video link)
            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-blue-300 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6 sm:p-7 flex flex-col justify-between min-h-[360px] text-center">
              <div className="my-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner relative group">
                  <Video className="w-8 h-8" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-2">
                    Official Video Showcase Slot
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                    Ready For Your YouTube Video
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    This prime showcase space is reserved for your official video. Please provide your YouTube video link, and it will stream in high definition across all mobile phones and computers.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Accredited Moniepoint BRM Partner</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-auto flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => openOrderModal('pos_modal', { businessName: 'General Merchant Inquiry' })}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
