import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { GalleryImage } from '../types';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'interior' | 'drinks' | 'pastries'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Cafe Atmosphere' },
    { id: 'drinks', label: 'Specialty Drinks' },
    { id: 'pastries', label: 'Baked Pastries' }
  ];

  const filteredImages = GALLERY_IMAGES.filter(img => activeTab === 'all' || img.category === activeTab);

  const openLightbox = (image: GalleryImage) => {
    const globalIdx = GALLERY_IMAGES.findIndex(img => img.id === image.id);
    if (globalIdx !== -1) {
      setLightboxIndex(globalIdx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section id="gallery-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cafe-orange-light text-cafe-orange rounded-full font-mono text-xs font-semibold uppercase tracking-wider">
            <Camera size={14} />
            <span>@orangecoffee.suwanee</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cafe-charcoal leading-tight">
            Our Aesthetic Atmosphere
          </h2>
          <p className="font-sans text-sm sm:text-base text-cafe-charcoal/70 leading-relaxed">
            Take a glance at our minimalist warm timber seating, modern espresso systems, and freshly crafted signature lattes and pastries.
          </p>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map(tab => (
            <button
              id={`gallery-filter-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-cafe-orange text-white shadow-md'
                  : 'bg-cafe-warm text-cafe-charcoal hover:bg-cafe-orange-light hover:text-cafe-orange'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, idx) => (
            <div
              id={`gallery-item-${image.id}`}
              key={image.id}
              onClick={() => openLightbox(image)}
              className="group relative overflow-hidden rounded-3xl aspect-square shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-cafe-warm cursor-pointer border border-cafe-orange/5"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay descriptor */}
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-charcoal/90 via-cafe-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-cafe-orange font-bold mb-1">
                  {image.category}
                </span>
                <p className="font-display font-medium text-white text-sm leading-tight line-clamp-2">
                  {image.alt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-sans text-[11px] text-white/75 font-medium">Click to expand</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <Maximize2 size={14} className="stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instantly beautiful footer message */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-cafe-charcoal/65">
            Love what you see? Mention and tag us in your sweet stories at{' '}
            <a
              id="gallery-instagram-link"
              href="https://instagram.com/orangecoffee.suwanee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cafe-orange hover:underline font-bold font-display"
            >
              @orangecoffee.suwanee
            </a>
          </p>
        </div>

        {/* Lightbox Overlay */}
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Left controller */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Middle Container */}
            <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-4">
              <div 
                className="relative overflow-hidden rounded-2xl max-h-[70vh] bg-neutral-900 border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={GALLERY_IMAGES[lightboxIndex].url}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-white space-y-1 px-4">
                <span className="font-mono text-xs uppercase tracking-widest text-cafe-orange font-bold">
                  Category: {GALLERY_IMAGES[lightboxIndex].category}
                </span>
                <p className="font-display text-base font-semibold max-w-xl">
                  {GALLERY_IMAGES[lightboxIndex].alt}
                </p>
                <p className="font-mono text-white/50 text-xs">
                  {lightboxIndex + 1} of {GALLERY_IMAGES.length}
                </p>
              </div>
            </div>

            {/* Right controller */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
