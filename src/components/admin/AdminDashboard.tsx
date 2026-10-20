import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  MousePointerClick, 
  GraduationCap, 
  MessageSquareQuote, 
  HelpCircle, 
  Users, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  Eye, 
  LogOut,
  Sparkles,
  Search,
  Check,
  Package,
  ShieldCheck,
  Database,
  Key,
  Globe,
  Image as ImageIcon,
  Video,
  Play
} from 'lucide-react';
import { 
  CTAButton, 
  OutcomeItem, 
  TestimonialItem, 
  FAQItem, 
  BenefitItem, 
  ProductItem, 
  LeadInquiry 
} from '../../types';
import { 
  SUPABASE_PROJECT_URL, 
  getSupabaseAnonKey, 
  saveSupabaseAnonKey, 
  testSupabaseConnection,
  fetchLeadsFromSupabase
} from '../../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const { 
    content, 
    updateContent, 
    resetToDefaults, 
    exportContentJson, 
    importContentJson,
    updateCTAButton,
    addOutcome,
    editOutcome,
    deleteOutcome,
    addTestimonial,
    editTestimonial,
    deleteTestimonial,
    addFAQ,
    editFAQ,
    deleteFAQ,
    addBenefit,
    editBenefit,
    deleteBenefit,
    addProduct,
    editProduct,
    deleteProduct,
    leads,
    updateLeadStatus,
    deleteLead,
    clearAllLeads,
    setAllLeads,
    logoutAdmin,
    setIsAdminView,
    adminUserEmail
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    'general' | 'media' | 'cta' | 'outcomes' | 'testimonials' | 'faqs' | 'benefits' | 'products' | 'leads' | 'settings'
  >('general');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('all');

  // Supabase connection state
  const [supabaseKeyInput, setSupabaseKeyInput] = useState<string>(getSupabaseAnonKey());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [isSyncingLeads, setIsSyncingLeads] = useState(false);

  const handleSyncSupabaseLeads = async () => {
    setIsSyncingLeads(true);
    const res = await fetchLeadsFromSupabase();
    if (res.success && res.data && res.data.length > 0) {
      const mapped: LeadInquiry[] = res.data.map((item: any) => ({
        id: item.id,
        fullName: item.full_name || 'Anonymous',
        phone: item.phone || '',
        email: item.email,
        businessName: item.business_name || '',
        businessAddress: item.business_address || item.delivery_state || '',
        residentialAddress: item.residential_address,
        serviceType: item.service_type || 'POS Terminal',
        loanAmountRequested: item.loan_amount_requested,
        bvnProvided: item.bvn_provided,
        ninProvided: item.nin_provided,
        notes: item.notes,
        status: item.status || 'New',
        createdAt: item.created_at ? new Date(item.created_at).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) : 'Recent',
      }));

      // Combine with local leads without duplicate IDs
      const existingIds = new Set(mapped.map((m) => m.id));
      const filteredLocal = leads.filter((l) => !existingIds.has(l.id));
      setAllLeads([...mapped, ...filteredLocal]);
      alert(`Successfully synced ${mapped.length} leads directly from Supabase!`);
    } else if (res.success) {
      alert('Connected to Supabase! No submissions in the leads table yet.');
    } else {
      const err = res.error as any;
      alert(`Supabase notice: ${err?.message || 'Please check that the SQL schema has been executed in the Supabase SQL editor.'}`);
    }
    setIsSyncingLeads(false);
  };

  // Form states for general
  const [generalForm, setGeneralForm] = useState({
    businessName: content.businessName,
    businessType: content.businessType,
    brmName: content.brmName,
    phone: content.phone,
    whatsappNumber: content.whatsappNumber,
    email: content.email,
    officeAddress: content.officeAddress,
    heroBadge: content.heroBadge,
    courseTitle: content.courseTitle,
    heroHeadline: content.heroHeadline,
    heroSubheadline: content.heroSubheadline,
    heroDescription: content.heroDescription,
    heroImageUrl: content.heroImageUrl,
    promoVideoUrl: content.promoVideoUrl,
    audienceMediaUrl: content.audienceMediaUrl || '',
    audienceMediaType: content.audienceMediaType || 'video',
    audienceMediaTitle: content.audienceMediaTitle || 'Promotional & Product Video',
    audienceMediaCaption: content.audienceMediaCaption || 'Insert YouTube, Vimeo, or video link here',
    posPrice: content.posPrice,
    deliveryTimeframe: content.deliveryTimeframe,
    loanAmountRange: content.loanAmountRange,
  });

  // Dedicated Loan & Savings Images state
  const [loanImageInput, setLoanImageInput] = useState<string>(content.loanImageUrl || '');
  const [savingsImageInput, setSavingsImageInput] = useState<string>(content.savingsImageUrl || '');

  const handleLoanFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setLoanImageInput(dataUrl);
      updateContent({ loanImageUrl: dataUrl });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSavingsFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setSavingsImageInput(dataUrl);
      updateContent({ savingsImageUrl: dataUrl });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleMediaFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateContent({ 
        audienceMediaUrl: dataUrl,
        audienceMediaType: isVideo ? 'video' : 'image',
        promoVideoUrl: isVideo ? dataUrl : ''
      });
      setGeneralForm((prev) => ({
        ...prev,
        audienceMediaUrl: dataUrl,
        audienceMediaType: isVideo ? 'video' : 'image',
        promoVideoUrl: isVideo ? dataUrl : ''
      }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleClearLoanImage = () => {
    setLoanImageInput('');
    updateContent({ loanImageUrl: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleClearSavingsImage = () => {
    setSavingsImageInput('');
    updateContent({ savingsImageUrl: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleClearShowcaseMedia = () => {
    updateContent({ audienceMediaUrl: '', promoVideoUrl: '' });
    setGeneralForm((prev) => ({ ...prev, audienceMediaUrl: '', promoVideoUrl: '' }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Modal / Inline item form states
  const [editingOutcome, setEditingOutcome] = useState<OutcomeItem | null>(null);
  const [newOutcome, setNewOutcome] = useState({ title: '', description: '' });
  const [showAddOutcome, setShowAddOutcome] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    businessName: '',
    clientName: '',
    role: '',
    location: '',
    testimonialText: '',
    rating: 5,
    productUsed: 'Moniepoint POS Terminal',
  });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: 'General' });
  const [showAddFAQ, setShowAddFAQ] = useState(false);

  const [editingBenefit, setEditingBenefit] = useState<BenefitItem | null>(null);
  const [newBenefit, setNewBenefit] = useState({ title: '', description: '', iconName: 'Wifi' });
  const [showAddBenefit, setShowAddBenefit] = useState(false);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(generalForm);
    triggerSaveNotification();
  };

  const handleCTAChange = (index: number, key: keyof CTAButton, value: any) => {
    const updated = { ...content.ctaButtons[index], [key]: value };
    updateCTAButton(index, updated);
    triggerSaveNotification();
  };

  // Outcome helpers
  const handleSaveNewOutcome = () => {
    if (!newOutcome.title) return;
    addOutcome({
      id: `out-${Date.now()}`,
      title: newOutcome.title,
      description: newOutcome.description,
    });
    setNewOutcome({ title: '', description: '' });
    setShowAddOutcome(false);
    triggerSaveNotification();
  };

  const handleUpdateOutcome = () => {
    if (!editingOutcome) return;
    editOutcome(editingOutcome.id, {
      title: editingOutcome.title,
      description: editingOutcome.description,
    });
    setEditingOutcome(null);
    triggerSaveNotification();
  };

  // Testimonial helpers
  const handleSaveNewTestimonial = () => {
    if (!newTestimonial.businessName || !newTestimonial.testimonialText) return;
    addTestimonial({
      id: `test-${Date.now()}`,
      businessName: newTestimonial.businessName,
      clientName: newTestimonial.clientName || 'Verified Merchant',
      role: newTestimonial.role || 'Business Owner',
      location: newTestimonial.location || 'Nigeria',
      testimonialText: newTestimonial.testimonialText,
      rating: newTestimonial.rating || 5,
      productUsed: newTestimonial.productUsed,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    });
    setNewTestimonial({
      businessName: '',
      clientName: '',
      role: '',
      location: '',
      testimonialText: '',
      rating: 5,
      productUsed: 'Moniepoint POS Terminal',
    });
    setShowAddTestimonial(false);
    triggerSaveNotification();
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    editTestimonial(editingTestimonial.id, editingTestimonial);
    setEditingTestimonial(null);
    triggerSaveNotification();
  };

  // FAQ helpers
  const handleSaveNewFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    addFAQ({
      id: `faq-${Date.now()}`,
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category,
    });
    setNewFAQ({ question: '', answer: '', category: 'General' });
    setShowAddFAQ(false);
    triggerSaveNotification();
  };

  const handleUpdateFAQ = () => {
    if (!editingFAQ) return;
    editFAQ(editingFAQ.id, editingFAQ);
    setEditingFAQ(null);
    triggerSaveNotification();
  };

  // Benefit helpers
  const handleSaveNewBenefit = () => {
    if (!newBenefit.title) return;
    addBenefit({
      id: `ben-${Date.now()}`,
      title: newBenefit.title,
      description: newBenefit.description,
      iconName: newBenefit.iconName,
    });
    setNewBenefit({ title: '', description: '', iconName: 'Wifi' });
    setShowAddBenefit(false);
    triggerSaveNotification();
  };

  const handleUpdateBenefit = () => {
    if (!editingBenefit) return;
    editBenefit(editingBenefit.id, editingBenefit);
    setEditingBenefit(null);
    triggerSaveNotification();
  };

  // Export Leads to CSV
  const exportLeadsCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Business Name', 'Service', 'Loan Requested', 'Status', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.createdAt}"`,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.businessName}"`,
      `"${l.serviceType}"`,
      `"${l.loanAmountRequested || 'N/A'}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kenny_olu_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Import JSON handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const contentStr = event.target?.result as string;
      if (contentStr) {
        const ok = importContentJson(contentStr);
        if (ok) {
          alert('Site content successfully restored from backup file!');
        } else {
          alert('Failed to parse backup file. Please ensure it is a valid JSON export.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesFilter = leadFilterStatus === 'all' || lead.status === leadFilterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">
              K
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                {content.businessName} • CMS Admin
              </div>
              <div className="text-[11px] text-blue-400 font-medium">
                BRM Management Suite • Authorized Session {adminUserEmail ? `(${adminUserEmail})` : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {saveSuccess && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Changes saved!</span>
              </span>
            )}

            <button
              onClick={() => setIsAdminView(false)}
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Site</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-200 scrollbar-none">
          {[
            { id: 'general', label: 'Course & Hero Info', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'media', label: 'Upload Images & Video', icon: <Upload className="w-4 h-4" /> },
            { id: 'cta', label: 'CTA Buttons (3)', icon: <MousePointerClick className="w-4 h-4" /> },
            { id: 'outcomes', label: 'Learning Outcomes', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'benefits', label: 'Benefits & Internet', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'products', label: 'Products & Pricing', icon: <Package className="w-4 h-4" /> },
            { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
            { id: 'faqs', label: 'FAQ Manager', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'leads', label: `Orders & Leads (${leads.length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'settings', label: 'Backup & Reset', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Course Information Management & Hero */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Course & Hero Information Management
                </h2>
                <p className="text-xs text-slate-500">
                  Update course title, powerful headline, subheadline, pricing, and video links.
                </p>
              </div>
              <button
                type="submit"
                form="general-form"
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>

            <form id="general-form" onSubmit={handleGeneralSubmit} className="space-y-6">
              
              {/* Course Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Course / Service Title:
                  </label>
                  <input
                    type="text"
                    value={generalForm.courseTitle}
                    onChange={(e) => setGeneralForm({ ...generalForm, courseTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Moniepoint Business Banking & Terminal Mastery"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Displayed as the top badge over the headline.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Hero Accreditation Badge:
                  </label>
                  <input
                    type="text"
                    value={generalForm.heroBadge}
                    onChange={(e) => setGeneralForm({ ...generalForm, heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Powerful Headline & Subheadline */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Powerful Headline:
                  </label>
                  <textarea
                    rows={2}
                    value={generalForm.heroHeadline}
                    onChange={(e) => setGeneralForm({ ...generalForm, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Subheadline:
                  </label>
                  <textarea
                    rows={2}
                    value={generalForm.heroSubheadline}
                    onChange={(e) => setGeneralForm({ ...generalForm, heroSubheadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Short Description:
                  </label>
                  <textarea
                    rows={3}
                    value={generalForm.heroDescription}
                    onChange={(e) => setGeneralForm({ ...generalForm, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Pricing & Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    POS Machine Price:
                  </label>
                  <input
                    type="text"
                    value={generalForm.posPrice}
                    onChange={(e) => setGeneralForm({ ...generalForm, posPrice: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Delivery Timeframe:
                  </label>
                  <input
                    type="text"
                    value={generalForm.deliveryTimeframe}
                    onChange={(e) => setGeneralForm({ ...generalForm, deliveryTimeframe: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-emerald-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Loan Amount Range:
                  </label>
                  <input
                    type="text"
                    value={generalForm.loanAmountRange}
                    onChange={(e) => setGeneralForm({ ...generalForm, loanAmountRange: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Media: Hero Image & Video URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Hero Image URL:
                  </label>
                  <input
                    type="text"
                    value={generalForm.heroImageUrl}
                    onChange={(e) => setGeneralForm({ ...generalForm, heroImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Promotional Video URL (YouTube / Vimeo / MP4):
                  </label>
                  <input
                    type="text"
                    value={generalForm.promoVideoUrl}
                    onChange={(e) => setGeneralForm({ ...generalForm, promoVideoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              {/* About The Products Media Showcase (Image or Video) */}
              <div className="p-4 sm:p-5 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      About The Products Media Showcase (Image or Video Slot)
                    </h4>
                    <p className="text-[11px] text-blue-700">
                      Configure the image or video displayed in the 6th slot of the "About The Products" section.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-white text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                    6th Grid Slot
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Display Type:
                    </label>
                    <select
                      value={generalForm.audienceMediaType}
                      onChange={(e) => setGeneralForm({ ...generalForm, audienceMediaType: e.target.value as 'image' | 'video' })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium"
                    >
                      <option value="image">Image (Photo / Flyer / Graphic)</option>
                      <option value="video">Video (YouTube / Vimeo / MP4)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Media URL:
                    </label>
                    <input
                      type="text"
                      value={generalForm.audienceMediaUrl}
                      onChange={(e) => setGeneralForm({ ...generalForm, audienceMediaUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder={generalForm.audienceMediaType === 'video' ? 'https://www.youtube.com/watch?v=...' : 'https://... image URL'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Media Title:
                    </label>
                    <input
                      type="text"
                      value={generalForm.audienceMediaTitle}
                      onChange={(e) => setGeneralForm({ ...generalForm, audienceMediaTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder="e.g. Moniepoint Smart POS in Action"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Media Caption / Subtitle:
                    </label>
                    <input
                      type="text"
                      value={generalForm.audienceMediaCaption}
                      onChange={(e) => setGeneralForm({ ...generalForm, audienceMediaCaption: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      placeholder="e.g. Official Terminal Deployment & Setup"
                    />
                  </div>
                </div>
              </div>

              {/* Direct Relationship Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Direct Phone Number:
                  </label>
                  <input
                    type="text"
                    value={generalForm.phone}
                    onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    WhatsApp Number (International format):
                  </label>
                  <input
                    type="text"
                    value={generalForm.whatsappNumber}
                    onChange={(e) => setGeneralForm({ ...generalForm, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    placeholder="e.g. 2348105885003"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    BRM Name / Concept:
                  </label>
                  <input
                    type="text"
                    value={generalForm.brmName}
                    onChange={(e) => setGeneralForm({ ...generalForm, brmName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Office Address & Primary Delivery Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Office / Hub Physical Address:
                  </label>
                  <input
                    type="text"
                    value={generalForm.officeAddress}
                    onChange={(e) => setGeneralForm({ ...generalForm, officeAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    placeholder="3 Matogun road Adiyan gasline Agbado"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Delivery Coverage Area:
                  </label>
                  <input
                    type="text"
                    value={content.serviceArea}
                    onChange={(e) => updateContent({ serviceArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    placeholder="Ogun and Lagos State specifically"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Course & Hero Information</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab: Dedicated Media & Images Upload Center */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <span>Upload Images & Media Center</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload your own photos, graphics, flyers, and video directly from your phone/computer or paste URLs.
                  </p>
                </div>
                {saveSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Media updated live!</span>
                  </span>
                )}
              </div>

              {/* 3 Dedicated Media Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                
                {/* Panel 1: Where Business Loan is */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                        Where Loan Is
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Products Section • Card 2
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      Business Loan Image Space
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      This image is displayed directly inside the <strong>Business Working Capital Loan</strong> product card.
                    </p>

                    {/* Image Preview */}
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Current Image Display:
                      </div>
                      {content.loanImageUrl ? (
                        <div className="relative rounded-xl overflow-hidden border border-emerald-300 shadow-sm max-h-48 bg-white">
                          <img
                            src={content.loanImageUrl}
                            alt="Business Loan Preview"
                            className="w-full h-44 object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleClearLoanImage}
                            className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
                            title="Remove Loan Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-white p-5 text-center text-xs text-slate-500">
                          <ImageIcon className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                          <span className="font-semibold block text-slate-700">No loan image uploaded yet</span>
                          <span className="text-[11px]">The clean designated space is shown on the live site</span>
                        </div>
                      )}
                    </div>

                    {/* File Upload Trigger */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Option A: Upload Image File from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLoanFileUpload}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Option B: Or Enter Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={loanImageInput}
                            onChange={(e) => setLoanImageInput(e.target.value)}
                            placeholder="https://..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateContent({ loanImageUrl: loanImageInput });
                              setSaveSuccess(true);
                              setTimeout(() => setSaveSuccess(false), 3000);
                            }}
                            className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Where Business Savings is */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-amber-200 bg-amber-50/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                        Where Savings Is
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Products Section • Card 4
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      Business Savings Image Space
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      This image is displayed directly inside the <strong>Moniepoint Business Savings & Vault</strong> product card.
                    </p>

                    {/* Image Preview */}
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Current Image Display:
                      </div>
                      {content.savingsImageUrl ? (
                        <div className="relative rounded-xl overflow-hidden border border-amber-300 shadow-sm max-h-48 bg-white">
                          <img
                            src={content.savingsImageUrl}
                            alt="Business Savings Preview"
                            className="w-full h-44 object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleClearSavingsImage}
                            className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
                            title="Remove Savings Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div className="rounded-xl border-2 border-dashed border-amber-300 bg-white p-5 text-center text-xs text-slate-500">
                          <ImageIcon className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                          <span className="font-semibold block text-slate-700">No savings image uploaded yet</span>
                          <span className="text-[11px]">The clean designated space is shown on the live site</span>
                        </div>
                      )}
                    </div>

                    {/* File Upload Trigger */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Option A: Upload Image File from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSavingsFileUpload}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Option B: Or Enter Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={savingsImageInput}
                            onChange={(e) => setSavingsImageInput(e.target.value)}
                            placeholder="https://..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateContent({ savingsImageUrl: savingsImageInput });
                              setSaveSuccess(true);
                              setTimeout(() => setSaveSuccess(false), 3000);
                            }}
                            className="py-2 px-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Panel 3: Promotional Video & Showcase Media */}
              <div className="mt-8 p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/80 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-1 rounded-md">
                      Where Video / Media Slot Is
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      Showcase Video or Media Card (About The Products Section)
                    </h3>
                  </div>
                  {content.audienceMediaUrl && (
                    <button
                      type="button"
                      onClick={handleClearShowcaseMedia}
                      className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Video / Media</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload your own custom promotional video file (MP4, WebM) or paste your YouTube / Vimeo link. You can also upload a promotional image flyer.
                </p>

                {/* Current Media Status */}
                <div className="p-4 bg-white rounded-xl border border-blue-200 text-xs">
                  <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Current Status:</span>
                  </div>
                  {content.audienceMediaUrl ? (
                    <div className="text-emerald-700 font-semibold break-all">
                      Active: {content.audienceMediaUrl.slice(0, 70)}...
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">
                      No video or media currently loaded. The clean designated showcase space is visible.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Upload Video or Image File:
                    </label>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleMediaFileUpload}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Or Paste Video URL (YouTube / Vimeo / MP4):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generalForm.audienceMediaUrl}
                        onChange={(e) => setGeneralForm({ ...generalForm, audienceMediaUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          updateContent({ 
                            audienceMediaUrl: generalForm.audienceMediaUrl,
                            audienceMediaType: 'video',
                            promoVideoUrl: generalForm.audienceMediaUrl
                          });
                          setSaveSuccess(true);
                          setTimeout(() => setSaveSuccess(false), 3000);
                        }}
                        className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Media Title (Optional):
                    </label>
                    <input
                      type="text"
                      value={generalForm.audienceMediaTitle}
                      onChange={(e) => {
                        setGeneralForm({ ...generalForm, audienceMediaTitle: e.target.value });
                        updateContent({ audienceMediaTitle: e.target.value });
                      }}
                      placeholder="e.g. Moniepoint Smart POS in Action"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Media Caption / Subtitle (Optional):
                    </label>
                    <input
                      type="text"
                      value={generalForm.audienceMediaCaption}
                      onChange={(e) => {
                        setGeneralForm({ ...generalForm, audienceMediaCaption: e.target.value });
                        updateContent({ audienceMediaCaption: e.target.value });
                      }}
                      placeholder="e.g. Official Terminal Deployment & Setup"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: CTA Button Management */}
        {activeTab === 'cta' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Call-To-Action (CTA) Button System
              </h2>
              <p className="text-xs text-slate-500">
                The website supports 3 customizable CTA buttons. Update their labels, destination links, and interactive modal triggers.
              </p>
            </div>

            <div className="space-y-6">
              {content.ctaButtons.map((btn, index) => (
                <div
                  key={btn.id || index}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                      CTA Button #{index + 1}
                    </span>
                    <span className="text-xs text-slate-400">
                      Action Type: <strong className="text-blue-600">{btn.actionType}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Button Label Text:
                      </label>
                      <input
                        type="text"
                        value={btn.label}
                        onChange={(e) => handleCTAChange(index, 'label', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Button Action Type:
                      </label>
                      <select
                        value={btn.actionType}
                        onChange={(e) => handleCTAChange(index, 'actionType', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white"
                      >
                        <option value="whatsapp">Direct WhatsApp (Pre-filled)</option>
                        <option value="pos_modal">Open POS Terminal Order Modal</option>
                        <option value="loan_modal">Open Business Loan Modal</option>
                        <option value="inquiry_modal">Open General Inquiry Modal</option>
                        <option value="external">External / Anchor Link</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Link URL (or anchor #id):
                      </label>
                      <input
                        type="text"
                        value={btn.url}
                        onChange={(e) => handleCTAChange(index, 'url', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Any changes to button labels and links are immediately live and persistent.</span>
            </div>
          </div>
        )}

        {/* Tab 3: Learning Outcomes Management */}
        {activeTab === 'outcomes' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Learning Outcomes & Transformation Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add, edit, or delete the key transformation outcomes shown to prospective clients.
                </p>
              </div>
              <button
                onClick={() => setShowAddOutcome(true)}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Outcome</span>
              </button>
            </div>

            {/* Add New Outcome Form Modal/Box */}
            {showAddOutcome && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-900">Add New Outcome</h3>
                <input
                  type="text"
                  placeholder="Outcome Title (e.g. Zero Revenue Losses to Network Timeouts)"
                  value={newOutcome.title}
                  onChange={(e) => setNewOutcome({ ...newOutcome, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Outcome Description..."
                  value={newOutcome.description}
                  onChange={(e) => setNewOutcome({ ...newOutcome, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowAddOutcome(false)}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewOutcome}
                    className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Save Outcome
                  </button>
                </div>
              </div>
            )}

            {/* List of Outcomes */}
            <div className="space-y-3">
              {content.outcomes.map((outcome, idx) => (
                <div
                  key={outcome.id || idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  {editingOutcome?.id === outcome.id ? (
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={editingOutcome.title}
                        onChange={(e) => setEditingOutcome({ ...editingOutcome, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                      />
                      <textarea
                        rows={2}
                        value={editingOutcome.description}
                        onChange={(e) => setEditingOutcome({ ...editingOutcome, description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateOutcome}
                          className="py-1 px-3 bg-emerald-600 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingOutcome(null)}
                          className="py-1 px-3 bg-slate-200 text-slate-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {outcome.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {outcome.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingOutcome(outcome)}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteOutcome(outcome.id)}
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Benefits Section Management */}
        {activeTab === 'benefits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Benefits Management
                </h2>
                <p className="text-xs text-slate-500">
                  Manage the transformation benefits (including Enjoy Stable Internet Connection).
                </p>
              </div>
              <button
                onClick={() => setShowAddBenefit(true)}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Benefit</span>
              </button>
            </div>

            {showAddBenefit && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-900">Add New Benefit</h3>
                <input
                  type="text"
                  placeholder="Benefit Title (e.g. Enjoy Stable Internet Connection)"
                  value={newBenefit.title}
                  onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Benefit Description..."
                  value={newBenefit.description}
                  onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowAddBenefit(false)}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewBenefit}
                    className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Save Benefit
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                >
                  {editingBenefit?.id === benefit.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingBenefit.title}
                        onChange={(e) => setEditingBenefit({ ...editingBenefit, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                      />
                      <textarea
                        rows={2}
                        value={editingBenefit.description}
                        onChange={(e) => setEditingBenefit({ ...editingBenefit, description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateBenefit}
                          className="py-1 px-3 bg-emerald-600 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingBenefit(null)}
                          className="py-1 px-3 bg-slate-200 text-slate-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingBenefit(benefit)}
                          className="p-1.5 text-slate-500 hover:text-blue-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBenefit(benefit.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Products & Pricing */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Product Details & Offerings
              </h2>
              <p className="text-xs text-slate-500">
                Moniepoint Smart POS, Business Working Capital Loans, Moniebook, and Business Savings.
              </p>
            </div>

            <div className="space-y-6">
              {content.products.map((prod) => (
                <div key={prod.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{prod.name}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {prod.priceTag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{prod.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700">Tagline:</span> {prod.tagline}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Highlight:</span> {prod.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Testimonials Management */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Testimonials & Reviews Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add, edit, or delete business owner success stories.
                </p>
              </div>
              <button
                onClick={() => setShowAddTestimonial(true)}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            {/* Add Testimonial Form */}
            {showAddTestimonial && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-900">Add New Testimonial</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Business Name *"
                    value={newTestimonial.businessName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, businessName: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Owner / Client Name"
                    value={newTestimonial.clientName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Lagos, Nigeria)"
                    value={newTestimonial.location}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Testimonial Text *"
                  value={newTestimonial.testimonialText}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, testimonialText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowAddTestimonial(false)}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewTestimonial}
                    className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Save Testimonial
                  </button>
                </div>
              </div>
            )}

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.testimonials.map((test) => (
                <div
                  key={test.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                >
                  {editingTestimonial?.id === test.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingTestimonial.businessName}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, businessName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                      />
                      <input
                        type="text"
                        value={editingTestimonial.clientName}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <textarea
                        rows={3}
                        value={editingTestimonial.testimonialText}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, testimonialText: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateTestimonial}
                          className="py-1 px-3 bg-emerald-600 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTestimonial(null)}
                          className="py-1 px-3 bg-slate-200 text-slate-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {test.businessName}
                          </h4>
                          <span className="text-xs text-amber-500 font-bold">★ {test.rating}/5</span>
                        </div>
                        <p className="text-xs text-slate-600 italic leading-relaxed mb-3">
                          "{test.testimonialText}"
                        </p>
                        <div className="text-[11px] text-slate-500">
                          {test.clientName} • {test.location}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingTestimonial(test)}
                          className="p-1.5 text-slate-500 hover:text-blue-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTestimonial(test.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: FAQ Management */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  FAQ Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add, edit, or delete frequently asked questions & answers.
                </p>
              </div>
              <button
                onClick={() => setShowAddFAQ(true)}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {/* Add FAQ Box */}
            {showAddFAQ && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-900">Add New FAQ</h3>
                <input
                  type="text"
                  placeholder="Question (e.g. How much does a Moniepoint POS cost?)"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <textarea
                  rows={3}
                  placeholder="Answer..."
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowAddFAQ(false)}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewFAQ}
                    className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Save FAQ
                  </button>
                </div>
              </div>
            )}

            {/* FAQ List */}
            <div className="space-y-3">
              {content.faqs.map((faq, idx) => (
                <div
                  key={faq.id || idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                >
                  {editingFAQ?.id === faq.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingFAQ.question}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                      />
                      <textarea
                        rows={3}
                        value={editingFAQ.answer}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateFAQ}
                          className="py-1 px-3 bg-emerald-600 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingFAQ(null)}
                          className="py-1 px-3 bg-slate-200 text-slate-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingFAQ(faq)}
                          className="p-1.5 text-slate-500 hover:text-blue-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFAQ(faq.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Orders & Leads Manager */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Customer Orders & Inquiries CRM
                </h2>
                <p className="text-xs text-slate-500">
                  {leads.length} customer submission(s) recorded through website action buttons.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSyncSupabaseLeads}
                  disabled={isSyncingLeads}
                  className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Fetch leads directly from Supabase"
                >
                  <Database className="w-3.5 h-3.5 text-blue-200" />
                  <span>{isSyncingLeads ? 'Syncing...' : 'Sync from Supabase'}</span>
                </button>

                <button
                  onClick={exportLeadsCSV}
                  className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>
                {leads.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear all leads history? Make sure you have exported them first.')) {
                        clearAllLeads();
                      }
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, or business..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <select
                value={leadFilterStatus}
                onChange={(e) => setLeadFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered/Approved">Delivered / Approved</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Leads Table */}
            {filteredLeads.length > 0 ? (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Business & Location</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {lead.createdAt}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{lead.fullName}</div>
                          <div className="text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800">{lead.businessName}</div>
                          <div className="text-slate-400 text-[11px]">{lead.businessAddress || 'Address on dispatch'}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {lead.serviceType}
                          </span>
                          {lead.loanAmountRequested && (
                            <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                              {lead.loanAmountRequested}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                              lead.status === 'New'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : lead.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : lead.status === 'Delivered/Approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delivered/Approved">Delivered/Approved</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.fullName)},%20this%20is%20Kenny%20Olu%20Digital%20following%20up%20on%20your%20${encodeURIComponent(lead.serviceType)}%20request.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                              title="WhatsApp Customer"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            </a>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                No orders or inquiries found matching filter.
              </div>
            )}
          </div>
        )}

        {/* Tab 9: Backup & Reset */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Backup, Export & Factory Reset
              </h2>
              <p className="text-xs text-slate-500">
                Download your website content, restore from a previous backup file, or reset to original defaults.
              </p>
            </div>

            {/* Supabase Database Integration Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Supabase Database Connection</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        PostgreSQL Active
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Sync orders, loan inquiries, and site configuration directly with your cloud database.
                    </p>
                  </div>
                </div>

                <a
                  href="https://supabase.com/dashboard/project/vajzmqhgwdcstvjdjytr/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open Supabase API Keys</span>
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
                {/* Project URL display */}
                <div className="lg:col-span-5 space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Project Base URL:</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={SUPABASE_PROJECT_URL}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-300 font-mono select-all cursor-text"
                  />
                  <span className="text-[11px] text-slate-400">
                    Endpoint: <code className="text-blue-300">/rest/v1/</code>
                  </span>
                </div>

                {/* Anon Key input */}
                <div className="lg:col-span-7 space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Supabase Public Anon Key (`anon` / `public`):</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Paste your sb_publishable_... or anon key here"
                      value={supabaseKeyInput}
                      onChange={(e) => setSupabaseKeyInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        saveSupabaseAnonKey(supabaseKeyInput);
                        triggerSaveNotification();
                        setTestResult(null);
                      }}
                      className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Save Key
                    </button>
                    <button
                      type="button"
                      disabled={isTestingConn}
                      onClick={async () => {
                        setIsTestingConn(true);
                        saveSupabaseAnonKey(supabaseKeyInput);
                        const res = await testSupabaseConnection();
                        setTestResult(res);
                        setIsTestingConn(false);
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {isTestingConn ? 'Testing...' : 'Test Connection'}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Find this in Supabase: <strong>Project Settings &rarr; API &rarr; Project API keys (`anon` public)</strong>.
                  </span>
                </div>
              </div>

              {/* Test Connection Result Alert */}
              {testResult && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                    testResult.success
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <span>{testResult.message}</span>
                  <button
                    onClick={() => setTestResult(null)}
                    className="text-slate-400 hover:text-white ml-2 text-xs font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Export JSON */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Export Site Content
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    Download a full JSON backup of all headlines, pricing, FAQs, testimonials, and CTAs.
                  </p>
                </div>
                <button
                  onClick={exportContentJson}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup File</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Restore From Backup
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    Upload a previously downloaded JSON backup file to instantly restore all settings.
                  </p>
                </div>
                <label className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Upload Backup JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Factory Reset */}
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-rose-900 mb-1">
                    Reset to Factory Defaults
                  </h3>
                  <p className="text-xs text-rose-700/80 mb-4">
                    Restore original Moniepoint POS ₦25k, Under 24h delivery, FAQs, and testimonials copy.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all content to default values?')) {
                      resetToDefaults();
                      alert('Site content reset to factory defaults.');
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Content</span>
                </button>
              </div>

            </div>

            {/* Authentication Details notice */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <strong>Admin Security Status:</strong> Verified Authenticated Administrator (Session active).
              </div>
              <span className="font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 text-[11px]">
                Account: {adminUserEmail || content.email || 'Authorized Admin'}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
