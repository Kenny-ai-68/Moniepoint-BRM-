import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, LeadInquiry, CTAButton, ProductItem, BenefitItem, OutcomeItem, TestimonialItem, FAQItem } from '../types';
import { defaultSiteContent } from '../data/defaultContent';

const STORAGE_KEY = 'kenny_olu_digital_content_v6';
const LEADS_STORAGE_KEY = 'kenny_olu_digital_leads_v1';
const ADMIN_SESSION_KEY = 'kenny_olu_admin_session';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  resetToDefaults: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
  
  // Specific Entity Updaters for easy admin actions
  updateCTAButton: (index: number, updated: CTAButton) => void;
  addProduct: (product: ProductItem) => void;
  editProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  
  addBenefit: (benefit: BenefitItem) => void;
  editBenefit: (id: string, updated: Partial<BenefitItem>) => void;
  deleteBenefit: (id: string) => void;
  
  addOutcome: (outcome: OutcomeItem) => void;
  editOutcome: (id: string, updated: Partial<OutcomeItem>) => void;
  deleteOutcome: (id: string) => void;
  
  addTestimonial: (testimonial: TestimonialItem) => void;
  editTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  
  addFAQ: (faq: FAQItem) => void;
  editFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Leads & Inquiries
  leads: LeadInquiry[];
  addLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => LeadInquiry;
  updateLeadStatus: (id: string, status: LeadInquiry['status']) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  setAllLeads: (leads: LeadInquiry[]) => void;
  
  // Modals & UI Navigation
  isOrderModalOpen: boolean;
  orderModalType: 'pos_modal' | 'loan_modal' | 'inquiry_modal';
  openOrderModal: (type?: 'pos_modal' | 'loan_modal' | 'inquiry_modal', initialData?: Partial<LeadInquiry>) => void;
  closeOrderModal: () => void;
  orderModalInitialData?: Partial<LeadInquiry>;

  isAdminLoginOpen: boolean;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;

  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  isAdminView: boolean;
  setIsAdminView: (view: boolean) => void;

  // Helper WhatsApp generator
  generateWhatsAppUrl: (customMessage?: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSiteContent, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse saved site content, using defaults', e);
    }
    return defaultSiteContent;
  });

  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved leads', e);
    }
    // Initial sample lead for admin demo
    return [
      {
        id: 'lead-1',
        fullName: 'Sunday Adeleke',
        phone: '08023456789',
        email: 'sunday.adeleke@gmail.com',
        businessName: 'Adeleke Mega Supermarket',
        businessAddress: '14 Allen Avenue, Ikeja, Lagos',
        serviceType: 'POS Terminal',
        status: 'In Progress',
        createdAt: '2026-10-17 14:30',
        notes: 'Requested delivery tomorrow morning for 2 smart POS terminals.',
      },
      {
        id: 'lead-2',
        fullName: 'Chidinma Nnamdi',
        phone: '08139876543',
        email: 'chidinma.n@yahoo.com',
        businessName: 'Chidi Glow Cosmetics',
        serviceType: 'Business Loan',
        loanAmountRequested: '₦2,500,000',
        status: 'New',
        createdAt: '2026-10-17 16:15',
        notes: 'Inquiring on working capital for holiday bulk purchases.',
      },
    ];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderModalType, setOrderModalType] = useState<'pos_modal' | 'loan_modal' | 'inquiry_modal'>('pos_modal');
  const [orderModalInitialData, setOrderModalInitialData] = useState<Partial<LeadInquiry> | undefined>(undefined);

  // Sync content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content to localStorage', e);
    }
  }, [content]);

  // Sync leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage', e);
    }
  }, [leads]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  const resetToDefaults = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
    } catch (e) {
      console.error(e);
    }
  };

  const exportContentJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kenny_olu_digital_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importContentJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.businessName) {
        setContent({ ...defaultSiteContent, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
    return false;
  };

  // CTA button updater
  const updateCTAButton = (index: number, updated: CTAButton) => {
    setContent((prev) => {
      const newButtons = [...prev.ctaButtons];
      newButtons[index] = updated;
      return { ...prev, ctaButtons: newButtons };
    });
  };

  // Product updaters
  const addProduct = (product: ProductItem) => {
    setContent((prev) => ({ ...prev, products: [...prev.products, product] }));
  };
  const editProduct = (id: string, updated: Partial<ProductItem>) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };
  const deleteProduct = (id: string) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  // Benefit updaters
  const addBenefit = (benefit: BenefitItem) => {
    setContent((prev) => ({ ...prev, benefits: [...prev.benefits, benefit] }));
  };
  const editBenefit = (id: string, updated: Partial<BenefitItem>) => {
    setContent((prev) => ({
      ...prev,
      benefits: prev.benefits.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  };
  const deleteBenefit = (id: string) => {
    setContent((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((b) => b.id !== id),
    }));
  };

  // Outcome updaters
  const addOutcome = (outcome: OutcomeItem) => {
    setContent((prev) => ({ ...prev, outcomes: [...prev.outcomes, outcome] }));
  };
  const editOutcome = (id: string, updated: Partial<OutcomeItem>) => {
    setContent((prev) => ({
      ...prev,
      outcomes: prev.outcomes.map((o) => (o.id === id ? { ...o, ...updated } : o)),
    }));
  };
  const deleteOutcome = (id: string) => {
    setContent((prev) => ({
      ...prev,
      outcomes: prev.outcomes.filter((o) => o.id !== id),
    }));
  };

  // Testimonial updaters
  const addTestimonial = (testimonial: TestimonialItem) => {
    setContent((prev) => ({ ...prev, testimonials: [...prev.testimonials, testimonial] }));
  };
  const editTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  };
  const deleteTestimonial = (id: string) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  // FAQ updaters
  const addFAQ = (faq: FAQItem) => {
    setContent((prev) => ({ ...prev, faqs: [...prev.faqs, faq] }));
  };
  const editFAQ = (id: string, updated: Partial<FAQItem>) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };
  const deleteFAQ = (id: string) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  // Leads
  const addLead = (leadData: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>): LeadInquiry => {
    const newLead: LeadInquiry = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadInquiry['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const clearAllLeads = () => {
    setLeads([]);
  };

  // Admin Auth: password requested is Kenny123
  const loginAdmin = (password: string): boolean => {
    if (password === 'Kenny123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAdminView(true);
      setIsAdminLoginOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminView(false);
  };

  const openAdminLogin = () => setIsAdminLoginOpen(true);
  const closeAdminLogin = () => setIsAdminLoginOpen(false);

  const openOrderModal = (type: 'pos_modal' | 'loan_modal' | 'inquiry_modal' = 'pos_modal', initialData?: Partial<LeadInquiry>) => {
    setOrderModalType(type);
    setOrderModalInitialData(initialData);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setOrderModalInitialData(undefined);
  };

  const generateWhatsAppUrl = (customMessage?: string) => {
    const phone = content.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(customMessage || content.whatsappDefaultMsg);
    return `https://wa.me/${phone}?text=${msg}`;
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        resetToDefaults,
        exportContentJson,
        importContentJson,
        updateCTAButton,
        addProduct,
        editProduct,
        deleteProduct,
        addBenefit,
        editBenefit,
        deleteBenefit,
        addOutcome,
        editOutcome,
        deleteOutcome,
        addTestimonial,
        editTestimonial,
        deleteTestimonial,
        addFAQ,
        editFAQ,
        deleteFAQ,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        setAllLeads: setLeads,
        isOrderModalOpen,
        orderModalType,
        openOrderModal,
        closeOrderModal,
        orderModalInitialData,
        isAdminLoginOpen,
        openAdminLogin,
        closeAdminLogin,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminView,
        setIsAdminView,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
