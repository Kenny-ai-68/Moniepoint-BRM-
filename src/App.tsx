import React, { useEffect } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudienceSection } from './components/AudienceSection';
import { ProductsSection } from './components/ProductsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { LoanCalculator } from './components/LoanCalculator';
import { DocumentChecklist } from './components/DocumentChecklist';
import { OutcomesSection } from './components/OutcomesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { isAdminView, openAdminLogin, isAdminLoggedIn, setIsAdminView } = useContent();

  // Hidden admin access listeners (#admin, /admin, ?admin, and Ctrl+Shift+A)
  useEffect(() => {
    const checkAdminTrigger = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#admin' || hash === '#login' || search.includes('admin') || path.endsWith('/admin')) {
        if (isAdminLoggedIn) {
          setIsAdminView(true);
        } else {
          openAdminLogin();
        }
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    window.addEventListener('popstate', checkAdminTrigger);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl+Shift+A or Cmd+Shift+A to open admin login
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminView(true);
        } else {
          openAdminLogin();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('popstate', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn, openAdminLogin, setIsAdminView]);

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-900">
        <AdminDashboard />
        <AdminLoginModal />
        <OrderModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Top Navbar (100% clean for visitors, no admin locks or buttons) */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About The Products & Who It Is For */}
        <AudienceSection />

        {/* 3. Products Section (POS ₦25,000, Loan ₦500k+, Moniebook, Savings) */}
        <ProductsSection />

        {/* 4. Benefits Section (Enjoy Stable Internet Connection spotlight) */}
        <BenefitsSection />

        {/* 5. Business Loan Calculator & Estimator */}
        <LoanCalculator />

        {/* 6. Required Documents & KYC Checklist */}
        <DocumentChecklist />

        {/* 7. Learning & Business Growth Outcomes */}
        <OutcomesSection />

        {/* 8. Testimonials Section (4 business reviews) */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions (FAQ) */}
        <FAQSection />

        {/* 10. Final Call to Action Section */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <FloatingWhatsApp />
      <OrderModal />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <MainLayout />
    </ContentProvider>
  );
}
