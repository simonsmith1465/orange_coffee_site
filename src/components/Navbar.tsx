import React, { useState } from 'react';
import { Coffee, Menu as MenuIcon, X, ShoppingBag, MapPin, Compass } from 'lucide-react';
import { ViewType, OrderCartItem } from '../types';
import { BUSINESS_INFO } from '../data';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  cart: OrderCartItem[];
  toggleCart: () => void;
}

export default function Navbar({ currentView, setView, cart, toggleCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact & Map' }
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId as ViewType);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cafe-cream/95 backdrop-blur-md border-b border-cafe-orange/10 shadow-sm transition-all duration-300">
      {/* Upper announcements strip */}
      <div className="bg-cafe-orange text-white text-xs py-1 px-4 text-center font-display tracking-wider flex items-center justify-center gap-2">
        <MapPin size={12} className="animate-bounce" />
        <span>Suwanee, GA: Visit us for a cozy Korean café experience! Free Wi-Fi & cozy study vibes.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button 
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-full bg-cafe-orange flex items-center justify-center text-white shadow-md shadow-cafe-orange/20 group-hover:scale-105 transition-transform duration-300">
              <Coffee size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="block font-display font-bold text-lg leading-tight tracking-tight text-cafe-charcoal group-hover:text-cafe-orange transition-colors duration-200">
                Orange Coffee
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-cafe-orange font-semibold">
                Suwanee • Georgia
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                id={`nav-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-display text-sm font-medium transition-all duration-200 ${
                  currentView === item.id || (item.id === 'contact' && currentView === 'contact')
                    ? 'text-white bg-cafe-orange shadow-sm shadow-cafe-orange/15'
                    : 'text-cafe-charcoal/80 hover:text-cafe-orange hover:bg-cafe-orange-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Shopping Cart button */}
            <button
              id="nav-cart-btn"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full border border-cafe-orange/20 text-cafe-charcoal hover:bg-cafe-orange-light hover:text-cafe-orange transition-all duration-200 flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={20} className="stroke-[2]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cafe-orange text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Main Order Online CTA */}
            <button
              id="nav-order-cta"
              onClick={() => handleNavClick('order-now')}
              className="px-5 py-2.5 rounded-full font-display font-semibold text-sm text-white bg-cafe-orange hover:bg-cafe-orange-dark shadow-md hover:shadow-lg hover:shadow-cafe-orange/20 active:scale-95 transition-all duration-200"
            >
              Order Online
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="nav-mob-cart-btn"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full border border-cafe-orange/20 text-cafe-charcoal hover:bg-cafe-orange-light hover:text-cafe-orange transition-all duration-200"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cafe-orange text-white font-mono text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Burger menu */}
            <button
              id="nav-burger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full border border-cafe-orange/20 text-cafe-charcoal hover:bg-cafe-orange-light"
            >
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-cafe-orange/10 bg-cafe-cream animate-fadeIn">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                id={`nav-mob-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-5 py-3 rounded-xl font-display text-base font-semibold block transition-colors ${
                  currentView === item.id
                    ? 'text-white bg-cafe-orange'
                    : 'text-cafe-charcoal/80 hover:bg-cafe-orange-light hover:text-cafe-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-cafe-orange/10 flex flex-col gap-3">
              <button
                id="nav-mob-order-cta"
                onClick={() => handleNavClick('order-now')}
                className="w-full text-center py-3 bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-semibold rounded-xl"
              >
                Order Online (Pickup / Delivery)
              </button>
              <div className="text-center font-mono text-xs text-cafe-charcoal/60 py-1 flex items-center justify-center gap-1.5">
                <Compass size={12} />
                <span>Suwanee, GA • Call us: (470) 266-1113</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
