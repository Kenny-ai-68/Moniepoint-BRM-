import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Phone, 
  MessageCircle, 
  Lock, 
  Menu, 
  X, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { content, openOrderModal, openAdminLogin, isAdminLoggedIn, isAdminView, setIsAdminView, generateWhatsAppUrl } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Who It Is For', href: '#audience' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Loan Calculator', href: '#loan-calculator' },
    { label: 'Required Documents', href: '#documents' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      setIsAdminView(false);
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              ⚡ Fast Track
            </span>
            <span>
              Moniepoint Smart POS: <strong className="text-blue-400">{content.posPrice}</strong> | Doorstep delivery in <strong className="text-white">{content.deliveryTimeframe}</strong> (Ogun & Lagos State)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`tel:${content.phone}`}
              className="flex items-center gap-1 hover:text-blue-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call: {content.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-400 text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); if (isAdminView) setIsAdminView(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                K
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                  {content.businessName}
                </span>
                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  {content.businessType}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openOrderModal('pos_modal')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Order POS (₦25k)</span>
            </button>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => { setMobileMenuOpen(false); openOrderModal('pos_modal'); }}
              className="w-full py-2.5 px-3 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Order POS (₦25k)</span>
            </button>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <a href={`tel:${content.phone}`} className="flex items-center gap-1.5 text-blue-600 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Line: {content.phone}</span>
            </a>
            <span className="text-slate-400 text-[11px]">Official Moniepoint BRM</span>
          </div>
        </div>
      )}
    </header>
  );
};
