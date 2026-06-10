import React from 'react';
import { Wifi, Award, Users, Heart, Star, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function About() {
  const highlights = [
    {
      icon: <Award className="text-cafe-orange w-6 h-6" />,
      title: "Premium Grade Ingredients",
      description: "Direct-import Uji ceremonial matcha, gourmet roasted espresso beans, and house-simmered organic fruit purees made fresh daily."
    },
    {
      icon: <Wifi className="text-cafe-orange w-6 h-6" />,
      title: "Remote Work & Study Haven",
      description: "Ample, spaced timber tables, comfortable seating, numerous electrical outlets, and complementary high-speed Wi-Fi."
    },
    {
      icon: <Users className="text-cafe-orange w-6 h-6 text-center" />,
      title: "Warm Korean-Style Hospitality",
      description: "Inspired by the aesthetic neighborhood cafes of Seoul, featuring minimalist neutral designs, ambient lighting, and stellar hospitality."
    },
    {
      icon: <Heart className="text-cafe-orange w-6 h-6" />,
      title: "Heart-Centered Community Hub",
      description: "A cozy community living-room for Suwanee families, couples, and students to unwind, connect, or relax."
    }
  ];

  return (
    <section id="about-us" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Side Graphic/Photo collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-cafe-warm">
                  <img
                    src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop&q=80"
                    alt="Fresh iced drink preparation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-[3/4] bg-cafe-warm">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80"
                    alt="Golden baker croissants"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-[3/4] bg-cafe-warm">
                  <img
                    src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80"
                    alt="Premium Tiramisu Cold Foam Espresso Latte"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-cafe-warm">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80"
                    alt="Sunny window table at coffee shop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block font-mono text-xs font-bold text-cafe-orange bg-cafe-orange-light px-3 py-1 rounded-full uppercase tracking-wider">
              Our Story
            </div>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cafe-charcoal leading-tight">
              Crafting Shared Moments and Unique Flavors in Suwanee, Georgia
            </h2>

            <div className="space-y-4 font-sans text-base text-cafe-charcoal/80 leading-relaxed">
              <p>
                At <strong className="text-cafe-orange font-semibold">Orange Coffee Suwanee</strong>, we believe coffee is more than just raw caffeine; it's a sensory experience and a catalyst for beautiful community interactions. Drawing inspiration from modern neighborhood craft cafés in Seoul, Korea, we combine meticulous preparation with playful, sweet culinary innovations.
              </p>
              <p>
                Our signature lattes are crafted using double-pulled ristretto espresso shots and high-grade specialty organic cream concoctions. We take immense pride in our <strong className="text-cafe-orange font-semibold">Matcha Cream Strawberry Latte</strong> where earthy ceremonial-grade green tea dances with fresh mashed berry purees. Every croissant, macaron, and croffle is baked to golden flaky perfection fresh, greeting you with rich warm aromas the second you step through our doors.
              </p>
              <p>
                Whether you’re seeking a vibrant, bright-lit desk with fast fiber-backbone Wi-Fi to tackle a remote workspace assignment, or looking for a relaxing, warm wooden booth to converse with loved ones, Orange Coffee is designed to feel like your absolute aesthetic home away from home.
              </p>
            </div>

            {/* Quick specifications list */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cafe-orange/10 font-sans text-sm text-cafe-charcoal/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-cafe-orange" />
                <span>100% Organic Uji Matcha</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-cafe-orange" />
                <span>Ultra High-Speed Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-cafe-orange" />
                <span>Fresh Pastries Baked Hourly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-cafe-orange" />
                <span>Spacious Lounge Seating</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Grid Details */}
        <div className="border-t border-cafe-orange/5 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-cafe-cream border border-cafe-orange/5 hover:border-cafe-orange/20 hover:shadow-lg hover:shadow-cafe-orange/5 duration-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cafe-orange-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-cafe-charcoal mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-cafe-charcoal/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
