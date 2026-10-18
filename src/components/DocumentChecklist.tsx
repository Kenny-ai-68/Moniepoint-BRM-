import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export const DocumentChecklist: React.FC = () => {
  const { content, openOrderModal } = useContent();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = content.requiredDocuments.length;

  const handleCopyChecklist = () => {
    const text = `Moniepoint POS Acquisition Requirements (Kenny Olu Digital - 08105885003):\n` +
      content.requiredDocuments.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n') +
      `\nFee: ₦25,000 | Delivery: Under 24 hours`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="documents" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Requirements Summary */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase">
              <FileText className="w-3.5 h-3.5" />
              <span>KYC & Onboarding Requirements</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple Documentation. Fast Verification.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To comply with Central Bank of Nigeria (CBN) regulations and ensure your funds are 100% secure, we require standard KYC credentials. Have them ready for instant processing.
            </p>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Turnaround Time</div>
                  <div className="text-sm font-bold text-slate-900">{content.deliveryTimeframe} Doorstep Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Data Privacy</div>
                  <div className="text-sm font-bold text-slate-900">Encrypted & Regulated Processing</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopyChecklist}
                className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Checklist Copied!' : 'Copy Checklist to Notes'}</span>
              </button>

              <button
                onClick={() => openOrderModal('pos_modal')}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>Upload Documents on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Checklist */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Required Documents Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Click each item as you gather them for your application.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">Progress:</span>
                <span className="ml-1 text-sm font-extrabold text-blue-600">
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {content.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-blue-50/70 border-blue-300 text-blue-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 text-blue-600">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-slate-500' : ''}`}>
                        {doc}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                      Req #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom conversion CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Need help preparing your documents? Kenny Olu will assist you on WhatsApp.
              </div>
              <button
                onClick={() => openOrderModal('pos_modal')}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Submit Application & Order POS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
