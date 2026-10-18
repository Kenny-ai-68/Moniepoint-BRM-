-- ==============================================================================
-- KENNY OLU DIGITAL (Moniepoint Business Relationship Manager)
-- Supabase PostgreSQL Schema & Seed Script
-- Office: 3 Matogun road Adiyan gasline Agbado
-- Coverage: Ogun and Lagos State specifically (Under 24h Delivery)
-- Phone / WhatsApp: 08105885003
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLE: site_content
-- Stores general business information, headlines, pricing, and media URLs.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR(255) NOT NULL DEFAULT 'KENNY OLU DIGITAL',
    business_type VARCHAR(255) NOT NULL DEFAULT 'Business Relationship Manager',
    brand_tagline TEXT DEFAULT 'Official Moniepoint Business Relationship & Terminal Services',
    brm_title VARCHAR(255) DEFAULT 'Accredited Moniepoint Business Relationship Manager',
    brm_name VARCHAR(255) DEFAULT 'Kenny Olu (Kenny Concept)',
    phone VARCHAR(50) NOT NULL DEFAULT '08105885003',
    whatsapp_number VARCHAR(50) NOT NULL DEFAULT '2348105885003',
    whatsapp_default_msg TEXT DEFAULT 'Hello Kenny Olu Digital, I want to enquire about Moniepoint POS Terminal / Business Loan.',
    email VARCHAR(255) DEFAULT 'kennyoludigital@gmail.com',
    office_address TEXT NOT NULL DEFAULT '3 Matogun road Adiyan gasline Agbado',
    service_area TEXT NOT NULL DEFAULT 'Ogun and Lagos State specifically (Under 24 Hours Doorstep Delivery)',
    
    -- Hero Section
    hero_badge VARCHAR(255) DEFAULT 'Verified Moniepoint Business Relationship Manager',
    course_title VARCHAR(255) DEFAULT 'Moniepoint Business Banking, POS Terminal & Growth Mastery',
    hero_headline TEXT NOT NULL DEFAULT 'Scale Your Business With Moniepoint Smart POS & Fast Working Capital Loans',
    hero_subheadline TEXT NOT NULL DEFAULT 'Get your Moniepoint POS terminal delivered within 24 hours for only ₦25,000 across Ogun and Lagos State. Unlock business loans from ₦500k to millions, automate daily bookkeeping with Moniebook, and earn high-yield savings.',
    hero_description TEXT DEFAULT 'Partner with Kenny Olu Digital (located at 3 Matogun road Adiyan gasline Agbado) for reliable payment processing, uninterrupted dual-network 4G connection, zero settlement delays, and dedicated 1-on-1 account management for your business.',
    hero_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    promo_video_url TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pos_price VARCHAR(50) DEFAULT '₦25,000',
    delivery_timeframe VARCHAR(100) DEFAULT 'Under 24 hours',
    loan_amount_range VARCHAR(100) DEFAULT '₦500k - Millions',
    
    -- About Products 6th Slot Media Showcase (Image or Video)
    audience_media_url TEXT DEFAULT 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
    audience_media_type VARCHAR(20) DEFAULT 'image', -- 'image' or 'video'
    audience_media_title VARCHAR(255) DEFAULT 'Moniepoint Smart POS in Action',
    audience_media_caption TEXT DEFAULT 'Official Terminal Deployment & Merchant Setup',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: cta_buttons (3 Customizable Buttons)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.cta_buttons (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    action_type VARCHAR(50) NOT NULL DEFAULT 'whatsapp', -- 'whatsapp' | 'pos_modal' | 'loan_modal' | 'inquiry_modal' | 'external'
    variant VARCHAR(50) NOT NULL DEFAULT 'primary',     -- 'primary' | 'secondary' | 'outline' | 'whatsapp'
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: products (Moniepoint POS, Business Loans, Moniebook, Savings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    price_tag VARCHAR(100),
    highlight VARCHAR(255),
    icon_name VARCHAR(100) DEFAULT 'CreditCard',
    badge VARCHAR(100),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    cta_text VARCHAR(100) NOT NULL DEFAULT 'Order Now',
    cta_action VARCHAR(50) NOT NULL DEFAULT 'pos_modal',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: benefits (e.g. Enjoy Stable Internet Connection, 24h Delivery, etc.)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.benefits (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) DEFAULT 'Wifi',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: outcomes (Learning & Business Transformation Results)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.outcomes (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: testimonials (Merchant Reviews)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id VARCHAR(50) PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    location VARCHAR(255),
    testimonial_text TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    product_used VARCHAR(100),
    review_date VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: faqs (Frequently Asked Questions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- TABLE: leads (Customer Orders, Loan Requests & Inquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    business_name VARCHAR(255) NOT NULL,
    delivery_state VARCHAR(100) DEFAULT 'Lagos State',
    business_address TEXT,
    residential_address TEXT,
    service_type VARCHAR(100) NOT NULL DEFAULT 'POS Terminal',
    loan_amount_requested VARCHAR(100),
    bvn_provided BOOLEAN DEFAULT true,
    nin_provided BOOLEAN DEFAULT true,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Delivered/Approved', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Allow website visitors to read content)
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read cta_buttons" ON public.cta_buttons FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Allow public read outcomes" ON public.outcomes FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);

-- 2. Public Insert Policy for Leads (Allows visitors to submit orders/applications)
CREATE POLICY "Allow public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- 3. Authenticated / Service Role Policies (Admin management)
CREATE POLICY "Allow authenticated manage site_content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage cta_buttons" ON public.cta_buttons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage benefits" ON public.benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage outcomes" ON public.outcomes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated manage leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- SEED INITIAL DATA (Matches Kenny Olu Digital Production Content)
-- ==============================================================================

-- Seed site_content
INSERT INTO public.site_content (
    business_name,
    business_type,
    brand_tagline,
    brm_title,
    brm_name,
    phone,
    whatsapp_number,
    whatsapp_default_msg,
    email,
    office_address,
    service_area,
    hero_badge,
    course_title,
    hero_headline,
    hero_subheadline,
    hero_description,
    hero_image_url,
    promo_video_url,
    pos_price,
    delivery_timeframe,
    loan_amount_range,
    audience_media_url,
    audience_media_type,
    audience_media_title,
    audience_media_caption
) VALUES (
    'KENNY OLU DIGITAL',
    'Business Relationship Manager',
    'Official Moniepoint Business Relationship & Terminal Services',
    'Accredited Moniepoint Business Relationship Manager',
    'Kenny Olu (Kenny Concept)',
    '08105885003',
    '2348105885003',
    'Hello Kenny Olu Digital, I want to enquire about Moniepoint POS Terminal / Business Loan.',
    'kennyoludigital@gmail.com',
    '3 Matogun road Adiyan gasline Agbado',
    'Ogun and Lagos State specifically (Under 24 Hours Doorstep Delivery)',
    'Verified Moniepoint Business Relationship Manager',
    'Moniepoint Business Banking, POS Terminal & Growth Mastery',
    'Scale Your Business With Moniepoint Smart POS & Fast Working Capital Loans',
    'Get your Moniepoint POS terminal delivered within 24 hours for only ₦25,000 across Ogun and Lagos State. Unlock business loans from ₦500k to millions, automate daily bookkeeping with Moniebook, and earn high-yield savings.',
    'Partner with Kenny Olu Digital (located at 3 Matogun road Adiyan gasline Agbado) for reliable payment processing, uninterrupted dual-network 4G connection, zero settlement delays, and dedicated 1-on-1 account management for your business.',
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '₦25,000',
    'Under 24 hours',
    '₦500k - Millions',
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
    'image',
    'Moniepoint Smart POS in Action',
    'Official Terminal Deployment & Merchant Setup'
) ON CONFLICT DO NOTHING;

-- Seed 3 CTA buttons
INSERT INTO public.cta_buttons (id, label, url, action_type, variant, sort_order) VALUES
('cta-1', 'Chat With Us on WhatsApp', 'https://wa.me/2348105885003?text=Hello%20Kenny%20Olu%20Digital,%20I%20am%20interested%20in%20getting%20a%20Moniepoint%20POS%20machine%20and%20business%20solutions.', 'whatsapp', 'whatsapp', 1),
('cta-2', 'Order Moniepoint POS Terminal (₦25,000)', '#order-pos', 'pos_modal', 'primary', 2),
('cta-3', 'Apply for Business Loan (₦500k+)', '#loan-apply', 'loan_modal', 'secondary', 3)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, url = EXCLUDED.url, action_type = EXCLUDED.action_type;

-- Seed Products
INSERT INTO public.products (id, name, tagline, description, price_tag, highlight, icon_name, badge, features, cta_text, cta_action, sort_order) VALUES
('prod-1', 'Moniepoint Smart POS Terminal', 'Lightning-Fast Payments & Reliable 4G Connection', 'The heavyweight workhorse for modern merchants. Equipped with a hybrid dual SIM slot, touch interface, ultra-fast thermal printer, and instant credit alert notification.', '₦25,000 one-time acquisition', 'Delivered in under 24 hours (Ogun & Lagos)', 'CreditCard', 'Best Seller', '["Super-fast transaction processing in under 3 seconds", "Stable Internet with dual 4G network + WiFi fallback", "Direct instant credit settlement into your Moniepoint account", "High-density battery that lasts over 48 hours on heavy usage", "Instant receipt printing with customized business branding", "Free setup, onboarding & dispute mediation by Kenny Olu"]'::jsonb, 'Order POS Machine Now', 'pos_modal', 1),
('prod-2', 'Business Working Capital Loan', 'Fuel Business Expansion from ₦500,000 to Millions', 'Fast, flexible business financing tailored for active business owners. No endless bureaucratic delays, transparent interest terms, and structured repayments matching your daily sales volume.', 'Starting from ₦500k - Millions', 'Rapid disbursement upon assessment', 'Coins', 'High Demand', '["Loan amounts from ₦500,000 up to tens of millions", "No collateral lockup required for eligible active merchants", "Flexible daily or weekly automated repayment options", "Direct guidance through application requirements with Kenny Olu", "Improves credit capacity with every on-time repayment cycle", "Funds deposited directly into your business account"]'::jsonb, 'Check Loan Eligibility', 'loan_modal', 2),
('prod-3', 'Moniebook Digital Bookkeeper', 'Say Goodbye to Missing Receipts and Lost Inventory', 'Digital ledger and cashbook software integrated directly with your Moniepoint sales. Track customer debts, generate professional invoices, and download real-time profit and loss statements.', 'Free with your Moniepoint account', 'Automated Daily Sales Audits', 'BookOpen', 'Essential', '["Automatic reconciliation with every POS payment received", "Customer debt tracking & automated SMS payment reminders", "Professional invoice & digital receipt generation", "Income and expense classification for clear tax preparedness", "Multi-staff sales tracking with fraud prevention controls", "Full cloud backup accessible from any smartphone"]'::jsonb, 'Learn About Moniebook', 'inquiry_modal', 3),
('prod-4', 'Moniepoint Business Savings & Vault', 'Put Idle Business Profits to Work With High Yields', 'Earn handsome daily interest on your business reserves. Set up flexible locks for supplier payments, tax accruals, or expansion funds without losing liquidity.', 'Up to 15%+ annual interest p.a.', 'Daily Interest Payouts', 'PiggyBank', 'High Yield', '["Daily interest calculations credited directly to your balance", "Flexible emergency savings with instant access when needed", "Automated fixed-deposit vaults for project funds", "Zero penalties on matured savings withdrawal", "FDIC / NDIC insured deposits under regulatory oversight", "Seamless integration with terminal balances"]'::jsonb, 'Start Business Savings', 'inquiry_modal', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed Benefits
INSERT INTO public.benefits (id, title, description, icon_name, sort_order) VALUES
('ben-1', 'Enjoy Stable Internet Connection', 'Never lose a sale because of network failure. Moniepoint terminals feature hybrid dual-network SIM roaming and Wi-Fi capability ensuring 99.9% network reliability during peak business hours.', 'Wifi', 1),
('ben-2', 'Guaranteed Under 24-Hour Fast Delivery', 'We don’t keep you waiting weeks. Once your KYC documents are verified, your customized POS terminal is configured and delivered to your doorstep in under 24 hours across Ogun and Lagos State.', 'Clock', 2),
('ben-3', 'Direct Personal Business Relationship Manager', 'Skip long banking halls and frustrating automated bots. You get direct access to Kenny Olu via call and WhatsApp for terminal swap, account queries, and instant dispute resolution.', 'UserCheck', 3),
('ben-4', 'Instant Settlement to Your Account', 'Receive all customer card swipes and transfer payments immediately into your business account. No 24-hour withholding, no weekend pending queues.', 'Zap', 4),
('ben-5', 'Transparent Flat Pricing (Only ₦25,000)', 'Get fully onboarded at an honest acquisition fee of only ₦25,000. Zero hidden maintenance penalties, and the lowest transaction charges in Nigeria.', 'ShieldCheck', 5),
('ben-6', 'Growth Capital Up to Millions', 'As your daily turnover runs through your Moniepoint POS, unlock pre-approved business loans from ₦500k to millions to buy bulk stock and expand.', 'TrendingUp', 6)
ON CONFLICT (id) DO NOTHING;

-- Seed Outcomes
INSERT INTO public.outcomes (id, title, description, sort_order) VALUES
('out-1', 'Zero Revenue Losses to Network Timeouts', 'Experience rock-solid 4G terminal stability so your customers never walk away frustrated over pending or declining transactions.', 1),
('out-2', 'Rapid Terminal Deployment in 24 Hours', 'Start accepting cards and bank transfers by tomorrow afternoon with doorstep delivery and on-the-spot activation across Ogun and Lagos State.', 2),
('out-3', 'Uncapped Working Capital for Expansion', 'Scale inventory and open new branches with fast collateral-free business financing from ₦500k to millions.', 3),
('out-4', 'Automated Bookkeeping & Cash Audit', 'Eliminate paper notebook errors, track debtors effortlessly, and view your net profit daily using Moniebook.', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed Testimonials
INSERT INTO public.testimonials (id, business_name, client_name, role, location, testimonial_text, rating, product_used, review_date, sort_order) VALUES
('test-1', 'Apex Grand Pharmacy & Stores', 'Chief Emeka Okafor', 'Managing Director', 'Ikeja, Lagos', 'Kenny Olu delivered our Moniepoint terminal under 20 hours after sending our documents. The internet connection is super stable even during heavy downpours, and our cashiers no longer complain about declining customer cards. Outstanding relationship management!', 5, 'Moniepoint POS Terminal', 'October 2026', 1),
('test-2', 'Deluxe Auto Spare Mart', 'Alhaji Rasheed Bello', 'Principal Trader', 'Agbado / Trade Fair, Ogun/Lagos', 'I started with one POS terminal through Kenny Olu Digital. Within four months of active transactions, I accessed a business loan of ₦3.5 Million to import new container spare parts. The repayment is automated and painless. Truly a business game-changer.', 5, 'Business Loan & POS', 'September 2026', 2),
('test-3', 'Kiddies World Boutique & Fabrics', 'Mrs. Folake Adeyemi', 'Creative Director & Founder', 'Abeokuta / Lagos', 'Moniebook changed how I run my boutique. I used to lose money to unpaid customer credits. Now everything is logged digitally. Whenever I have an inquiry, Kenny picks my call right away. You cannot get this level of care in regular commercial banks.', 5, 'Moniebook & POS Terminal', 'August 2026', 3),
('test-4', 'Prestige Bistro & Lounge', 'Tunde Harrison', 'Operations Lead', 'Victoria Island, Lagos', 'Having reliable POS machines is the heartbeat of night lounge business. We bought 3 smart terminals from Kenny Concept for ₦25,000 each. The instant settlement means our suppliers are paid first thing in the morning without fail.', 5, 'Moniepoint Smart POS', 'July 2026', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed FAQs (Matching exact brief)
INSERT INTO public.faqs (id, question, answer, category, sort_order) VALUES
('faq-1', 'How can I get a Moniepoint POS machine?', 'You can contact Kenny Olu Digital directly via our WhatsApp (08105885003) or click the "Order Moniepoint POS" button on this website. As an accredited Business Relationship Manager, we will guide you through the fast documentation process and arrange instant delivery to your business location.', 'POS Terminal', 1),
('faq-2', 'How much does a Moniepoint POS machine cost?', 'The Moniepoint POS machine costs ₦25,000 only. There are no surprise setup charges or unfair terminal rental fees.', 'Pricing', 2),
('faq-3', 'What documents do I need to get a POS machine?', 'To get your terminal processed, you will need: NIN, BVN, Phone number, Residential address, Business address, Next of kin, Date of birth of next of kin, State of origin, Local government area, and a Passport photograph.', 'Requirements', 3),
('faq-4', 'How long does it take to get my POS?', 'Delivery and activation takes under 24 hours once your documentation is submitted and verified. We offer doorstep delivery specifically across Ogun and Lagos State, with on-site setup and briefing.', 'Delivery', 4),
('faq-5', 'Can I apply for a business loan through Moniepoint?', 'Yes! Eligible business owners can access business financing and working capital, subject to Moniepoint''s current requirements and credit assessment. Kenny Olu Digital will assist you through the application and qualification roadmap.', 'Loans', 5),
('faq-6', 'How much business loan can I get?', 'The amount available depends on your eligibility, turnover, and Moniepoint''s assessment. Available loan amounts start from ₦500,000 up to tens of millions of Naira for growing enterprises.', 'Loans', 6),
('faq-7', 'Why is Moniepoint POS internet connection so stable?', 'Moniepoint terminals utilize intelligent dual SIM technology paired with high-gain internal 4G antennas and Wi-Fi connectivity. If one cellular network fluctuates, the terminal automatically hops to the strongest network without interrupting your customer transaction.', 'Hardware', 7),
('faq-8', 'What role does Kenny Olu Digital play as my Business Relationship Manager?', 'As your designated Business Relationship Manager, Kenny Olu provides hands-on priority support. You do not queue in bank branches or wait indefinitely on phone bots: you get direct phone/WhatsApp assistance for terminal swaps, transaction tracing, loan advisory, and business expansion banking.', 'Support', 8)
ON CONFLICT (id) DO NOTHING;
