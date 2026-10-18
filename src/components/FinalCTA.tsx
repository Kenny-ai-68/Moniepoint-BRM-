import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  MessageCircle, 
  PhoneCall, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Zap,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { content, openOrderModal, generateWhatsAppUrl } = useContent();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Urgent Alert pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-6 border border-emerald-500/30">
          <Clock className="w-3.5 h-3.5" />
          <span>Doorstep Delivery Guaranteed In {content.deliveryTimeframe}</span>
        </div>

        {/* Closing Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Equip Your Business With Nigeria’s Most Reliable POS Terminal
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join thousands of smart retailers and entrepreneurs. Get your Moniepoint POS machine today for only <strong className="text-white underline decoration-blue-500 underline-offset-4">{content.posPrice}</strong> and access up to millions in business working capital.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={generateWhatsAppUrl("Hello Kenny Olu Digital, I am ready to order my Moniepoint POS machine / apply for a business loan.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat With Us on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={() => openOrderModal('pos_modal')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base shadow-xl shadow-blue-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <CreditCard className="w-5 h-5" />
            <span>Order POS Online (₦25k)</span>
          </button>
        </div>

        {/* Direct Call & Phone */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
          <a
            href={`tel:${content.phone}`}
            className="flex items-center gap-2 text-white hover:text-blue-300 font-bold transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call Kenny Olu: {content.phone}</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Official Accredited BRM Support</span>
          </span>
        </div>

        {/* Reassurance Footer Chips */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 text-left sm:text-center">
          <div>
            <div className="font-bold text-white">₦25,000 Flat</div>
            <div>One-off acquisition</div>
          </div>
          <div>
            <div className="font-bold text-white">Under 24 Hours</div>
            <div>Doorstep delivery</div>
          </div>
          <div>
            <div className="font-bold text-white">₦500k – Millions</div>
            <div>Collateral-free loans</div>
          </div>
          <div>
            <div className="font-bold text-white">Stable Internet</div>
            <div>Dual 4G roaming network</div>
          </div>
        </div>

      </div>
    </section>
  );
};
