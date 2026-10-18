export interface CTAButton {
  id: string;
  label: string;
  url: string;
  actionType: 'whatsapp' | 'pos_modal' | 'loan_modal' | 'inquiry_modal' | 'external';
  variant: 'primary' | 'secondary' | 'outline' | 'whatsapp';
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceTag?: string;
  highlight: string;
  iconName: string;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaAction: 'pos_modal' | 'loan_modal' | 'inquiry_modal' | 'whatsapp';
  imageUrl?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface OutcomeItem {
  id: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  businessName: string;
  clientName: string;
  role: string;
  location: string;
  testimonialText: string;
  rating: number;
  productUsed: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  exampleBusiness: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  businessName: string;
  businessAddress?: string;
  residentialAddress?: string;
  serviceType: 'POS Terminal' | 'Business Loan' | 'Moniebook' | 'Business Savings' | 'General Inquiry';
  loanAmountRequested?: string;
  state?: string;
  lga?: string;
  bvnProvided?: boolean;
  ninProvided?: boolean;
  notes?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Delivered/Approved' | 'Archived';
  createdAt: string;
}

export interface SiteContent {
  businessName: string;
  businessType: string;
  brandTagline: string;
  brmTitle: string;
  brmName: string;
  phone: string;
  whatsappNumber: string;
  whatsappDefaultMsg: string;
  email: string;
  officeAddress: string;
  serviceArea: string;
  
  // Hero section
  heroBadge: string;
  courseTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroImageUrl: string;
  promoVideoUrl: string;
  posPrice: string;
  deliveryTimeframe: string;
  loanAmountRange: string;
  
  // CTAs
  ctaButtons: CTAButton[];
  
  // Audience
  audiences: AudienceItem[];
  
  // Media showcase in About the Products / Audience section (Image or Video)
  audienceMediaUrl?: string;
  audienceMediaType?: 'image' | 'video';
  audienceMediaTitle?: string;
  audienceMediaCaption?: string;
  
  // Products
  products: ProductItem[];
  
  // Dedicated image spaces for Loan and Savings
  loanImageUrl?: string;
  savingsImageUrl?: string;
  
  // Benefits
  benefits: BenefitItem[];
  
  // Outcomes
  outcomes: OutcomeItem[];
  
  // Testimonials
  testimonials: TestimonialItem[];
  
  // FAQs
  faqs: FAQItem[];
  
  // Documents Checklist
  requiredDocuments: string[];
}
