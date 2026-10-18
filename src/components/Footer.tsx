import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  LayoutDashboard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, openAdminLogin, isAdminLoggedIn, isAdminView, setIsAdminView, generateWhatsAppUrl } = useContent();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                K
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                {content.businessName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Moniepoint Business Relationship Manager providing high-performance Smart POS Terminals (₦25,000), business working capital loans (₦500k to millions), Moniebook, and high-yield business savings.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 text-xs border border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>CBN Regulated MFB Services</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`tel:${content.phone}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Call: {content.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>WhatsApp: {content.phone}</span>
                </a>
              </li>
              {content.email && (
                <li>
                  <a
                    href={`mailto:${content.email}`}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{content.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{content.officeAddress}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Solutions & Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Moniepoint Smart POS (₦25,000)
                </a>
              </li>
              <li>
                <a href="#loan-calculator" className="hover:text-white transition-colors">
                  Business Loans (₦500k – Millions)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Moniebook Digital Ledger
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  High-Yield Business Savings
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-white transition-colors">
                  KYC & Documentation Checklist
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Delivery Guarantee
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Under 24 Hours Turnaround</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Doorstep dispatch specifically to business owners across Ogun and Lagos State in under 24 hours.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div 
            onDoubleClick={openAdminLogin}
            className="cursor-default select-none"
            title=""
          >
            &copy; {currentYear} {content.businessName}. All Rights Reserved. Moniepoint MFB authorized partner.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span 
              onClick={openAdminLogin}
              className="cursor-default text-slate-700 hover:text-slate-600 select-none"
              title=""
            >
              •
            </span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-blue-400">BRM: {content.brmName}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
