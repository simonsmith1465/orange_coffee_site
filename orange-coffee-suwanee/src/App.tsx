import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import OrderSimulator from './components/OrderSimulator';
import { ViewType, MenuItem, OrderCartItem } from './types';
import { BUSINESS_INFO, MENU_ITEMS } from './data';
import { Coffee, MapPin, Phone, Clock, Instagram, Facebook, ArrowUp, Quote, Sparkles, AlertCircle, Camera, X, Award, Wifi, Heart, Users } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<ViewType>('home');
  const [cart, setCart] = useState<OrderCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Scroll header detector
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback to handle quick clicks from homepage cards or custom order drawers
  const handleSelectItemToCustomize = (item: MenuItem) => {
    if (item.isCustomizable) {
      setCustomizingItem(item);
    } else {
      // Instant add for direct checkout items like classic croissants
      const cartEntryId = `${item.id}-Standard-NoIce-Regular-NoMilk`;
      const existingIdx = cart.findIndex(c => c.id === cartEntryId);
      if (existingIdx !== -1) {
        const updated = [...cart];
        updated[existingIdx].quantity += 1;
        setCart(updated);
      } else {
        const instantItem: OrderCartItem = {
          id: cartEntryId,
          item,
          quantity: 1,
          size: 'Standard',
          priceAtOrder: item.price
        };
        setCart([...cart, instantItem]);
      }
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-cafe-orange/20 selection:text-cafe-orange">
      
      {/* Dynamic Header & Navigation */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        cart={cart} 
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
      />

      {/* Main Screen Stream / Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Immersive Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:grid-rows-10">
              
              {/* Card 1: Hero Section (7 cols, 5 rows) */}
              <div className="col-span-12 md:col-span-7 md:row-span-5 bg-stone-200 rounded-3xl overflow-hidden relative border border-stone-200 min-h-[380px] md:min-h-[480px] group shadow-xs hover:shadow-md transition-all duration-300">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-700 absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                  <span className="text-orange-400 font-mono text-xs font-bold mb-1 uppercase tracking-widest">Suwanee's Finest</span>
                  <h2 className="text-3.5xl sm:text-4.5xl md:text-5.5xl font-serif leading-tight mb-4 italic font-medium tracking-tight">
                    Experience the warmth of a Korean-inspired café.
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 max-w-md mb-6 leading-relaxed font-sans">
                    Handcrafted specialty lattes, premium organic Uji matcha layers, fresh buttery pastries, and quiet, spacious study-friendly spaces in Georgia.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setView('menu')}
                      className="bg-white hover:bg-orange-500 hover:text-white text-stone-900 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all active:scale-95 duration-150 cursor-pointer shadow-sm"
                    >
                      View Full Menu
                    </button>
                    <button 
                      onClick={() => {
                        const elem = document.getElementById('bento-about-card');
                        if (elem) {
                          elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          elem.classList.add('ring-4', 'ring-orange-500/50');
                          setTimeout(() => {
                            elem.classList.remove('ring-4', 'ring-orange-500/50');
                          }, 2000);
                        } else {
                          setIsStoryOpen(true);
                        }
                      }}
                      className="bg-transparent border border-white hover:bg-white/15 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all active:scale-95 duration-150 cursor-pointer"
                    >
                      Our Story
                    </button>
                  </div>
                </div>
                {/* Status indicator badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-sm border border-stone-200/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="font-mono text-[10px] text-stone-700 font-bold uppercase tracking-wider">Open Today until 8:30 PM</span>
                </div>
              </div>

              {/* Card 2: Menu Card (Popular Right Now) (5 cols, 4 rows) */}
              <div className="col-span-12 md:col-span-5 md:row-span-4 bg-orange-100/90 rounded-3xl p-6 border border-orange-200/80 flex flex-col justify-between hover:shadow-xs transition-all duration-300">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-900 font-display">
                    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full inline-block animate-pulse"></span>
                    Popular Right Now
                  </h3>
                  <div className="space-y-3.5">
                    {/* Item 1 */}
                    <div 
                      onClick={() => {
                        const item = MENU_ITEMS.find(m => m.id === 'matcha-strawberry');
                        if (item) handleSelectItemToCustomize(item);
                      }}
                      className="flex justify-between items-center bg-white/60 hover:bg-white/95 p-3.5 rounded-2xl transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs border border-orange-200/20"
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 font-display text-sm group-hover:text-orange-600 transition-colors">Matcha Cream Strawberry Latte</span>
                          <span className="bg-green-50 text-green-700 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">Best</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">House-made puree & premium matcha</p>
                      </div>
                      <span className="font-mono font-bold text-orange-600 shrink-0 bg-white px-2.5 py-1 rounded-lg text-sm border border-orange-200/30 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all">
                        $6.75
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div 
                      onClick={() => {
                        const item = MENU_ITEMS.find(m => m.id === 'tiramisu-latte');
                        if (item) handleSelectItemToCustomize(item);
                      }}
                      className="flex justify-between items-center bg-white/60 hover:bg-white/95 p-3.5 rounded-2xl transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs border border-orange-200/20"
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 font-display text-sm group-hover:text-orange-600 transition-colors">Tiramisu Latte</span>
                          <span className="bg-amber-50 text-amber-800 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">Cream</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">Espresso, cocoa & mascarpone foam</p>
                      </div>
                      <span className="font-mono font-bold text-orange-600 shrink-0 bg-white px-2.5 py-1 rounded-lg text-sm border border-orange-200/30 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all">
                        $6.50
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div 
                      onClick={() => {
                        const item = MENU_ITEMS.find(m => m.id === 'croissant-butter');
                        if (item) handleSelectItemToCustomize(item);
                      }}
                      className="flex justify-between items-center bg-white/60 hover:bg-white/95 p-3.5 rounded-2xl transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs border border-orange-200/20"
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 font-display text-sm group-hover:text-orange-600 transition-colors">Fresh Almond Croissant</span>
                          <span className="bg-orange-50 text-orange-850 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">Daily</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">Baked fresh in gourmet deck ovens daily</p>
                      </div>
                      <span className="font-mono font-bold text-orange-600 shrink-0 bg-white px-2.5 py-1 rounded-lg text-sm border border-orange-200/30 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent transition-all">
                        $3.95
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-orange-950/60 font-mono text-center mt-3 pt-2 border-t border-orange-250/20">
                  💡 Click any item to customize and add immediately!
                </div>
              </div>

              {/* Card 3: Order CTA Card (5 cols, 1 row) */}
              <div 
                onClick={() => setView('order-now')}
                className="col-span-12 md:col-span-5 md:row-span-1 bg-stone-900 rounded-3xl flex items-center justify-between px-6 py-4.5 text-white hover:bg-stone-850 cursor-pointer transition-all border border-stone-800 shadow-xs hover:shadow-md duration-300 group"
              >
                <span className="text-sm font-medium font-sans text-stone-200 group-hover:text-white transition-colors">Skip the line and order ahead</span>
                <span className="text-orange-500 font-bold uppercase text-xs tracking-widest flex items-center gap-1 transition-colors group-hover:text-orange-400">
                  Start Order →
                </span>
              </div>

              {/* Card 4: About/Ambiance Card (3 cols, 5 rows) */}
              <div 
                id="bento-about-card"
                className="col-span-12 md:col-span-3 md:row-span-5 bg-white rounded-3xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="mb-4 text-orange-500">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 21h18v-2H2M20 8h-2V5h2M4 19h14V3H4M9 9H7v2h2m0 2H7v2h2m3-4h-2v2h2m0 2h-2v2h2m3-4h-2v2h2m0 2h-2v2h2"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2 leading-snug text-stone-900 font-display">
                    Spacious seating, free Wi-Fi, and natural light.
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-sans mt-2">
                    The perfect corner for study sessions, morning meetings, or catching up with friends in a quiet, modern atmosphere. Inspired by neighborhood boutique lounges in Seoul.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">Vibe: Minimalist & Warm</span>
                  <button 
                    onClick={() => setIsStoryOpen(true)}
                    className="text-orange-500 hover:text-orange-600 font-mono text-[10px] font-bold tracking-widest uppercase hover:underline"
                  >
                    Our Story →
                  </button>
                </div>
              </div>

              {/* Card 5: Testimonial Card (4 cols, 2 rows) */}
              <div 
                onClick={() => setView('reviews')}
                className="col-span-12 md:col-span-4 md:row-span-2 bg-[#FFF8F0] rounded-3xl p-6 border border-orange-100 italic flex items-center gap-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-orange-200 rounded-full flex-shrink-0 overflow-hidden border-2 border-orange-100 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                    alt="Sarah Kim"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-xs leading-relaxed text-stone-700">
                    "The best latte in Georgia. The interior is so clean and the service is incredibly friendly. A hidden gem in Suwanee!"
                  </p>
                  <p className="text-[10px] font-bold mt-2 uppercase text-orange-600 font-mono tracking-wider">
                    — Min-ji Kim, Regular
                  </p>
                </div>
              </div>

              {/* Card 6: Contact & Map Card (5 cols, 5 rows) */}
              <div className="col-span-12 md:col-span-5 md:row-span-5 bg-stone-100 rounded-3xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-bold mb-1.5 uppercase text-[10px] tracking-widest text-stone-400 font-mono">Location</h4>
                      <p className="text-xs sm:text-sm text-stone-800 leading-normal font-sans">
                        3890 Lawrenceville-Suwanee Rd,<br />Suwanee, GA 30024
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 uppercase text-[10px] tracking-widest text-stone-400 font-mono">Hours</h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-mono">
                        Mon–Sat: 8am – 9pm<br />Sun: 9am – 8pm
                      </p>
                    </div>
                    <div className="pt-2">
                      <a href="tel:4702661113" className="text-sm font-bold text-stone-800 hover:text-orange-600 hover:underline flex items-center gap-1 font-sans">
                        <Phone size={13} className="text-orange-500" />
                        <span>(470) 266-1113</span>
                      </a>
                    </div>
                  </div>

                  <a 
                    href="https://maps.google.com/?q=3890+Lawrenceville-Suwanee+Rd,+Suwanee,+GA+30024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-300 rounded-2.5xl relative overflow-hidden h-36 sm:h-full block group shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-sky-100 flex flex-col items-center justify-center text-stone-500 transition-colors group-hover:bg-sky-150">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <span className="font-sans text-[10px] text-stone-600 font-bold uppercase mt-2">Get Directions</span>
                      
                      {/* Stylized vector map outlines */}
                      <div className="absolute inset-x-0 top-1/2 h-1 bg-white/40 -translate-y-1/2 rotate-12" />
                      <div className="absolute inset-x-0 top-1/3 h-0.5 bg-white/40 -translate-y-1/2 -rotate-12" />
                      <div className="absolute inset-y-0 left-1/3 w-1 bg-white/40 -translate-x-1/2 rotate-45" />
                    </div>
                  </a>
                </div>
                <div className="text-[10px] text-stone-400 font-mono font-medium pt-3 mt-4 border-t border-stone-200/60 leading-normal">
                  📍 Easy customer parking right in front of the café entrance!
                </div>
              </div>

              {/* Card 7: Gallery Mini (4 cols, 3 rows) */}
              <div className="col-span-12 md:col-span-4 md:row-span-3 grid grid-cols-2 gap-3">
                <div className="bg-stone-200 rounded-2xl overflow-hidden border border-stone-100 aspect-square relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=300"
                    alt="Cozy espresso pours"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all" />
                </div>
                <div className="bg-stone-200 rounded-2xl overflow-hidden border border-stone-100 aspect-square relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=300"
                    alt="Specialty sweet items"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all" />
                </div>
                <div className="bg-stone-200 rounded-2xl overflow-hidden border border-stone-100 aspect-square relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1559925393-8be0ec41b50d?auto=format&fit=crop&q=80&w=300"
                    alt="Comfort study booths"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all" />
                </div>
                <div 
                  onClick={() => setView('gallery')}
                  className="bg-orange-500 hover:bg-orange-600 rounded-2xl flex flex-col items-center justify-center text-white text-[11px] font-bold uppercase tracking-widest cursor-pointer font-display text-center p-3 select-none active:scale-95 duration-200 hover:scale-[1.02] shadow-2xs hover:shadow-xs"
                >
                  <Camera size={16} className="mb-1" />
                  <span>View Gallery</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Categorized Menu Section */}
        {(currentView === 'menu' || currentView === 'order-now') && (
          <div>
            {currentView === 'order-now' && (
              <div className="bg-cafe-orange/5 border-b border-cafe-orange/10 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-sans text-cafe-orange font-bold">
                  <AlertCircle size={14} className="animate-spin" />
                  <span>Build your local pickup order! Click "Customize" on any item below to save to your basket.</span>
                </div>
              </div>
            )}
            <Menu onSelectItemToCustomize={handleSelectItemToCustomize} />
          </div>
        )}

        {/* Customer Reviews Section */}
        {currentView === 'reviews' && (
          <Reviews />
        )}

        {/* Photo Gallery Section */}
        {currentView === 'gallery' && (
          <Gallery />
        )}

        {/* Contact Us + interactive Google Map */}
        {currentView === 'contact' && (
          <Contact />
        )}
      </main>

      {/* Shared Ordering Panel logic wrapper */}
      <OrderSimulator
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        customizingItem={customizingItem}
        setCustomizingItem={setCustomizingItem}
        onProceedToOrderTab={() => setView('menu')}
      />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 p-3 rounded-full bg-cafe-orange hover:bg-cafe-charcoal text-white shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Global Regional SEO Footers */}
      <footer className="bg-cafe-charcoal text-white pt-16 pb-8 border-t border-cafe-orange/20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1 Brand Details (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-cafe-orange flex items-center justify-center text-white">
                <Coffee size={18} />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight">
                Orange Coffee Suwanee
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Discover a warm, community-first Korean-style café in Suwanee, Gwinnett County. Serving specialty hand-crafted lattes, organic matcha cream layers, Basques, croissants, and friendly local service.
            </p>
            <div className="flex gap-3 pt-1">
              <a href={BUSINESS_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cafe-orange duration-155 text-xs font-mono font-medium flex items-center gap-1 hover:underline">
                <Instagram size={14} />
                <span>Instagram</span>
              </a>
              <a href={BUSINESS_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cafe-orange duration-155 text-xs font-mono font-medium flex items-center gap-1 hover:underline">
                <Facebook size={14} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Col 2 Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-widest text-cafe-orange uppercase">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button id="footer-link-home" onClick={() => { setView('home'); scrollToTop(); }} className="hover:text-cafe-orange hover:underline transition-colors">
                  Home Story
                </button>
              </li>
              <li>
                <button id="footer-link-menu" onClick={() => { setView('menu'); scrollToTop(); }} className="hover:text-cafe-orange hover:underline transition-colors">
                  Our Menu (Coffee, Matcha, Sweets)
                </button>
              </li>
              <li>
                <button id="footer-link-reviews" onClick={() => { setView('reviews'); scrollToTop(); }} className="hover:text-cafe-orange hover:underline transition-colors">
                  Community Reviews & Testimonials
                </button>
              </li>
              <li>
                <button id="footer-link-gallery" onClick={() => { setView('gallery'); scrollToTop(); }} className="hover:text-cafe-orange hover:underline transition-colors">
                  Aesthetic Photo Gallery
                </button>
              </li>
              <li>
                <button id="footer-link-contact" onClick={() => { setView('contact'); scrollToTop(); }} className="hover:text-cafe-orange hover:underline transition-colors">
                  Location, MAP & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Contacts details (5 cols) */}
          <div className="md:col-span-5 space-y-4 font-sans text-xs text-white/80">
            <h4 className="font-display font-bold text-sm tracking-widest text-cafe-orange uppercase">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-cafe-orange shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <Phone size={16} className="text-cafe-orange shrink-0 mt-0.5" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-cafe-orange hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex gap-2.5 items-start">
                <Clock size={16} className="text-cafe-orange shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block text-white">Mon - Fri: 7:30 AM - 8:30 PM</span>
                  <span className="block text-white">Sat: 8:00 AM - 9:00 PM</span>
                  <span className="block text-white/70">Sun: 8:30 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copywrite details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-[10px] text-white/50 tracking-wider">
            © 2026 ORANGE COFFEE SUWANEE. ALL RIGHTS RESERVED. DESIGNED FOR EXCELLENCE IN GEORGIA.
          </p>
          <p className="font-sans text-[9px] text-white/30 mt-2">
            The Orange brand & respective materials are simulated property representing gourmet barista services near Suwanee Town Center.
          </p>
        </div>
      </footer>

      {/* Brand Story interactive modal popup */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={() => setIsStoryOpen(false)}>
          <div className="bg-white rounded-3xl border border-stone-200/60 p-6 md:p-8 max-w-lg w-full relative shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsStoryOpen(false)}
              className="absolute top-4 right-4 text-stone-550 hover:text-stone-800 p-2 rounded-full hover:bg-stone-50 transition-colors cursor-pointer"
              aria-label="Close Story"
            >
              <X size={18} />
            </button>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider">
                <Award size={12} />
                Our Heritage & Ambitions
              </span>
              <h3 className="font-display font-bold text-2xl text-stone-900 pr-4 leading-tight">
                Crafting Aesthetic Neighborhood Gatherings
              </h3>
              <div className="space-y-3 text-stone-650 text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-[50vh] pr-1">
                <p>
                  At <strong className="text-orange-600 font-semibold">Orange Coffee Suwanee</strong>, we believe coffee is more than just raw caffeine; it is a sensory highlight and a facilitator of community. Drawing inspiration from modern neighborhood craft lounges of Seoul, Korea, we combine meticulous brewing with playful, sweet comfort treats.
                </p>
                <p>
                  Our signature recipes are crafted with high-grade organic milks, double-extracted espressos, and fresh farm purees. Our #1 bestseller, the <strong className="text-orange-600 font-semibold">Matcha Cream Strawberry Latte</strong>, layers Uji ceremonial matcha over fresh strawberries, while our croissants and croffles are baked in-house fresh daily.
                </p>
                <p>
                  Our mission is to establish a cozy community living room for Suwanee. Whether you’re working on a remote study task with our free high-speed Wi-Fi, or enjoying a lovely treat with friends, feel completely at home!
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Wifi size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Heart size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Users size={14} />
                  </div>
                </div>
                <button 
                  onClick={() => { setIsStoryOpen(false); setView('menu'); }}
                  className="bg-stone-900 hover:bg-stone-850 text-white font-display text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Explore Specialties
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
