import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Wifi, 
  Clock, 
  UserCheck, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Signal, 
  Cpu, 
  HeadphonesIcon
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { content, openOrderModal } = useContent();

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-blue-600" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-emerald-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-purple-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      default:
        return <Zap className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase mb-3">
            Why Moniepoint With Kenny Olu Digital
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Transformation Your Business Has Been Waiting For
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Say goodbye to network timeouts, prolonged customer disputes, and endless waits for banking assistance.
          </p>
        </div>

        {/* Feature Spotlight: Enjoy Stable Internet Connection (Highlighted as requested) */}
        <div className="mb-12 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold">
                <Signal className="w-4 h-4 text-emerald-400" />
                <span>Primary Performance Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Enjoy Stable Internet Connection Wherever You Operate
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Nigerian business moves at lightspeed. When your POS terminal freezes during a 5 PM customer rush, money walks out the door. Moniepoint smart terminals feature <strong>dual-network intelligent roaming 4G SIM slots</strong> and high-gain Wi-Fi. If one network drops, it immediately shifts to the strongest carrier in fractions of a second.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                  <div className="font-bold text-white mb-0.5">Dual 4G SIM Slots</div>
                  <div className="text-slate-300">Seamless auto-switch between top carriers</div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                  <div className="font-bold text-white mb-0.5">High-Gain Wi-Fi</div>
                  <div className="text-slate-300">Connect to your office or shop broadband</div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                  <div className="font-bold text-white mb-0.5">99.9% Up-Time</div>
                  <div className="text-slate-300">Built for intense market environments</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Wifi className="w-8 h-8" />
              </div>
              <div className="text-xl font-black text-white">Ultra-Low Timeout Rate</div>
              <div className="text-xs text-slate-300 mt-1 mb-4">
                Tested & proven across open markets, malls, and nationwide corporate branches.
              </div>
              <button
                onClick={() => openOrderModal('pos_modal')}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs transition-colors cursor-pointer shadow-md"
              >
                Get 4G Smart Terminal Now
              </button>
            </div>
          </div>
        </div>

        {/* 6 Core Transformation Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
                {getBenefitIcon(benefit.iconName)}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {benefit.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
