import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  CreditCard, 
  Coins, 
  BookOpen, 
  PiggyBank, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

export const ProductsSection: React.FC = () => {
  const { content, openOrderModal, generateWhatsAppUrl } = useContent();

  const handleProductAction = (action: string, productName: string) => {
    if (action === 'pos_modal') {
      openOrderModal('pos_modal', { serviceType: 'POS Terminal' });
    } else if (action === 'loan_modal') {
      openOrderModal('loan_modal', { serviceType: 'Business Loan' });
    } else if (action === 'inquiry_modal') {
      openOrderModal('inquiry_modal', { serviceType: productName.includes('Moniebook') ? 'Moniebook' : 'Business Savings' });
    } else {
      window.open(generateWhatsAppUrl(`Hello Kenny Olu Digital, I want to order / enquire about ${productName}.`), '_blank');
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-7 h-7 text-blue-600" />;
      case 'Coins':
        return <Coins className="w-7 h-7 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-7 h-7 text-purple-600" />;
      case 'PiggyBank':
        return <PiggyBank className="w-7 h-7 text-amber-500" />;
      default:
        return <CreditCard className="w-7 h-7 text-blue-600" />;
    }
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-3">
            Core Moniepoint Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Financial Power For Nigerian Merchants
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From smart point-of-sale hardware to flexible capital loans and digital bookkeeping, choose the solution you need to scale today.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.products.map((product) => {
            const isPos = product.name.toLowerCase().includes('pos');
            const isLoan = product.name.toLowerCase().includes('loan');
            const isSavings = product.name.toLowerCase().includes('savings');

            // Product-specific image or dedicated loan/savings image
            const productImage = isLoan 
              ? (content.loanImageUrl || product.imageUrl || '/images/loan.jpg') 
              : isSavings 
              ? (content.savingsImageUrl || product.imageUrl || '/images/savings.jpg') 
              : product.imageUrl;

            return (
              <div
                key={product.id}
                className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl relative border ${
                  isPos
                    ? 'bg-white border-blue-300 shadow-lg ring-2 ring-blue-500/10'
                    : isLoan
                    ? 'bg-white border-emerald-300 shadow-md ring-1 ring-emerald-500/10'
                    : isSavings
                    ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-500/10'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                {/* Product Badge */}
                {product.badge && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      isPos 
                        ? 'bg-blue-600 text-white' 
                        : isLoan 
                        ? 'bg-emerald-600 text-white' 
                        : isSavings
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5 shadow-xs">
                    {getIcon(product.iconName)}
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {product.name}
                  </h3>
                  
                  <div className="text-sm font-semibold text-blue-600 mt-1 mb-3">
                    {product.tagline}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Dedicated Space: Where Loan is */}
                  {isLoan && (
                    productImage ? (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-60 bg-slate-100">
                        <img
                          src={productImage}
                          alt="Moniepoint Business Loan"
                          className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 to-white p-5 flex flex-col items-center justify-center text-center shadow-2xs">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-2xs">
                          <Coins className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-emerald-950">Fast Working Capital Facilities</span>
                        <span className="text-[11px] text-slate-600 mt-1">Accessible from ₦500k to millions • Zero collateral lockup</span>
                      </div>
                    )
                  )}

                  {/* Dedicated Space: Where Savings is */}
                  {isSavings && (
                    productImage ? (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-60 bg-slate-100">
                        <img
                          src={productImage}
                          alt="Moniepoint Business Savings"
                          className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="mb-6 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-white p-5 flex flex-col items-center justify-center text-center shadow-2xs">
                        <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 shadow-2xs">
                          <PiggyBank className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-amber-950">High-Yield Merchant Vaults</span>
                        <span className="text-[11px] text-slate-600 mt-1">Earn daily interest up to 15%+ p.a. on surplus business funds</span>
                      </div>
                    )
                  )}

                  {/* Generic Product Image if present on POS or Moniebook */}
                  {!isLoan && !isSavings && productImage && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-60 bg-slate-100">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Price & Highlight Bar */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-6 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">Pricing / Terms</div>
                      <div className="text-base font-extrabold text-slate-900">
                        {product.priceTag}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500 font-medium">Benefit</div>
                      <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{product.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleProductAction(product.ctaAction, product.name)}
                    className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                      isPos
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25'
                        : isLoan
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25'
                        : isSavings
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/25'
                        : 'bg-slate-900 hover:bg-black text-white shadow-md'
                    }`}
                  >
                    <span>{product.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateWhatsAppUrl(`Hello Kenny Olu Digital, I want more details on ${product.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <span>WhatsApp Inquiry</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
