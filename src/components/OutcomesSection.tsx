import React from 'react';
import { useContent } from '../context/ContentContext';
import { CheckCircle2, TrendingUp, Sparkles, Award } from 'lucide-react';

export const OutcomesSection: React.FC = () => {
  const { content, openOrderModal } = useContent();

  if (!content.outcomes || content.outcomes.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase mb-2 border border-blue-500/30">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Real Growth Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Measurable Results You Unlock From Day One
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Engineered to boost your revenue collection, protect working capital, and give you control over business cashflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.outcomes.map((outcome, idx) => (
            <div
              key={outcome.id || idx}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-4 border border-blue-500/30">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {outcome.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {outcome.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Guaranteed outcome</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick outcome callout banner */}
        <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-base sm:text-lg font-bold text-white">
              Ready to automate your merchant payments today?
            </div>
            <div className="text-xs text-blue-100">
              POS Machine fee is only ₦25,000. Delivery takes under 24 hours.
            </div>
          </div>
          <button
            onClick={() => openOrderModal('pos_modal')}
            className="px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs sm:text-sm shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            Claim Your POS Now
          </button>
        </div>

      </div>
    </section>
  );
};
