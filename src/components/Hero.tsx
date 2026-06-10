import React from 'react';
import { ArrowRight, Compass, Sparkles, Coffee, MessageSquare, Flame } from 'lucide-react';
import { ViewType } from '../types';

interface HeroProps {
  setView: (view: ViewType) => void;
}

export default function Hero({ setView }: HeroProps) {
  return (
    <header className="relative bg-cafe-warm overflow-hidden min-h-[85vh] flex items-center">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF6B35_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cafe-orange/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cafe-wood/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Left Column (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-8 animate-fadeIn md:pr-4">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-cafe-orange-light text-cafe-orange border border-cafe-orange/20 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wide shadow-sm uppercase">
              <Sparkles size={14} className="stroke-[2.5]" />
              <span>Suwanee's Cozy Korean-Inspired Gem</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-cafe-charcoal leading-[1.1] tracking-tight">
              Sip Sunshine at <br />
              <span className="text-cafe-orange relative inline-block">
                Orange Coffee
                <span className="absolute left-0 bottom-1 w-full h-[6px] bg-cafe-orange/20 -z-10 rounded-full" />
              </span> SUWANEE
            </h1>

            {/* Description Paragraph */}
            <p className="font-sans text-base sm:text-lg text-cafe-charcoal/85 max-w-xl leading-relaxed">
              Experience a warm Korean-cafe atmosphere featuring handcrafted specialty beverages. From our viral <strong className="text-cafe-orange font-semibold">Matcha Cream Strawberry Latte</strong> and luxurious <strong className="text-cafe-wood font-semibold">Tiramisu Latte</strong>, to golden-baked flaky croissants and sweet chewy croffles, enjoy a spacious, study-friendly haven in the heart of Suwanee, GA.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-order-online-btn"
                onClick={() => setView('order-now')}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-bold text-base rounded-full shadow-lg shadow-cafe-orange/20 hover:shadow-xl hover:shadow-cafe-orange/30 hover:-translate-y-0.5 transition-all duration-350"
              >
                <span>Order Pick-up Online</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button
                id="hero-view-menu-btn"
                onClick={() => setView('menu')}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-cafe-orange-light border-2 border-cafe-orange/20 hover:border-cafe-orange/40 text-cafe-charcoal font-display font-medium text-base rounded-full shadow-sm hover:-translate-y-0.5 transition-all duration-350"
              >
                <Coffee size={18} className="text-cafe-orange" />
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Google directions trigger */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 font-mono text-xs text-cafe-charcoal/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>Open Today until 8:30 PM</span>
              </div>
              <a
                id="hero-directions-link"
                href="https://maps.google.com/?q=3890+Lawrenceville-Suwanee+Rd,+Suwanee,+GA+30024"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cafe-orange hover:underline font-semibold"
              >
                <Compass size={14} />
                <span>Get Directions (3890 Lawrenceville-Suwanee Rd)</span>
              </a>
            </div>
          </div>

          {/* Visual Right Column (5 cols) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Main stack frame */}
            <div className="relative mx-auto max-w-[400px] lg:max-w-none">
              
              {/* Back framing card decoration */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-cafe-orange/10 to-cafe-wood/5 border-2 border-cafe-orange/10 transform rotate-3" />

              {/* Main App Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] object-cover bg-cafe-warm">
                <img
                  src="/src/assets/images/cafe_hero_1781122994422.png"
                  alt="Cozy elegant interior of Orange Coffee Suwanee with elegant timber wood tables and glass windows"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating pill: Signature highlight 1 */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-cafe-orange/10 flex items-center gap-2.5 max-w-[200px]">
                  <div className="p-1.5 rounded-lg bg-green-50 text-green-700">
                    <Flame size={16} className="fill-green-200 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-xs text-cafe-charcoal leading-none">Matcha Strawberry</span>
                    <span className="block font-mono text-[9px] text-green-700 font-semibold mt-0.5">Top-Rated Signature</span>
                  </div>
                </div>

                {/* Floating pill: Signature highlight 2 */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-cafe-orange/10 flex items-center gap-2.5 max-w-[200px]">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-cafe-wood">
                    <Coffee size={16} />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-xs text-cafe-charcoal leading-none">Tiramisu Latte</span>
                    <span className="block font-mono text-[9px] text-cafe-wood font-semibold mt-0.5">Custard Sweet Foam Cream</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
