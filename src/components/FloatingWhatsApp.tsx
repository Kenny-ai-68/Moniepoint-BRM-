import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { MessageCircle, Phone, CreditCard, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { content, openOrderModal, generateWhatsAppUrl, isAdminView } = useContent();
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  if (isAdminView) return null;

  return (
    <>
      {/* Desktop Floating WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end">
        {showTooltip && (
          <div className="mb-2 bg-slate-900 text-white text-xs font-medium py-2 px-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce border border-slate-700">
            <span>👋 Chat with Kenny Olu on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border-2 border-white cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border border-white"></span>
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href={`tel:${content.phone}`}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
          aria-label="Call direct"
        >
          <Phone className="w-5 h-5 text-blue-600" />
        </a>

        <button
          onClick={() => openOrderModal('pos_modal')}
          className="flex-1 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Order POS (₦25k)</span>
        </button>

        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
