import React from 'react';
import { useContent } from '../context/ContentContext';
import { Star, Quote, Building, CheckCircle, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { content, openOrderModal } = useContent();

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3">
            Real Merchant Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Thriving Nigerian Business Owners
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            See how Kenny Olu Digital empowers entrepreneurs with reliable terminals, fast funding, and direct relationship support.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-7 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative group"
            >
              <div>
                {/* Top rating and quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{item.testimonialText}"
                </p>
              </div>

              {/* Author & Business Details */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>{item.businessName}</span>
                    <CheckCircle className="w-4 h-4 text-blue-600 inline shrink-0" />
                  </h4>
                  <div className="text-xs text-slate-600 font-medium">
                    {item.clientName} {item.role ? `• ${item.role}` : ''}
                  </div>
                  {item.location && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {item.productUsed && (
                  <span className="hidden sm:inline-block px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg shadow-2xs">
                    {item.productUsed}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Metric bar */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">Under 24h</div>
            <div className="text-xs text-slate-300">Average Delivery Time</div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.8%</div>
            <div className="text-xs text-slate-300">Transaction Success Rate</div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">₦25,000</div>
            <div className="text-xs text-slate-300">Flat POS Acquisition Fee</div>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">₦500k – Mils</div>
            <div className="text-xs text-slate-300">Business Working Capital</div>
          </div>
        </div>

      </div>
    </section>
  );
};
