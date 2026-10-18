import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight 
} from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { content, generateWhatsAppUrl, openOrderModal } = useContent();
  const [openId, setOpenId] = useState<string>(content.faqs[0]?.id || 'faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const filteredFaqs = content.faqs.filter((faq) => {
    const q = faq.question.toLowerCase();
    const a = faq.answer.toLowerCase();
    const query = searchQuery.toLowerCase();
    return q.includes(query) || a.includes(query);
  });

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Clear, honest answers about acquiring Moniepoint POS, documentation, fees, delivery timelines, and business loans.
          </p>

          {/* Quick Search Input */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. price, loan, documents, delivery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id || index}
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? 'bg-white border-blue-300 shadow-md ring-1 ring-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-1">
                      <p className="whitespace-pre-line">{faq.answer}</p>
                      
                      {faq.question.toLowerCase().includes('cost') && (
                        <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl text-xs font-semibold flex items-center justify-between">
                          <span>Official POS Acquisition: <strong>₦25,000 only</strong></span>
                          <button
                            onClick={() => openOrderModal('pos_modal')}
                            className="text-blue-700 underline font-bold"
                          >
                            Order Now &rarr;
                          </button>
                        </div>
                      )}

                      {faq.question.toLowerCase().includes('loan') && (
                        <div className="mt-3 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between">
                          <span>Loan Range: <strong>₦500,000 to Millions</strong></span>
                          <button
                            onClick={() => openOrderModal('loan_modal')}
                            className="text-emerald-700 underline font-bold"
                          >
                            Check Loan Eligibility &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
              <p>No questions matched "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-blue-600 font-bold underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Direct Contact Card for Other Questions */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Have a question that is not answered here?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Chat directly with Kenny Olu on WhatsApp or call our support line.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${content.phone}`}
              className="py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>{content.phone}</span>
            </a>
            <a
              href={generateWhatsAppUrl("Hello Kenny Concept, I have a specific question regarding Moniepoint services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
