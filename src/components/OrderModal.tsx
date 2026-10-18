import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  CreditCard, 
  TrendingUp, 
  BookOpen, 
  PiggyBank, 
  MessageCircle, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { LeadInquiry } from '../types';
import { submitLeadToSupabase } from '../lib/supabase';

export const OrderModal: React.FC = () => {
  const { 
    content, 
    isOrderModalOpen, 
    closeOrderModal, 
    orderModalType, 
    orderModalInitialData,
    addLead,
    generateWhatsAppUrl 
  } = useContent();

  const [serviceType, setServiceType] = useState<LeadInquiry['serviceType']>('POS Terminal');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('₦1,500,000');
  const [hasBVN, setHasBVN] = useState(true);
  const [hasNIN, setHasNIN] = useState(true);
  const [notes, setNotes] = useState('');
  const [deliveryState, setDeliveryState] = useState<'Lagos State' | 'Ogun State' | 'Other Location'>('Lagos State');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync initial state when modal opens
  useEffect(() => {
    if (isOrderModalOpen) {
      setIsSubmitted(false);
      setErrorMsg('');
      if (orderModalType === 'pos_modal') {
        setServiceType('POS Terminal');
      } else if (orderModalType === 'loan_modal') {
        setServiceType('Business Loan');
      } else {
        setServiceType(orderModalInitialData?.serviceType || 'General Inquiry');
      }

      if (orderModalInitialData?.businessName) {
        setBusinessName(orderModalInitialData.businessName);
      }
      if (orderModalInitialData?.loanAmountRequested) {
        setLoanAmount(orderModalInitialData.loanAmountRequested);
      }
      if (orderModalInitialData?.notes) {
        setNotes(orderModalInitialData.notes);
      }
    }
  }, [isOrderModalOpen, orderModalType, orderModalInitialData]);

  if (!isOrderModalOpen) return null;

  const buildSummaryText = () => {
    return `*New Order / Inquiry via Website*\n` +
      `*Service:* ${serviceType}\n` +
      `*Name:* ${fullName || 'Not provided'}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Business Name:* ${businessName || 'Not provided'}\n` +
      `*Delivery State:* ${deliveryState}\n` +
      (businessAddress ? `*Delivery Address / Shop:* ${businessAddress}\n` : '') +
      (serviceType === 'Business Loan' ? `*Loan Requested:* ${loanAmount}\n` : '') +
      (serviceType === 'POS Terminal' ? `*Fee:* ₦25,000 (Delivery <24h in Ogun & Lagos)\n` : '') +
      `*Documents Ready:* NIN: ${hasNIN ? 'Yes' : 'Pending'}, BVN: ${hasBVN ? 'Yes' : 'Pending'}\n` +
      (notes ? `*Notes:* ${notes}\n` : '') +
      `*Kenny Olu Digital Hub:* 3 Matogun road Adiyan gasline Agbado\n` +
      `\nHello Kenny Olu, please confirm my order / inquiry.`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !fullName) {
      setErrorMsg('Please enter your full name and phone number to proceed.');
      return;
    }

    // Save lead to local database
    addLead({
      fullName,
      phone,
      businessName: businessName || 'Not specified',
      businessAddress: `${deliveryState}: ${businessAddress || ''}`,
      residentialAddress,
      serviceType,
      loanAmountRequested: serviceType === 'Business Loan' ? loanAmount : undefined,
      bvnProvided: hasBVN,
      ninProvided: hasNIN,
      notes,
    });

    // Also sync to Supabase if configured
    submitLeadToSupabase({
      fullName,
      phone,
      businessName: businessName || 'Not specified',
      deliveryState,
      businessAddress,
      serviceType,
      loanAmountRequested: serviceType === 'Business Loan' ? loanAmount : undefined,
      bvnProvided: hasBVN,
      ninProvided: hasNIN,
      notes,
    });

    const url = generateWhatsAppUrl(buildSummaryText());
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !fullName) {
      setErrorMsg('Please enter your full name and phone number to proceed.');
      return;
    }

    addLead({
      fullName,
      phone,
      businessName: businessName || 'Not specified',
      businessAddress: `${deliveryState}: ${businessAddress || ''}`,
      residentialAddress,
      serviceType,
      loanAmountRequested: serviceType === 'Business Loan' ? loanAmount : undefined,
      bvnProvided: hasBVN,
      ninProvided: hasNIN,
      notes,
    });

    // Also sync to Supabase if configured
    submitLeadToSupabase({
      fullName,
      phone,
      businessName: businessName || 'Not specified',
      deliveryState,
      businessAddress,
      serviceType,
      loanAmountRequested: serviceType === 'Business Loan' ? loanAmount : undefined,
      bvnProvided: hasBVN,
      ninProvided: hasNIN,
      notes,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white">
              {serviceType === 'POS Terminal' && <CreditCard className="w-5 h-5" />}
              {serviceType === 'Business Loan' && <TrendingUp className="w-5 h-5" />}
              {serviceType === 'Moniebook' && <BookOpen className="w-5 h-5" />}
              {serviceType === 'Business Savings' && <PiggyBank className="w-5 h-5" />}
              {serviceType === 'General Inquiry' && <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {serviceType === 'POS Terminal' ? 'Order Moniepoint POS Terminal' : ''}
                {serviceType === 'Business Loan' ? 'Apply for Business Loan' : ''}
                {serviceType === 'Moniebook' ? 'Get Moniebook Bookkeeper' : ''}
                {serviceType === 'Business Savings' ? 'Start Business Savings' : ''}
                {serviceType === 'General Inquiry' ? 'Submit Business Inquiry' : ''}
              </h3>
              <div className="text-xs text-blue-100 flex items-center gap-2">
                <span>Direct Processing by Kenny Olu Digital</span>
                {serviceType === 'POS Terminal' && <span>• ₦25,000 Fee</span>}
              </div>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Application Received Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your request for <strong>{serviceType}</strong> has been forwarded to Kenny Olu. We will contact you at <strong>{phone}</strong> to confirm your details.
              </p>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 text-left space-y-1.5 max-w-md mx-auto">
                <div className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Next Step & Delivery Timeline:</span>
                </div>
                <p>
                  Terminal configuration and doorstep delivery takes under 24 hours once documents are sighted.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={generateWhatsAppUrl(buildSummaryText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp to Confirm Immediately</span>
                </a>
                <button
                  onClick={closeOrderModal}
                  className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Service Selection Tabs */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Select Required Service:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'POS Terminal', type: 'POS Terminal' },
                    { label: 'Business Loan', type: 'Business Loan' },
                    { label: 'Moniebook', type: 'Moniebook' },
                    { label: 'Savings', type: 'Business Savings' },
                  ].map((s) => (
                    <button
                      key={s.type}
                      type="button"
                      onClick={() => setServiceType(s.type as LeadInquiry['serviceType'])}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        serviceType === s.type
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* POS Price Callout if POS is active */}
              {serviceType === 'POS Terminal' && (
                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-900">Moniepoint POS Acquisition:</span>
                    <span className="ml-1 text-blue-700 font-extrabold">{content.posPrice} only</span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    Under 24h Delivery
                  </span>
                </div>
              )}

              {/* Loan Amount Input if Loan is active */}
              {serviceType === 'Business Loan' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Requested Business Loan Amount:
                  </label>
                  <select
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="₦500,000">₦500,000</option>
                    <option value="₦1,000,000">₦1,000,000</option>
                    <option value="₦1,500,000">₦1,500,000</option>
                    <option value="₦2,500,000">₦2,500,000</option>
                    <option value="₦5,000,000">₦5,000,000</option>
                    <option value="₦10,000,000+">₦10,000,000+ (Enterprise)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Loans require active transaction turnover. Subject to assessment.
                  </p>
                </div>
              )}

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adebayo Johnson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08105885003"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Business / Enterprise Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Johnson Supermarket / Enterprises"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Delivery State & Specific Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Delivery State <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lagos State">Lagos State (Under 24h Doorstep Delivery)</option>
                    <option value="Ogun State">Ogun State (Under 24h Doorstep Delivery)</option>
                    <option value="Other Location">Other Location / Inter-state Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Shop / Office Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Market Road, Ikeja or Agbado"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Document Readiness Checks */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Document Readiness:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasNIN}
                      onChange={(e) => setHasNIN(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>I have NIN / ID</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBVN}
                      onChange={(e) => setHasBVN(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>I have BVN</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Additional Notes / Questions (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific delivery instructions or questions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 2 Conversion Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Submit & Chat on WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
                >
                  <span>Submit Order Online</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                Direct BRM Assistance • Delivery Under 24h • 100% Confidential
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
