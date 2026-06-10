import React, { useState } from 'react';
import { MenuItem, OrderCartItem } from '../types';
import { X, Calendar, Clock, ShoppingCart, Trash2, ArrowRight, Check, Smile, Clipboard, Copy } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface OrderSimulatorProps {
  cart: OrderCartItem[];
  setCart: React.Dispatch<React.SetStateAction<OrderCartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  onProceedToOrderTab: () => void;
}

export default function OrderSimulator({
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
  customizingItem,
  setCustomizingItem,
  onProceedToOrderTab
}: OrderSimulatorProps) {
  // Modal customization states
  const [size, setSize] = useState<'16oz' | '20oz' | 'Standard'>('16oz');
  const [iceLevel, setIceLevel] = useState<'No Ice' | 'Less' | 'Regular' | 'Extra'>('Regular');
  const [sweetness, setSweetness] = useState<'None (0%)' | 'Less (50%)' | 'Regular (100%)' | 'Extra (120%)'>('Regular (100%)');
  const [milkOption, setMilkOption] = useState<'Whole Milk' | 'Oat Milk (+ $0.75)' | 'Almond Milk (+ $0.75)' | 'No Milk'>('Whole Milk');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Checkout flows
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 15 minutes');
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Set default settings if item changes
  React.useEffect(() => {
    if (customizingItem) {
      if (customizingItem.category === 'pastries' || customizingItem.category === 'desserts') {
        setSize('Standard');
        setMilkOption('No Milk');
      } else {
        setSize('16oz');
        setMilkOption('Whole Milk');
      }
      setIceLevel('Regular');
      setSweetness('Regular (100%)');
      setNotes('');
      setQuantity(1);
    }
  }, [customizingItem]);

  // Pricing calculations
  const calculateItemPrice = (item: MenuItem): number => {
    let price = item.price;
    if (size === '20oz') price += 0.75;
    if (milkOption.includes('Oat Milk') || milkOption.includes('Almond Milk')) price += 0.75;
    return price;
  };

  const handleAddToCart = () => {
    if (!customizingItem) return;

    const basePrice = calculateItemPrice(customizingItem);
    const cartEntryId = `${customizingItem.id}-${size}-${iceLevel}-${sweetness}-${milkOption}-${notes}`;

    const existingIndex = cart.findIndex(c => c.id === cartEntryId);

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newCartItem: OrderCartItem = {
        id: cartEntryId,
        item: customizingItem,
        quantity,
        size,
        iceLevel: customizingItem.category === 'pastries' || customizingItem.category === 'desserts' ? undefined : iceLevel,
        sweetness: customizingItem.category === 'pastries' || customizingItem.category === 'desserts' ? undefined : sweetness,
        milkOption: customizingItem.category === 'pastries' || customizingItem.category === 'desserts' ? undefined : milkOption,
        notes: notes.trim() || undefined,
        priceAtOrder: basePrice
      };
      setCart([...cart, newCartItem]);
    }

    setCustomizingItem(null);
    setIsCartOpen(true); // open cart to show status
  };

  const removeItem = (entryId: string) => {
    setCart(cart.filter(item => item.id !== entryId));
  };

  const updateQuantity = (entryId: string, amount: number) => {
    const updated = cart.map(item => {
      if (item.id === entryId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(updated);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.priceAtOrder * item.quantity), 0);
  const tax = subtotal * 0.06; // Suwanee Georgia tax ~6%
  const total = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill out your name and telephone number.');
      return;
    }

    const orderId = `OC-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptData = {
      orderId,
      customerName,
      customerPhone,
      pickupTime,
      items: [...cart],
      subtotal,
      tax,
      total,
      timeOfOrder: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setActiveReceipt(receiptData);
    setCart([]); // clear cart
    setIsCheckoutOpen(false);
  };

  const copyReceiptCode = () => {
    if (activeReceipt) {
      navigator.clipboard.writeText(activeReceipt.orderId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      {/* 1. Item Customization Modal Overlay */}
      {customizingItem && (
        <div 
          id="customizer-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setCustomizingItem(null)}
        >
          <div 
            className="bg-white rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col md:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image and dismiss */}
            <div className="relative aspect-[16/9] w-full bg-cafe-warm overflow-hidden">
              <img 
                src={customizingItem.image} 
                alt={customizingItem.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                id="customizer-close"
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/75 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              
              {/* Item Info Header */}
              <div>
                <h3 className="font-display font-black text-2xl text-cafe-charcoal leading-none mb-1.5">
                  {customizingItem.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cafe-charcoal/70 leading-relaxed">
                  {customizingItem.description}
                </p>
              </div>

              {/* Customizing options list */}
              <div className="space-y-5 border-t border-cafe-orange/10 pt-5">
                
                {/* Size Selector (only applicable to drinks, coffee, matcha, milk-tea) */}
                {customizingItem.category !== 'pastries' && customizingItem.category !== 'desserts' && (
                  <div className="space-y-2">
                    <span className="block font-display font-bold text-xs uppercase tracking-wider text-cafe-charcoal/65">
                      Select Drink Size
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        id="customizer-size-16"
                        type="button"
                        onClick={() => setSize('16oz')}
                        className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all ${
                          size === '16oz' 
                            ? 'bg-cafe-orange text-white border-cafe-orange shadow-md' 
                            : 'bg-cafe-warm border-transparent text-cafe-charcoal/80 hover:bg-cafe-orange-light'
                        }`}
                      >
                        16 oz (Regular)
                      </button>
                      <button
                        id="customizer-size-20"
                        type="button"
                        onClick={() => setSize('20oz')}
                        className={`py-3 rounded-2xl font-mono text-sm font-bold border transition-all ${
                          size === '20oz' 
                            ? 'bg-cafe-orange text-white border-cafe-orange shadow-md' 
                            : 'bg-cafe-warm border-transparent text-cafe-charcoal/80 hover:bg-cafe-orange-light'
                        }`}
                      >
                        20 oz (+ $0.75)
                      </button>
                    </div>
                  </div>
                )}

                {/* Milk Selector (applicable to coffee, matcha, milk-tea) */}
                {customizingItem.category !== 'pastries' && customizingItem.category !== 'desserts' && (
                  <div className="space-y-2">
                    <span className="block font-display font-bold text-xs uppercase tracking-wider text-cafe-charcoal/65">
                      Milk Preference
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Whole Milk', 'Oat Milk (+ $0.75)', 'Almond Milk (+ $0.75)'] as const).map((m) => (
                        <button
                          id={`customizer-milk-${m.toLowerCase().split(' ')[0]}`}
                          key={m}
                          type="button"
                          onClick={() => setMilkOption(m)}
                          className={`p-2.5 rounded-xl font-sans text-[11px] font-bold border leading-tight transition-all text-center ${
                            milkOption === m 
                              ? 'bg-cafe-orange text-white border-cafe-orange shadow-sm' 
                              : 'bg-cafe-warm border-transparent text-cafe-charcoal/80 hover:bg-cafe-orange-light'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ice Level Selector */}
                {customizingItem.category !== 'pastries' && customizingItem.category !== 'desserts' && (
                  <div className="space-y-2">
                    <span className="block font-display font-bold text-xs uppercase tracking-wider text-cafe-charcoal/65">
                      Ice Level
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {(['No Ice', 'Less', 'Regular', 'Extra'] as const).map((ice) => (
                        <button
                          id={`customizer-ice-${ice.toLowerCase().split(' ')[0]}`}
                          key={ice}
                          type="button"
                          onClick={() => setIceLevel(ice)}
                          className={`py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                            iceLevel === ice 
                              ? 'bg-cafe-orange text-white border-cafe-orange shadow-sm' 
                              : 'bg-cafe-warm border-transparent text-cafe-charcoal/80 hover:bg-cafe-orange-light'
                          }`}
                        >
                          {ice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetness Selector */}
                {customizingItem.category !== 'pastries' && customizingItem.category !== 'desserts' && (
                  <div className="space-y-2">
                    <span className="block font-display font-bold text-xs uppercase tracking-wider text-cafe-charcoal/65">
                      Sweetness Level
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {(['None (0%)', 'Less (50%)', 'Regular (100%)', 'Extra (120%)'] as const).map((sweet) => (
                        <button
                          id={`customizer-sweet-${sweet.toLowerCase().split(' ')[0]}`}
                          key={sweet}
                          type="button"
                          onClick={() => setSweetness(sweet)}
                          className={`py-2 rounded-xl font-mono text-[10px] font-bold border leading-tight transition-all ${
                            sweetness === sweet 
                              ? 'bg-cafe-orange text-white border-cafe-orange shadow-sm' 
                              : 'bg-cafe-warm border-transparent text-cafe-charcoal/80 hover:bg-cafe-orange-light'
                          }`}
                        >
                          {sweet.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special customization notes */}
                <div className="space-y-2">
                  <span className="block font-display font-bold text-xs uppercase tracking-wider text-cafe-charcoal/65">
                    Special Instructions
                  </span>
                  <input
                    id="customizer-special-notes"
                    type="text"
                    placeholder="e.g. Extra hot, splash of honey, no lid please..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-cafe-warm text-sm text-cafe-charcoal focus:outline-none focus:ring-1 focus:ring-cafe-orange"
                  />
                </div>

                {/* Quantity and dynamic price bottom bar */}
                <div className="flex items-center justify-between pt-4 border-t border-cafe-orange/10">
                  <div className="space-y-1">
                    <span className="block font-display text-xs text-cafe-charcoal/50 uppercase leading-none">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        id="customizer-qty-minus"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-full bg-cafe-warm flex items-center justify-center font-bold text-cafe-charcoal hover:bg-cafe-orange-light hover:text-cafe-orange transition-colors"
                      >
                        -
                      </button>
                      <span className="font-mono font-extrabold text-sm text-cafe-charcoal">{quantity}</span>
                      <button
                        id="customizer-qty-plus"
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-8 h-8 rounded-full bg-cafe-warm flex items-center justify-center font-bold text-cafe-charcoal hover:bg-cafe-orange-light hover:text-cafe-orange transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block font-mono text-[10px] uppercase text-cafe-charcoal/50 leading-none">Total Price</span>
                    <span className="block font-mono text-2xl font-black text-cafe-orange">
                      ${(calculateItemPrice(customizingItem) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Footer adding trigger */}
            <div className="p-6 border-t border-cafe-warm">
              <button
                id="customizer-add-btn"
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-bold text-base shadow-lg shadow-cafe-orange/20 transition-all cursor-pointer active:scale-95 duration-200"
              >
                Add {quantity} to Order Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Shopping Cart Responsive Drawer (Sidebar Overlay) */}
      {isCartOpen && (
        <div 
          id="cart-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-cafe-cream h-full shadow-2xl flex flex-col justify-between animate-slideLeft border-l border-cafe-orange/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header details */}
            <div className="p-6 border-b border-cafe-orange/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-cafe-orange" />
                <h3 className="font-display font-bold text-xl text-cafe-charcoal">
                  My Ordering Basket
                </h3>
              </div>
              <button
                id="cart-drawer-close"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-cafe-orange-light text-cafe-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items Column content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    id={`cart-item-${item.id}`}
                    key={item.id}
                    className="p-4 bg-white border border-cafe-orange/5 rounded-2xl flex gap-3 shadow-xs hover:border-cafe-orange/20 duration-200 transition-all items-start"
                  >
                    <img
                      src={item.item.image}
                      alt={item.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-cafe-warm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-display font-bold text-sm text-cafe-charcoal truncate">
                        {item.item.name}
                      </h4>
                      
                      {/* Specifications list */}
                      <div className="font-mono text-[9px] text-cafe-charcoal/60 leading-tight space-y-0.5">
                        <span className="block">Size: {item.size}</span>
                        {item.milkOption && <span className="block">Milk: {item.milkOption}</span>}
                        {item.iceLevel && <span className="block">Ice: {item.iceLevel}</span>}
                        {item.sweetness && <span className="block">Sweet: {item.sweetness}</span>}
                        {item.notes && <span className="block truncate text-cafe-wood">Note: "{item.notes}"</span>}
                      </div>

                      {/* Controls and pricing */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <button
                            id={`cart-qty-minus-${item.id}`}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-cafe-warm flex items-center justify-center font-mono text-xs font-semibold hover:bg-cafe-orange-light hover:text-cafe-orange transition-colors"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold text-cafe-charcoal">{item.quantity}</span>
                          <button
                            id={`cart-qty-plus-${item.id}`}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-cafe-warm flex items-center justify-center font-mono text-xs font-semibold hover:bg-cafe-orange-light hover:text-cafe-orange transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono font-extrabold text-sm text-cafe-orange">
                          ${(item.priceAtOrder * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Trash remove item */}
                    <button
                      id={`cart-remove-${item.id}`}
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-cafe-charcoal/40 hover:text-red-500 hover:bg-red-50 duration-200 shrink-0"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <ShoppingCart size={40} className="mx-auto text-cafe-orange/20 mb-3 animate-bounce" />
                  <p className="font-display font-bold text-sm text-cafe-charcoal/70">Your cart is empty</p>
                  <p className="font-sans text-xs text-cafe-charcoal/50 mt-1 max-w-xs mx-auto">
                    Go browse Suwanee's favorite lattes and desserts and add them here!
                  </p>
                  <button
                    id="cart-back-to-menu"
                    onClick={() => {
                      setIsCartOpen(false);
                      onProceedToOrderTab();
                    }}
                    className="mt-6 px-4 py-2 rounded-lg bg-cafe-orange-light text-cafe-orange font-display font-semibold text-xs border border-cafe-orange/20"
                  >
                    View Menu Items
                  </button>
                </div>
              )}
            </div>

            {/* Sticky subtotal values and trigger checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-cafe-orange/10 bg-white space-y-4">
                <div className="space-y-1.5 font-mono text-xs text-cafe-charcoal/70">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (GA 6%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-cafe-warm pt-2 text-sm font-bold text-cafe-charcoal">
                    <span>Pick-up Total</span>
                    <span className="text-cafe-orange text-lg font-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-btn"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 rounded-2xl bg-cafe-orange hover:bg-cafe-charcoal text-white font-display font-bold text-base shadow-lg shadow-cafe-orange/15 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Proceed to pickup details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Checkout Modal details (Customer Info collection) */}
      {isCheckoutOpen && (
        <div 
          id="checkout-modal"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div 
            className="bg-white rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-cafe-orange/10 pb-4">
              <div>
                <span className="block font-mono text-[9px] text-cafe-orange font-bold uppercase tracking-wider">
                  Dine-in or Pick-up Order
                </span>
                <h3 className="font-display font-bold text-2xl text-cafe-charcoal">
                  Simulated Checkout
                </h3>
              </div>
              <button
                id="checkout-close"
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 rounded-full hover:bg-cafe-orange-light text-cafe-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Pick-up Name</label>
                <input
                  id="checkout-form-name"
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 text-sm text-cafe-charcoal outline-none focus:ring-1 focus:ring-cafe-orange"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Telephone Number</label>
                <input
                  id="checkout-form-phone"
                  type="tel"
                  required
                  placeholder="e.g. (470) 555-0192"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 text-sm text-cafe-charcoal outline-none focus:ring-1 focus:ring-cafe-orange"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cafe-charcoal/70">Estimated Pick-up Time</label>
                <select
                  id="checkout-form-pickup-time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cafe-warm border border-cafe-orange/10 text-sm text-cafe-charcoal outline-none focus:ring-1 focus:ring-cafe-orange"
                >
                  <option value="In 10 minutes">In 10 minutes (ASAP)</option>
                  <option value="In 20 minutes">In 20 minutes</option>
                  <option value="In 40 minutes">In 40 minutes</option>
                  <option value="In 1 hour">In 1 hour</option>
                  <option value="Schedule Later today">Schedule Later today</option>
                </select>
              </div>

              {/* Order summary small row */}
              <div className="p-4 bg-cafe-warm/40 border border-cafe-orange/10 rounded-2xl font-mono text-xs text-cafe-charcoal/80 space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Grand Total (With Tax):</span>
                  <span className="text-base text-cafe-orange font-black">${total.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-cafe-charcoal/50 leading-tight">
                  *This simulates routing your order to our Suwanee espresso deck queue. Pay with Apple Pay or credit card at our barista bar register upon arrival!
                </div>
              </div>

              {/* Submit trigger */}
              <button
                id="checkout-submit"
                type="submit"
                className="w-full py-4 rounded-2xl bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-extrabold text-base shadow-lg shadow-cafe-orange/15 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={18} className="stroke-[3]" />
                <span>Submit Pickup Order</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Receipt Screen celebration */}
      {activeReceipt && (
        <div 
          id="receipt-modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setActiveReceipt(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 space-y-6 text-center border-t-8 border-cafe-orange"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Smile icon */}
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <Smile size={32} className="stroke-[2.5]" />
            </div>

            {/* Main Header message */}
            <div className="space-y-1.5">
              <h3 className="font-display font-extrabold text-2xl text-cafe-charcoal leading-none">
                Order Sent to Barista!
              </h3>
              <p className="font-sans text-sm text-cafe-charcoal/70">
                Hi, <strong className="text-cafe-charcoal">{activeReceipt.customerName}</strong>! Your warm coffee order has been queued successfully.
              </p>
            </div>

            {/* Receipt container box */}
            <div className="bg-cafe-warm text-left p-6 rounded-3xl border border-dashed border-cafe-orange/20 font-mono text-xs text-cafe-charcoal/90 space-y-4">
              
              {/* Receipt Header details */}
              <div className="border-b border-dashed border-cafe-orange/20 pb-3 flex justify-between items-center text-[10px] text-cafe-charcoal/60 uppercase">
                <div>
                  <span className="block font-bold">Orange Coffee Suwanee</span>
                  <span className="block leading-none mt-0.5">3890 Lawrenceville-Suwanee Rd</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold">Ticket: {activeReceipt.orderId}</span>
                  <span className="block mt-0.5">{activeReceipt.timeOfOrder}</span>
                </div>
              </div>

              {/* Items Detail */}
              <div className="space-y-3">
                {activeReceipt.items.map((cartItem: any) => (
                  <div key={cartItem.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold">{cartItem.quantity}x {cartItem.item.name}</span>
                      <span className="block text-[10px] text-cafe-charcoal/60 lowercase italic leading-none pl-3 mt-0.5">
                        ({cartItem.size}, {cartItem.milkOption})
                      </span>
                    </div>
                    <span className="font-bold">${(cartItem.priceAtOrder * cartItem.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Subtotal table details */}
              <div className="border-t border-dashed border-cafe-orange/20 pt-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${activeReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (GA 6%):</span>
                  <span>${activeReceipt.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-cafe-charcoal border-t border-cafe-orange/10 pt-1.5">
                  <span>Grand Total due:</span>
                  <span className="text-cafe-orange">${activeReceipt.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup timing metadata info */}
              <div className="bg-white p-3 rounded-xl text-[10.5px] leading-relaxed border border-cafe-orange/5 text-cafe-charcoal/70">
                <span className="block font-bold text-cafe-orange uppercase tracking-wider text-[9px] mb-1">Pick-up Instructions</span>
                Your items will be ready at our Suwanee pickup deck <strong className="text-cafe-charcoal">{activeReceipt.pickupTime}</strong>. Please mention Ticket <strong className="text-cafe-orange">#{activeReceipt.orderId}</strong> to the register barista. See you soon!
              </div>

            </div>

            {/* Quick action button copy code */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="receipt-copy-code"
                onClick={copyReceiptCode}
                className="flex-1 py-3 border border-cafe-orange/25 hover:bg-cafe-orange-light text-cafe-charcoal font-display font-bold text-sm rounded-xl flex items-center justify-center gap-2 duration-150 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check size={16} className="text-green-600 stroke-[2.5]" />
                    <span className="text-green-700">Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Ticket ID</span>
                  </>
                )}
              </button>

              <button
                id="receipt-close-btn"
                onClick={() => setActiveReceipt(null)}
                className="flex-1 py-3 bg-cafe-orange hover:bg-cafe-orange-dark text-white font-display font-black text-sm rounded-xl shadow-md transition-shadow"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
