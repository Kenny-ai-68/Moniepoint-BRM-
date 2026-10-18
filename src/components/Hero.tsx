import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  MessageCircle, 
  CreditCard, 
  Clock, 
  Wifi, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  PhoneCall, 
  TrendingUp, 
  Award, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { content, openOrderModal, generateWhatsAppUrl } = useContent();

  const handleCtaClick = (actionType: string, url: string) => {
    if (actionType === 'pos_modal') {
      openOrderModal('pos_modal');
    } else if (actionType === 'loan_modal') {
      openOrderModal('loan_modal');
    } else if (actionType === 'inquiry_modal') {
      openOrderModal('inquiry_modal');
    } else if (actionType === 'whatsapp') {
      window.open(generateWhatsAppUrl(), '_blank');
    } else if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-blue-50/40 to-slate-50">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-400/10 via-sky-300/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & 3 CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs">
              <Award className="w-4 h-4 text-blue-600" />
              <span>{content.heroBadge}</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="hidden sm:inline-block text-slate-500 font-normal">Kenny Olu Digital</span>
            </div>

            {/* Course Title Badge / Service Flag */}
            {content.courseTitle && (
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-bold tracking-wider uppercase text-blue-900 bg-blue-100 px-3 py-1 rounded-md border border-blue-200">
                  {content.courseTitle}
                </span>
              </div>
            )}

            {/* Powerful Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {content.heroHeadline}
            </h1>

            {/* Subheadline & Description */}
            <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
              <p className="text-base sm:text-lg md:text-xl font-medium text-slate-700 leading-relaxed">
                {content.heroSubheadline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {content.heroDescription}
              </p>
            </div>

            {/* Key Value Guarantee Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 py-2 text-left">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">POS Machine Fee</div>
                  <div className="text-sm font-bold text-slate-900">{content.posPrice} Only</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Fast Delivery</div>
                  <div className="text-sm font-bold text-slate-900">{content.deliveryTimeframe}</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Network Stability</div>
                  <div className="text-sm font-bold text-slate-900">Dual 4G + WiFi</div>
                </div>
              </div>
            </div>

            {/* 3 Customizable CTA Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                {/* CTA 1: Chat With Us on WhatsApp */}
                {content.ctaButtons[0] && (
                  <button
                    onClick={() => handleCtaClick(content.ctaButtons[0].actionType, content.ctaButtons[0].url)}
                    className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                    <span>{content.ctaButtons[0].label}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* CTA 2: Order Moniepoint POS */}
                {content.ctaButtons[1] && (
                  <button
                    onClick={() => handleCtaClick(content.ctaButtons[1].actionType, content.ctaButtons[1].url)}
                    className="px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{content.ctaButtons[1].label}</span>
                  </button>
                )}
              </div>

              {/* CTA 3: Apply for Business Loan */}
              <div className="flex justify-center lg:justify-start">
                {content.ctaButtons[2] && (
                  <button
                    onClick={() => handleCtaClick(content.ctaButtons[2].actionType, content.ctaButtons[2].url)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group border border-slate-700"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{content.ctaButtons[2].label}</span>
                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            {/* Direct Contact reassurance */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero Hidden Charges</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick Document Verification</span>
              </span>
              <a 
                href={`tel:${content.phone}`}
                className="flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Direct Line: {content.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Impact Moniepoint Terminal Visual & Interactive Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Terminal Card */}
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    M
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">MONIEPOINT SMART POS</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Active 4G Network & Ready
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full border border-blue-200">
                  {content.posPrice}
                </span>
              </div>

              {/* Terminal Screen Simulation */}
              <div className="my-5 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-inner relative overflow-hidden">
                <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] text-slate-400">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>4G LTE</span>
                  <span className="ml-1 text-slate-300">100%</span>
                </div>

                <div className="text-center pt-2 pb-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/30 animate-pulse">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="text-xs uppercase font-medium text-emerald-400 tracking-wider">
                    TRANSACTION APPROVED
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                    ₦45,000.00
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Settled to Merchant Account: INSTANT
                  </div>
                </div>

                {/* Micro Receipt Preview */}
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-[11px] space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Merchant:</span>
                    <span className="text-white font-medium">Kenny Concept Client</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terminal ID:</span>
                    <span className="font-mono text-slate-400">2039KP88</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-semibold">Fast 2.1s Processing</span>
                  </div>
                </div>
              </div>

              {/* Features list below terminal */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Stable Internet:</strong> Dual roaming SIM slots eliminate network errors.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Under 24 Hours:</strong> Delivered to your shop or office across Ogun & Lagos State.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Business Loans:</strong> Access ₦500k to millions for eligible merchants.</span>
                </div>
              </div>

              {/* Instant Trigger Buttons inside card */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openOrderModal('pos_modal')}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Order Machine</span>
                </button>
                <button
                  onClick={() => openOrderModal('loan_modal')}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Check Loan</span>
                </button>
              </div>

              {/* Relationship manager badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Managed by: <strong className="text-slate-800">{content.brmName}</strong></span>
                <span className="text-blue-600 font-semibold">BRM On Call</span>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Official Moniepoint Partner</div>
                <div className="text-[11px] text-slate-500">KYC Compliant & CBN Regulated</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
