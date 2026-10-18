import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Calculator, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const { openOrderModal, generateWhatsAppUrl } = useContent();
  const [loanAmount, setLoanAmount] = useState<number>(1500000);
  const [loanDurationMonths, setLoanDurationMonths] = useState<number>(3);

  // Formatting helpers
  const formatNaira = (val: number) => {
    return '₦' + val.toLocaleString('en-NG');
  };

  // Rough estimation logic for Nigerian merchant working capital (daily micro payback)
  const estimatedDays = loanDurationMonths * 26; // approx business days
  const estimatedTotalRepayment = loanAmount * (1 + 0.035 * loanDurationMonths);
  const estimatedDailyDeduction = Math.round(estimatedTotalRepayment / estimatedDays);

  const handleApplyClick = () => {
    openOrderModal('loan_modal', {
      serviceType: 'Business Loan',
      loanAmountRequested: formatNaira(loanAmount),
      notes: `Requested repayment plan: ${loanDurationMonths} months`,
    });
  };

  const handleWhatsAppClick = () => {
    const text = `Hello Kenny Olu Digital, I am interested in applying for a Moniepoint Business Loan of ${formatNaira(loanAmount)} for ${loanDurationMonths} months. Please guide me through eligibility and assessment.`;
    window.open(generateWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="loan-calculator" className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-7 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Background ambient lighting */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Moniepoint Working Capital Estimator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Calculate Your Business Loan Capacity
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Loans start from ₦500,000 up to millions of Naira for qualified merchants.
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Assessment turnaround</span>
                <span className="text-emerald-400 font-bold text-sm">24 – 48 Hours</span>
              </div>
            </div>

            {/* Interactive Calculator Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Loan Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Desired Loan Amount:
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-blue-400">
                      {formatNaira(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="250000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₦500,000 (Min)</span>
                    <span>₦5,000,000</span>
                    <span>₦10,000,000+ (Max)</span>
                  </div>
                </div>

                {/* Duration Buttons */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Repayment Duration:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setLoanDurationMonths(m)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          loanDurationMonths === m
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {m} {m === 1 ? 'Month' : 'Months'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eligibility Checkpoints */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-2 text-slate-300">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Moniepoint Loan Qualification Criteria:</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Active POS transactions or Moniepoint business account history. No physical collateral required; loan size is determined by your daily sales volume.
                  </p>
                </div>
              </div>

              {/* Repayment Breakdown Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-800/90 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Estimated Summary
                  </div>

                  <div className="border-b border-slate-700 pb-3">
                    <span className="text-xs text-slate-400 block">Est. Daily Turnover Deduction</span>
                    <span className="text-2xl font-black text-emerald-400">
                      {formatNaira(estimatedDailyDeduction)}
                      <span className="text-xs font-normal text-slate-400"> /day</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Loan Principal:</span>
                      <span className="font-bold text-white">{formatNaira(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Tenure:</span>
                      <span className="font-bold text-white">{loanDurationMonths} Months</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Collateral Required:</span>
                      <span className="font-bold text-emerald-400">Zero (POS Activity Based)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 space-y-2.5">
                  <button
                    onClick={handleApplyClick}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <span>Apply for {formatNaira(loanAmount)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-400" />
                    <span>Discuss Loan on WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
