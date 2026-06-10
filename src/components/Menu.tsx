import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Search, Flame, Coffee, Sparkles, Filter, CheckCircle2, ChevronRight, Plus } from 'lucide-react';

interface MenuProps {
  onSelectItemToCustomize: (item: MenuItem) => void;
}

export default function Menu({ onSelectItemToCustomize }: MenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'matcha' | 'milk-tea' | 'pastries' | 'desserts'>('all');
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'matcha', label: 'Matcha Series' },
    { id: 'milk-tea', label: 'Milk Teas & Boba' },
    { id: 'pastries', label: 'Fresh Pastries' },
    { id: 'desserts', label: 'Desserts & Sweets' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesPopular = !filterPopularOnly || item.popular;

      return matchesSearch && matchesCategory && matchesPopular;
    });
  }, [searchQuery, activeCategory, filterPopularOnly]);

  return (
    <section id="menu-section" className="py-20 bg-cafe-warm/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cafe-orange-light text-cafe-orange rounded-full font-mono text-xs font-semibold uppercase tracking-wider">
            <Coffee size={14} />
            <span>Orange Coffee Menu</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-cafe-charcoal leading-tight">
            Explore Our Craft Craftsmanship
          </h2>
          <p className="font-sans text-sm sm:text-base text-cafe-charcoal/75 leading-relaxed">
            Every drink is micro-measured and hand-whisked to guarantee thick foams and clear, sweet extracts. Pair with our Korean-traditional pastries, prepared with gourmet European butter.
          </p>
        </div>

        {/* Controls Panel (Search, Filter, Category Tabs) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-cafe-orange/5 mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cafe-charcoal/45 w-5 h-5" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search Matcha, Tiramisu Latte, Croffle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-cafe-warm font-sans text-sm text-cafe-charcoal placeholder-cafe-charcoal/40 focus:outline-none focus:ring-2 focus:ring-cafe-orange/40 transition-shadow border-none"
              />
            </div>

            {/* Popular Filter Toggle button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="font-sans text-sm text-cafe-charcoal/70 font-medium">Show Best-Sellers Only</span>
              <button
                id="menu-popular-toggle"
                onClick={() => setFilterPopularOnly(!filterPopularOnly)}
                className={`relative inline-flex h-6.5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  filterPopularOnly ? 'bg-cafe-orange' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    filterPopularOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Category Tabs Scroll Wrapper */}
          <div className="border-t border-cafe-orange/5 pt-6 flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                id={`menu-tab-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-3 rounded-xl font-display text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-cafe-orange text-white shadow-md shadow-cafe-orange/15'
                    : 'bg-cafe-warm/80 text-cafe-charcoal/80 hover:bg-cafe-orange-light hover:text-cafe-orange'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                id={`menu-card-${item.id}`}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-cafe-orange/5 hover:border-cafe-orange/20 shadow-sm hover:shadow-xl hover:shadow-cafe-orange/5 transition-all duration-300 flex flex-col group relative"
              >
                {/* Popular Glow Badge / Tag Overlay */}
                {item.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-cafe-orange text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Flame size={12} className="fill-white" />
                    <span>Best Seller</span>
                  </div>
                )}

                {/* Card Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cafe-warm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle dark bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags List */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="font-mono text-[9px] uppercase tracking-wider bg-cafe-orange-light text-cafe-orange font-bold px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Name Heading */}
                    <h3 className="font-display font-bold text-xl text-cafe-charcoal leading-tight mb-2 group-hover:text-cafe-orange transition-colors">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-cafe-charcoal/70 leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Action trigger */}
                  <div className="flex items-center justify-between pt-4 border-t border-cafe-warm mt-auto">
                    <div>
                      <span className="block font-mono text-[10px] uppercase font-semibold text-cafe-charcoal/50">Base Price</span>
                      <span className="font-mono font-bold text-lg text-cafe-orange">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Choose/Customize Button */}
                    <button
                      id={`menu-order-${item.id}`}
                      onClick={() => onSelectItemToCustomize(item)}
                      className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs text-white bg-cafe-orange hover:bg-cafe-charcoal transition-colors shadow-sm cursor-pointer flex items-center gap-1 active:scale-95 duration-200"
                    >
                      {item.isCustomizable ? (
                        <>
                          <span>Customize</span>
                          <ChevronRight size={13} />
                        </>
                      ) : (
                        <>
                          <Plus size={14} className="stroke-[2.5]" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-cafe-orange/10 max-w-lg mx-auto">
            <Search size={40} className="mx-auto text-cafe-orange/40 mb-4 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-cafe-charcoal mb-1">No Menu Items Found</h3>
            <p className="font-sans text-sm text-cafe-charcoal/60">
              Try exploring different category tabs or adjusting your search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
