import React from 'react';
import { BUSINESS_INFO } from '../data';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Compass, CheckCircle2, Share2, HelpCircle } from 'lucide-react';

export default function Contact() {
  const mapQueryUrl = `https://maps.google.com/maps?q=3890%20Lawrenceville-Suwanee%20Rd,%20Suwanee,%20GA%2030024&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cafe-orange-light text-cafe-orange rounded-full font-mono text-xs font-semibold uppercase tracking-wider">
            <Compass size={14} />
            <span>Find Us in Suwanee</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cafe-charcoal leading-tight">
            Stop By & Enjoy Cozy Vibes
          </h2>
          <p className="font-sans text-sm sm:text-base text-cafe-charcoal/70 leading-relaxed font-normal">
            Whether you are ordering your morning double-shot espresso, studying for exams, or looking for delicate basque cheesecake, we've got you covered!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Card core columns (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Business Contact Cards Block */}
            <div className="bg-cafe-warm/40 border border-cafe-orange/5 rounded-3xl p-6 sm:p-8 space-y-6 flex-1">
              
              <h3 className="font-display font-bold text-2xl text-cafe-charcoal border-b border-cafe-orange/10 pb-4">
                Shop Information
              </h3>

              {/* Address detail */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-cafe-orange-light text-cafe-orange flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block font-display font-bold text-xs uppercase text-cafe-charcoal/50 leading-none mb-1.5">
                    Address Link
                  </span>
                  <a
                    id="contact-map-link"
                    href="https://maps.google.com/?q=3890+Lawrenceville-Suwanee+Rd,+Suwanee,+GA+30024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm sm:text-base text-cafe-charcoal font-semibold hover:text-cafe-orange duration-200"
                  >
                    {BUSINESS_INFO.address}
                  </a>
                  <span className="block text-xs text-cafe-charcoal/60 mt-1">
                    Gwinnett County • Next to Lawrenceville-Suwanee Rd
                  </span>
                </div>
              </div>

              {/* Phone trigger dial */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-cafe-orange-light text-cafe-orange flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block font-display font-bold text-xs uppercase text-cafe-charcoal/50 leading-none mb-1.5">
                    Phone Inquiries
                  </span>
                  <a
                    id="contact-phone-trigger"
                    href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="font-mono text-base sm:text-lg text-cafe-charcoal font-bold hover:text-cafe-orange duration-200"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-cafe-orange-light text-cafe-orange flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <span className="block font-display font-bold text-xs uppercase text-cafe-charcoal/50 leading-none mb-3">
                    Opening Hours
                  </span>
                  <div className="space-y-1.5 font-sans text-sm text-cafe-charcoal/90">
                    {BUSINESS_INFO.hours.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-dashed border-cafe-orange/5 pb-1 last:border-0 last:pb-0">
                        <span className="font-semibold">{item.days}</span>
                        <span className="font-mono font-medium text-cafe-charcoal/85">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services Offered detail */}
              <div className="pt-4 border-t border-cafe-orange/10">
                <span className="block font-display font-bold text-xs uppercase text-cafe-charcoal/50 leading-none mb-3">
                  Services Provided
                </span>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.services.map((svc, i) => (
                    <span key={i} className="font-sans text-xs bg-white text-cafe-charcoal/80 border border-cafe-orange/15 px-3 py-1.5 rounded-full font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Social handles share footer */}
            <div className="bg-cafe-charcoal text-white rounded-3xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[10px] text-cafe-orange font-bold uppercase tracking-wider mb-1">
                  Connect & Tag Us
                </span>
                <span className="block font-display font-bold text-lg">
                  Follow on Socials
                </span>
              </div>
              <div className="flex gap-3">
                <a
                  id="contact-instagram-social"
                  href={BUSINESS_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-cafe-orange text-white hover:scale-110 duration-200 transition-all flex items-center justify-center"
                  aria-label="Instagram Page"
                >
                  <Instagram size={20} />
                </a>
                <a
                  id="contact-facebook-social"
                  href={BUSINESS_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-cafe-orange text-white hover:scale-110 duration-200 transition-all flex items-center justify-center"
                  aria-label="Facebook Page"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

          </div>

          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-[2rem] overflow-hidden shadow-md flex-1 min-h-[350px] border border-cafe-orange/10 flex flex-col">
              
              {/* Overlay GPS Card */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-cafe-orange/10 flex items-center gap-3 max-w-sm">
                <div className="p-2 rounded-xl bg-cafe-orange-light text-cafe-orange">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block font-display font-black text-xs text-cafe-charcoal">Orange Coffee Suwanee</span>
                  <span className="block font-sans text-[10px] text-cafe-charcoal/70">3890 Lawrenceville-Suwanee Rd</span>
                </div>
                <a
                  id="iframe-overlay-directions"
                  href="https://maps.google.com/?q=3890+Lawrenceville-Suwanee+Rd,+Suwanee,+GA+30024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-cafe-orange text-white hover:bg-cafe-orange-dark duration-150 shrink-0"
                  title="Route on Google Maps"
                >
                  <Compass size={14} />
                </a>
              </div>

              {/* Map Iframe */}
              <iframe
                title="Google Maps Location for Orange Coffee Suwanee GA"
                src={mapQueryUrl}
                width="100%"
                height="100%"
                className="border-0 w-full flex-1 rounded-[2rem]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
