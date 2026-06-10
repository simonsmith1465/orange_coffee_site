import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, ShieldCheck, PenTool, User, Coffee, Smile } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [formName, setFormName] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formDrink, setFormDrink] = useState('Matcha Cream Strawberry Latte');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Load reviews on initial render
  useEffect(() => {
    const saved = localStorage.getItem('orange_coffee_user_reviews');
    if (saved) {
      setReviewsList(JSON.parse(saved));
    } else {
      setReviewsList(REVIEWS);
    }
  }, []);

  const averageRating = (
    reviewsList.reduce((acc, review) => acc + review.rating, 0) / reviewsList.length
  ).toFixed(1);

  const starCounts = [
    { stars: 5, count: reviewsList.filter(r => r.rating === 5).length },
    { stars: 4, count: reviewsList.filter(r => r.rating === 4).length },
    { stars: 3, count: reviewsList.filter(r => r.rating === 3).length },
    { stars: 2, count: reviewsList.filter(r => r.rating === 2).length },
    { stars: 1, count: reviewsList.filter(r => r.rating === 1).length },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert('Please fill out your name and write a brief comment.');
      return;
    }

    const newReview: Review = {
      id: `user-r-${Date.now()}`,
      name: formName,
      rating: formRating,
      comment: formComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 5000000)}?w=100&auto=format&fit=crop&q=80`,
      drinkOrdered: formDrink || undefined,
      verifiedPurchase: true
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('orange_coffee_user_reviews', JSON.stringify(updated));

    // Clear form
    setFormName('');
    setFormComment('');
    setFormRating(5);
    setFormDrink('Matcha Cream Strawberry Latte');
    setShowReviewForm(false);
    
    setSubmitMessage('Thank you for your warm review! It has been posted successfully.');
    setTimeout(() => setSubmitMessage(''), 4000);
  };

  return (
    <section id="reviews-section" className="py-20 bg-cafe-warm/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cafe-orange-light text-cafe-orange rounded-full font-mono text-xs font-semibold uppercase tracking-wider">
            <MessageSquare size={14} />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cafe-charcoal leading-tight">
            What the Suwanee Community Thinks
          </h2>
          <p className="font-sans text-sm sm:text-base text-cafe-charcoal/70 leading-relaxed">
            We are deeply honored to serve our neighborhood. Take a look at some verified feedback or share your own personal experience!
          </p>
        </div>

        {/* Aggregate Ratings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-cafe-orange/5 shadow-sm items-center">
          
          {/* Average Rating Block */}
          <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-cafe-orange/10 pb-6 md:pb-0">
            <span className="block font-display text-6xl font-black text-cafe-orange leading-none mb-2">
              {averageRating}
            </span>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  className={`${
                    star <= Math.round(Number(averageRating))
                      ? 'fill-cafe-orange text-cafe-orange'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-sans text-sm text-cafe-charcoal/60">
              Based on {reviewsList.length} verified reviews
            </span>
          </div>

          {/* Rating breakdown details */}
          <div className="md:col-span-5 space-y-2">
            {starCounts.map((row) => {
              const pct = reviewsList.length ? (row.count / reviewsList.length) * 100 : 0;
              return (
                <div key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-xs text-cafe-charcoal/65 w-12 text-right">{row.stars} Stars</span>
                  <div className="flex-1 h-3 bg-cafe-warm rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cafe-orange rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-cafe-charcoal/60 w-8">{row.count}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Button Column */}
          <div className="md:col-span-3 text-center md:text-right">
            {!showReviewForm ? (
              <button
                id="reviews-write-btn"
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cafe-orange hover:bg-cafe-charcoal text-white font-display font-semibold rounded-2xl shadow-md transition-colors active:scale-95 duration-250 shrink-0"
              >
                <PenTool size={16} />
                <span>Leave a Review</span>
              </button>
            ) : (
              <button
                id="reviews-cancel-btn"
                onClick={() => setShowReviewForm(false)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-cafe-charcoal font-display font-semibold rounded-2xl transition-colors active:scale-95 duration-250"
              >
                <span>Close form</span>
              </button>
            )}
          </div>
        </div>

        {/* Review Submission Form Container */}
        {showReviewForm && (
          <form 
            id="reviews-form"
            onSubmit={handleReviewSubmit}
            className="bg-white border border-cafe-orange/20 rounded-3xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto mb-12 animate-fadeIn space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-cafe-charcoal flex items-center gap-2">
              <Smile className="text-cafe-orange" />
              <span>Share Your Orange Coffee Experience</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Your Name</label>
                <input
                  id="review-form-name"
                  type="text"
                  required
                  placeholder="e.g. Liam Jenkins"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 focus:outline-none focus:ring-2 focus:ring-cafe-orange/40 text-sm text-cafe-charcoal"
                />
              </div>

              {/* Coffee ordered selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Favorite Drink/Food Ordered</label>
                <select
                  id="review-form-drink"
                  value={formDrink}
                  onChange={(e) => setFormDrink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 focus:outline-none focus:ring-2 focus:ring-cafe-orange/40 text-sm text-cafe-charcoal"
                >
                  <option value="Matcha Cream Strawberry Latte">Matcha Cream Strawberry Latte</option>
                  <option value="Tiramisu Latte">Tiramisu Latte</option>
                  <option value="Classic Korean Einspänner">Classic Korean Einspänner</option>
                  <option value="Orange Espresso Tonic">Orange Espresso Tonic</option>
                  <option value="Sweet Spanish Condensed Latte">Sweet Spanish Condensed Latte</option>
                  <option value="Brown Sugar Boba Crème Milk">Brown Sugar Boba Crème Milk</option>
                  <option value="Korean Sweet Croffle">Korean Sweet Croffle</option>
                  <option value="Strawberry Chantilly Croissant">Strawberry Chantilly Croissant</option>
                  <option value="Signature Macaron Box">Signature Macaron Box</option>
                </select>
              </div>
            </div>

            {/* Stars Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Star Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    id={`review-form-star-${star}`}
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${
                        star <= formRating
                          ? 'fill-cafe-orange text-cafe-orange'
                          : 'text-gray-200 hover:text-cafe-orange-light'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Body */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Comments & Thoughts</label>
              <textarea
                id="review-form-comment"
                required
                rows={4}
                placeholder="Describe your drink quality, customer service, environment, wifi speed, etc..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 focus:outline-none focus:ring-2 focus:ring-cafe-orange/40 text-sm text-cafe-charcoal"
              />
            </div>

            {/* Submit button */}
            <button
              id="review-form-submit"
              type="submit"
              className="w-full py-3.5 bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              Submit Public Review
            </button>
          </form>
        )}

        {/* Success toast overlay notification */}
        {submitMessage && (
          <div className="max-w-xl mx-auto mb-8 bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-xl flex items-center gap-3 animate-fadeIn">
            <ShieldCheck size={20} className="text-green-500 shrink-0" />
            <span className="font-sans text-sm font-medium">{submitMessage}</span>
          </div>
        )}

        {/* Reviews Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div
              id={`review-card-${review.id}`}
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-cafe-orange/5 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= review.rating
                            ? 'fill-cafe-orange text-cafe-orange'
                            : 'text-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-cafe-charcoal/40 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="font-sans text-sm text-cafe-charcoal/80 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Signature Meta */}
              <div className="pt-4 border-t border-cafe-warm flex items-center gap-3 mt-auto">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-cafe-orange-light shrink-0">
                  {review.avatar.includes('http') ? (
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cafe-orange text-sm font-semibold">
                      <User size={16} />
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="truncate block font-display font-bold text-sm text-cafe-charcoal">
                      {review.name}
                    </span>
                    {review.verifiedPurchase && (
                      <ShieldCheck size={14} className="text-green-600 shrink-0" title="Verified Customer" />
                    )}
                  </div>
                  {review.drinkOrdered && (
                    <span className="truncate block text-[11px] font-mono font-semibold text-cafe-wood flex items-center gap-0.5" title="Drink Ordered">
                      <Coffee size={10} className="shrink-0" />
                      <span>{review.drinkOrdered}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
