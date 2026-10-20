import { SiteContent } from '../types';

export const defaultSiteContent: SiteContent = {
  businessName: 'KENNY OLU DIGITAL',
  businessType: 'Business Relationship Manager',
  brandTagline: 'Official Moniepoint Business Relationship & Terminal Services',
  brmTitle: 'Accredited Moniepoint Business Relationship Manager',
  brmName: 'Kenny Olu (Kenny Concept)',
  phone: '08105885003',
  whatsappNumber: '2348105885003',
  whatsappDefaultMsg: 'Hello Kenny Olu Digital, I want to enquire about Moniepoint POS Terminal / Business Loan.',
  email: 'kennyoludigital@gmail.com',
  officeAddress: '3 Matogun road Adiyan gasline Agbado',
  serviceArea: 'Ogun and Lagos State specifically (Under 24 Hours Doorstep Delivery)',

  // Hero Section
  heroBadge: 'Verified Moniepoint Business Relationship Manager',
  courseTitle: 'Moniepoint Business Banking, POS Terminal & Growth Mastery',
  heroHeadline: 'Scale Your Business With Moniepoint Smart POS & Fast Working Capital Loans',
  heroSubheadline: 'Get your Moniepoint POS terminal delivered within 24 hours for only ₦25,000 across Ogun and Lagos State. Unlock business loans from ₦500k to millions, automate daily bookkeeping with Moniebook, and earn high-yield savings.',
  heroDescription: 'Partner with Kenny Olu Digital (located at 3 Matogun road Adiyan gasline Agbado) for reliable payment processing, uninterrupted dual-network 4G connection, zero settlement delays, and dedicated 1-on-1 account management for your business.',
  heroImageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
  promoVideoUrl: 'https://youtube.com/shorts/bpcLcBhqVbU?si=SpM5Df9HJNptSf02',
  posPrice: '₦25,000',
  deliveryTimeframe: 'Under 24 hours',
  loanAmountRange: '₦500k - Millions',

  // 3 Customizable CTA buttons as requested
  ctaButtons: [
    {
      id: 'cta-1',
      label: 'Chat With Us on WhatsApp',
      url: 'https://wa.me/2348105885003?text=Hello%20Kenny%20Olu%20Digital,%20I%20am%20interested%20in%20getting%20a%20Moniepoint%20POS%20machine%20and%20business%20solutions.',
      actionType: 'whatsapp',
      variant: 'whatsapp',
    },
    {
      id: 'cta-2',
      label: 'Order Moniepoint POS Terminal (₦25,000)',
      url: '#order-pos',
      actionType: 'pos_modal',
      variant: 'primary',
    },
    {
      id: 'cta-3',
      label: 'Apply for Business Loan (₦500k+)',
      url: '#loan-apply',
      actionType: 'loan_modal',
      variant: 'secondary',
    },
  ],

  // Target Audience Section
  audiences: [
    {
      id: 'aud-1',
      title: 'Business Owners',
      description: 'Supermarkets, pharmacies, wholesale stores, gas stations, and boutique shops needing reliable card payments and instant payment notifications.',
      iconName: 'Building2',
      exampleBusiness: 'Retail & Supermarkets',
    },
    {
      id: 'aud-2',
      title: 'Corporate Organizations',
      description: 'Logistics firms, hospitality groups, multi-branch corporations requiring distributed fleet payment systems and enterprise transaction oversight.',
      iconName: 'Building2',
      exampleBusiness: 'Enterprises & Multi-Branches',
    },
    {
      id: 'aud-3',
      title: 'Professionals',
      description: 'Lawyers, medical clinics, accountants, and consultants who need transparent invoicing, swift client chargebacks handling, and clean accounting.',
      iconName: 'Briefcase',
      exampleBusiness: 'Clinics, Law & Consultancies',
    },
    {
      id: 'aud-4',
      title: 'Entrepreneurs',
      description: 'Fast-moving founders scaling modern ventures with access to quick working capital loans starting from ₦500k without collateral stress.',
      iconName: 'TrendingUp',
      exampleBusiness: 'Growth Startups & Traders',
    },
    {
      id: 'aud-5',
      title: 'Creatives',
      description: 'Event managers, media producers, fashion designers, and digital studios accepting seamless client deposits and managing daily cashflow with Moniebook.',
      iconName: 'Sparkles',
      exampleBusiness: 'Studios, Designers & Agencies',
    },
  ],

  // Media Showcase slot (Configurable by admin)
  audienceMediaUrl: 'https://youtube.com/shorts/bpcLcBhqVbU?si=SpM5Df9HJNptSf02',
  audienceMediaType: 'video',
  audienceMediaTitle: 'Moniepoint Official Showcase',
  audienceMediaCaption: 'Official Moniepoint Merchant Solutions & Fast POS Processing',

  // Dedicated image spaces for Loan and Savings
  loanImageUrl: '/images/loan.jpg',
  savingsImageUrl: '/images/savings.jpg',

  // Products Section
  products: [
    {
      id: 'prod-1',
      name: 'Moniepoint Smart POS Terminal',
      tagline: 'Lightning-Fast Payments & Reliable 4G Connection',
      description: 'The heavyweight workhorse for modern merchants. Equipped with a hybrid dual SIM slot, touch interface, ultra-fast thermal printer, and instant credit alert notification.',
      priceTag: '₦25,000 one-time acquisition',
      highlight: 'Delivered in under 24 hours',
      iconName: 'CreditCard',
      badge: 'Best Seller',
      features: [
        'Super-fast transaction processing in under 3 seconds',
        'Stable Internet with dual 4G network + WiFi fallback',
        'Direct instant credit settlement into your Moniepoint account',
        'High-density battery that lasts over 48 hours on heavy usage',
        'Instant receipt printing with customized business branding',
        'Free setup, onboarding & dispute mediation by Kenny Olu',
      ],
      ctaText: 'Order POS Machine Now',
      ctaAction: 'pos_modal',
    },
    {
      id: 'prod-2',
      name: 'Business Working Capital Loan',
      tagline: 'Fuel Business Expansion from ₦500,000 to Millions',
      description: 'Fast, flexible business financing tailored for active business owners. No endless bureaucratic delays, transparent interest terms, and structured repayments matching your daily sales volume.',
      priceTag: 'Starting from ₦500k - Millions',
      highlight: 'Rapid disbursement upon assessment',
      iconName: 'Coins',
      badge: 'High Demand',
      imageUrl: '/images/loan.jpg',
      features: [
        'Loan amounts from ₦500,000 up to tens of millions',
        'No collateral lockup required for eligible active merchants',
        'Flexible daily or weekly automated repayment options',
        'Direct guidance through application requirements with Kenny Olu',
        'Improves credit capacity with every on-time repayment cycle',
        'Funds deposited directly into your business account',
      ],
      ctaText: 'Check Loan Eligibility',
      ctaAction: 'loan_modal',
    },
    {
      id: 'prod-3',
      name: 'Moniebook Digital Bookkeeper',
      tagline: 'Say Goodbye to Missing Receipts and Lost Inventory',
      description: 'Digital ledger and cashbook software integrated directly with your Moniepoint sales. Track customer debts, generate professional invoices, and download real-time profit and loss statements.',
      priceTag: 'Free with your Moniepoint account',
      highlight: 'Automated Daily Sales Audits',
      iconName: 'BookOpen',
      badge: 'Essential',
      features: [
        'Automatic reconciliation with every POS payment received',
        'Customer debt tracking & automated SMS payment reminders',
        'Professional invoice & digital receipt generation',
        'Income and expense classification for clear tax preparedness',
        'Multi-staff sales tracking with fraud prevention controls',
        'Full cloud backup accessible from any smartphone',
      ],
      ctaText: 'Learn About Moniebook',
      ctaAction: 'inquiry_modal',
    },
    {
      id: 'prod-4',
      name: 'Moniepoint Business Savings & Vault',
      tagline: 'Put Idle Business Profits to Work With High Yields',
      description: 'Earn handsome daily interest on your business reserves. Set up flexible locks for supplier payments, tax accruals, or expansion funds without losing liquidity.',
      priceTag: 'Up to 15%+ annual interest p.a.',
      highlight: 'Daily Interest Payouts',
      iconName: 'PiggyBank',
      badge: 'High Yield',
      imageUrl: '/images/savings.jpg',
      features: [
        'Daily interest calculations credited directly to your balance',
        'Flexible emergency savings with instant access when needed',
        'Automated fixed-deposit vaults for project funds',
        'Zero penalties on matured savings withdrawal',
        'FDIC / NDIC insured deposits under regulatory oversight',
        'Seamless integration with terminal balances',
      ],
      ctaText: 'Start Business Savings',
      ctaAction: 'inquiry_modal',
    },
  ],

  // Benefits Section
  benefits: [
    {
      id: 'ben-1',
      title: 'Enjoy Stable Internet Connection',
      description: 'Never lose a sale because of network failure. Moniepoint terminals feature hybrid dual-network SIM roaming and Wi-Fi capability ensuring 99.9% network reliability during peak business hours.',
      iconName: 'Wifi',
    },
    {
      id: 'ben-2',
      title: 'Guaranteed Under 24-Hour Fast Delivery',
      description: 'We don’t keep you waiting weeks. Once your KYC documents are verified, your customized POS terminal is configured and delivered to your doorstep in under 24 hours across Ogun and Lagos State.',
      iconName: 'Clock',
    },
    {
      id: 'ben-3',
      title: 'Direct Personal Business Relationship Manager',
      description: 'Skip long banking halls and frustrating automated bots. You get direct access to Kenny Olu via call and WhatsApp for terminal swap, account queries, and instant dispute resolution.',
      iconName: 'UserCheck',
    },
    {
      id: 'ben-4',
      title: 'Instant Settlement to Your Account',
      description: 'Receive all customer card swipes and transfer payments immediately into your business account. No 24-hour withholding, no weekend pending queues.',
      iconName: 'Zap',
    },
    {
      id: 'ben-5',
      title: 'Transparent Flat Pricing (Only ₦25,000)',
      description: 'Get fully onboarded at an honest acquisition fee of only ₦25,000. Zero hidden maintenance penalties, and the lowest transaction charges in Nigeria.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'ben-6',
      title: 'Growth Capital Up to Millions',
      description: 'As your daily turnover runs through your Moniepoint POS, unlock pre-approved business loans from ₦500k to millions to buy bulk stock and expand.',
      iconName: 'TrendingUp',
    },
  ],

  // Outcomes Section
  outcomes: [
    {
      id: 'out-1',
      title: 'Zero Revenue Losses to Network Timeouts',
      description: 'Experience rock-solid 4G terminal stability so your customers never walk away frustrated over pending or declining transactions.',
    },
    {
      id: 'out-2',
      title: 'Rapid Terminal Deployment in 24 Hours',
      description: 'Start accepting cards and bank transfers by tomorrow afternoon with hassle-free doorstep delivery and on-the-spot activation.',
    },
    {
      id: 'out-3',
      title: 'Uncapped Working Capital for Expansion',
      description: 'Scale inventory and open new branches with fast collateral-free business financing from ₦500k to millions.',
    },
    {
      id: 'out-4',
      title: 'Automated Bookkeeping & Cash Audit',
      description: 'Eliminate paper notebook errors, track debtors effortlessly, and view your net profit daily using Moniebook.',
    },
  ],

  // Testimonials Section
  testimonials: [
    {
      id: 'test-1',
      businessName: 'Apex Grand Pharmacy & Stores',
      clientName: 'Chief Emeka Okafor',
      role: 'Managing Director',
      location: 'Ikeja, Lagos',
      testimonialText: 'Kenny Olu delivered our Moniepoint terminal under 20 hours after sending our documents. The internet connection is super stable even during heavy downpours, and our cashiers no longer complain about declining customer cards. Outstanding relationship management!',
      rating: 5,
      productUsed: 'Moniepoint POS Terminal',
      date: 'October 2026',
    },
    {
      id: 'test-2',
      businessName: 'Deluxe Auto Spare Mart',
      clientName: 'Alhaji Rasheed Bello',
      role: 'Principal Trader',
      location: 'Trade Fair Complex, Lagos',
      testimonialText: 'I started with one POS terminal through Kenny Olu Digital. Within four months of active transactions, I accessed a business loan of ₦3.5 Million to import new container spare parts. The repayment is automated and painless. Truly a business game-changer.',
      rating: 5,
      productUsed: 'Business Loan & POS',
      date: 'September 2026',
    },
    {
      id: 'test-3',
      businessName: 'Kiddies World Boutique & Fabrics',
      clientName: 'Mrs. Folake Adeyemi',
      role: 'Creative Director & Founder',
      location: 'Surulere, Lagos',
      testimonialText: 'Moniebook changed how I run my boutique. I used to lose money to unpaid customer credits. Now everything is logged digitally. Whenever I have an inquiry, Kenny picks my call right away. You cannot get this level of care in regular commercial banks.',
      rating: 5,
      productUsed: 'Moniebook & POS Terminal',
      date: 'August 2026',
    },
    {
      id: 'test-4',
      businessName: 'Prestige Bistro & Lounge',
      clientName: 'Tunde Harrison',
      role: 'Operations Lead',
      location: 'Victoria Island, Lagos',
      testimonialText: 'Having reliable POS machines is the heartbeat of night lounge business. We bought 3 smart terminals from Kenny Concept for ₦25,000 each. The instant settlement means our suppliers are paid first thing in the morning without fail.',
      rating: 5,
      productUsed: 'Moniepoint Smart POS',
      date: 'July 2026',
    },
  ],

  // Required documents
  requiredDocuments: [
    'National Identification Number (NIN)',
    'Bank Verification Number (BVN)',
    'Active Phone Number (Linked to BVN)',
    'Valid Residential Address',
    'Registered Business / Shop Address',
    'Next of Kin Full Name',
    'Date of Birth of Next of Kin',
    'State of Origin & Local Government Area (LGA)',
    'Recent Passport Photograph',
  ],

  // FAQ Section
  faqs: [
    {
      id: 'faq-1',
      question: 'How can I get a Moniepoint POS machine?',
      answer: 'You can contact Kenny Olu Digital directly via our WhatsApp (08105885003) or click the "Order Moniepoint POS" button on this website. As an accredited Business Relationship Manager, we will guide you through the fast documentation process and arrange instant delivery to your business location.',
      category: 'POS Terminal',
    },
    {
      id: 'faq-2',
      question: 'How much does a Moniepoint POS machine cost?',
      answer: 'The Moniepoint POS machine costs ₦25,000 only. There are no surprise setup charges or unfair terminal rental fees.',
      category: 'Pricing',
    },
    {
      id: 'faq-3',
      question: 'What documents do I need to get a POS machine?',
      answer: 'To get your terminal processed, you will need: NIN, BVN, Phone number, Residential address, Business address, Next of kin, Date of birth of next of kin, State of origin, Local government area, and a Passport photograph.',
      category: 'Requirements',
    },
    {
      id: 'faq-4',
      question: 'How long does it take to get my POS?',
      answer: 'Delivery and activation takes under 24 hours once your documentation is submitted and verified. We offer doorstep delivery specifically across Ogun and Lagos State, with on-site setup and briefing.',
      category: 'Delivery',
    },
    {
      id: 'faq-5',
      question: 'Can I apply for a business loan through Moniepoint?',
      answer: 'Yes! Eligible business owners can access business financing and working capital, subject to Moniepoint\'s current requirements and credit assessment. Kenny Olu Digital will assist you through the application and qualification roadmap.',
      category: 'Loans',
    },
    {
      id: 'faq-6',
      question: 'How much business loan can I get?',
      answer: 'The amount available depends on your eligibility, turnover, and Moniepoint\'s assessment. Available loan amounts start from ₦500,000 up to tens of millions of Naira for growing enterprises.',
      category: 'Loans',
    },
    {
      id: 'faq-7',
      question: 'Why is Moniepoint POS internet connection so stable?',
      answer: 'Moniepoint terminals utilize intelligent dual SIM technology paired with high-gain internal 4G antennas and Wi-Fi connectivity. If one cellular network fluctuates, the terminal automatically hops to the strongest network without interrupting your customer transaction.',
      category: 'Hardware',
    },
    {
      id: 'faq-8',
      question: 'What role does Kenny Olu Digital play as my Business Relationship Manager?',
      answer: 'As your designated Business Relationship Manager, Kenny Olu provides hands-on priority support. You do not queue in bank branches or wait indefinitely on phone bots: you get direct phone/WhatsApp assistance for terminal swaps, transaction tracing, loan advisory, and business expansion banking.',
      category: 'Support',
    },
  ],
};
