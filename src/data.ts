import { MenuItem, Review, GalleryImage } from './types';

export const BUSINESS_INFO = {
  name: "Orange Coffee Suwanee",
  address: "3890 Lawrenceville-Suwanee Rd, Suwanee, GA 30024",
  phone: "(470) 266-1113",
  email: "hello@orangecoffeesuwanee.com",
  services: ["Dine-in", "Takeout", "Contactless Pickup", "Delivery (DoorDash, UberEats)"],
  atmosphere: "Warm Korean-style café with comfortable, spacious seating, modern timber décor, bright lighting, free high-speed Wi-Fi, and a friendly, welcoming team.",
  hours: [
    { days: "Monday - Friday", time: "7:30 AM - 8:30 PM" },
    { days: "Saturday", time: "8:00 AM - 9:00 PM" },
    { days: "Sunday", time: "8:30 AM - 8:00 PM" }
  ],
  socials: {
    instagram: "https://instagram.com/orangecoffee.suwanee",
    facebook: "https://facebook.com/orangecoffeesuwanee",
    tiktok: "https://tiktok.com/@orangecoffeesuwanee"
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // --- Matcha Drinks ---
  {
    id: "matcha-strawberry",
    name: "Matcha Cream Strawberry Latte",
    description: "Our #1 best-seller. House-made strawberry puree layered with silky-smooth whole milk, topped with a velvety layer of premium hand-whisked Uji matcha cold cream. Perfect balance of sweet, fruity, and earthy.",
    price: 6.75,
    category: "matcha",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80",
    tags: ["Signature", "Korean-Style", "Ice Only"],
    popular: true,
    isCustomizable: true
  },
  {
    id: "matcha-einspanner",
    name: "Matcha Einspänner",
    description: "Traditional iced ceremonial matcha latte crowned with a generous layer of our signature house-made sweet milk cream and dusted with fine matcha powder.",
    price: 6.25,
    category: "matcha",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80",
    tags: ["Signature", "Sweet Cream", "Aesthetic"],
    popular: true,
    isCustomizable: true
  },
  {
    id: "matcha-lavender",
    name: "Iced Lavender Matcha Latte",
    description: "Premium Uji matcha combined with organic lavender blossom syrup and creamy oat milk, offering a soothing, aromatic twist to your daily matcha.",
    price: 6.45,
    category: "matcha",
    image: "https://images.unsplash.com/photo-1595180908892-e42bc5b4cbfe?w=600&auto=format&fit=crop&q=80",
    tags: ["Aromatic", "Oat Milk Preferred"],
    popular: false,
    isCustomizable: true
  },

  // --- Specialty Coffee ---
  {
    id: "tiramisu-latte",
    name: "Tiramisu Latte",
    description: "Espresso and creamy milk infused with a luxury Hungarian hazelnut & dark chocolate blend, crowned with a thick layer of Italian mascarpone cream cheese whip and heavy cocoa powder dusting.",
    price: 6.50,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80",
    tags: ["Signature", "Dessert Latte", "Hot or Iced"],
    popular: true,
    isCustomizable: true
  },
  {
    id: "einspanner-classic",
    name: "Classic Korean Einspänner",
    description: "Rich, bold double-shot espresso topped with a thick, velvety layer of hand-whipped sweet vanilla cream. Crafted in the authentic Seoul-style café tradition. Sip directly, do not stir!",
    price: 5.95,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=80",
    tags: ["Signature", "Seoul Style", "Strong"],
    popular: true,
    isCustomizable: true
  },
  {
    id: "spanish-latte",
    name: "Sweet Spanish Condensed Latte",
    description: "Double-shot espresso pulled over sweet condensed milk and steamed whole milk, creating a velvety, rich caramelized espresso experience.",
    price: 5.75,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=600&auto=format&fit=crop&q=80",
    tags: ["Sweet", "Silky"],
    popular: false,
    isCustomizable: true
  },
  {
    id: "orange-espresso-tonic",
    name: "Orange Espresso Tonic",
    description: "A sparkling, refreshingly bittersweet combination of premium chilled tonic water, organic cold-pressed Florida orange juice, and a floated double-shot of our signature espresso. Pure citrus caffeine magic.",
    price: 6.25,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    tags: ["New", "Citrus", "Iced Only"],
    popular: true,
    isCustomizable: true
  },

  // --- Milk Teas ---
  {
    id: "brown-sugar-boba",
    name: "Brown Sugar Boba Crème Milk",
    description: "Traditional slow-cooked brown sugar tapioca pearls caramelized in sweet 'tiger' syrup, combined with creamy organic milk and topped with cheese mousse caramel foam.",
    price: 5.95,
    category: "milk-tea",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80",
    tags: ["House-made Boba", "Chewy", "Sweet"],
    popular: true,
    isCustomizable: true
  },
  {
    id: "taro-milk-tea",
    name: "Velvet Taro Milk Tea",
    description: "Real taro root paste roasted for sweet nutty flavor, blended into lactose-free milk tea for a creamy purple comfort beverage.",
    price: 5.75,
    category: "milk-tea",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    tags: ["Rich Flavor", "Caffeine-Free Options"],
    popular: false,
    isCustomizable: true
  },
  {
    id: "jasmine-green-tea",
    name: "Jasmine Green Milk Tea",
    description: "Fragrant loose-leaf jasmine blossoms cold-steeped in milk tea, offering a refreshing floral and light energy boost.",
    price: 5.45,
    category: "milk-tea",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80",
    tags: ["Floral", "Refreshing"],
    popular: false,
    isCustomizable: true
  },

  // --- Pastries ---
  {
    id: "croissant-butter",
    name: "Golden Butter Croissant",
    description: "Classic French-style butter croissant baked fresh daily. Incredibly flaky, crispy on the outer shell, with beautiful airy layers of local butter inside.",
    price: 3.95,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    tags: ["Baked Daily", "Flaky"],
    popular: true,
    isCustomizable: false
  },
  {
    id: "strawberry-croissant",
    name: "Strawberry Chantilly Croissant",
    description: "Freshly split butter croissant stuffed with rich vanilla Chantilly whipped cream and arranged with sweet, ripe GA strawberry slices under powdered sugar.",
    price: 5.95,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
    tags: ["Signature", "Fruity", "Must Try"],
    popular: true,
    isCustomizable: false
  },
  {
    id: "croffle-original",
    name: "Korean Sweet Croffle",
    description: "Our signature croissant waffle pressed till caramelized and golden, brushed with local honey syrup and lightly dusted with cinnamon sugar. Warm and chewy.",
    price: 4.95,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    tags: ["Seoul Sensation", "Warm & Chewy"],
    popular: true,
    isCustomizable: false
  },

  // --- Desserts ---
  {
    id: "macaron-set",
    name: "Signature Macaron Gift Box (3pcs)",
    description: "Assorted delicate Parisian-style macarons with soft, chewy shells and indulgent fillings. Includes Matcha-White Chocolate, Salted Caramel, and Raspberry Rose.",
    price: 8.50,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop&q=80",
    tags: ["Gift Box", "Colorful", "Gluten-Free"],
    popular: true,
    isCustomizable: false
  },
  {
    id: "tiramisu-cake",
    name: "House Espress-O Tiramisu Cake",
    description: "Ladyfingers soaked in our award-winning cold brew espresso, layered with rich whipped mascarpone sabayon cream, and dusted heavily with premium dark chocolate.",
    price: 7.25,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80",
    tags: ["Decadent", "House-made"],
    popular: false,
    isCustomizable: false
  },
  {
    id: "earl-grey-burnt-cheesecake",
    name: "Earl Grey Burnt Basque Cheesecake",
    description: "A rich, gooey basque cheesecake infused with fine organic Earl Grey tea leaves, featuring a dark caramelized top and ultra-creamy pudding-like center.",
    price: 7.95,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=600&auto=format&fit=crop&q=80",
    tags: ["Best-Seller", "Creamy", "Floral Notes"],
    popular: true,
    isCustomizable: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Sarah Kim",
    rating: 5,
    comment: "This is hands-down the best Korean-style café in the Gwinnett/Suwanee area! The Matcha Cream Strawberry Latte is pure perfection—so creamy and not overly sweet. The space is huge with plenty of warm wood seating, perfect for studying or catching up with friends. Very friendly owners too!",
    date: "June 2, 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    drinkOrdered: "Matcha Cream Strawberry Latte",
    verifiedPurchase: true
  },
  {
    id: "r2",
    name: "David Miller",
    rating: 5,
    comment: "Wow. If you want a real, high-quality sweet coffee, get the Tiramisu Latte. It feels like drinking silk. The foam on top has actual mascarpone and is delicious. Oh, and you HAVE to try their Croffles. Crispy on the outside and wonderfully chewy. They have excellent Wi-Fi too, very remote-work friendly.",
    date: "May 28, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    drinkOrdered: "Tiramisu Latte & Original Croffle",
    verifiedPurchase: true
  },
  {
    id: "r3",
    name: "Chloe Chen",
    rating: 5,
    comment: "So aesthetic! Everything is modern, clean, and decorated with warm orange accents. I ordered the Matcha Einspänner and Macarons. The green matches beautifully with the orange plates, and the flavor is top-grade Uji matcha. suwanee really needed a modern spot like this.",
    date: "May 15, 2026",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    drinkOrdered: "Matcha Einspänner & Specialty Macarons",
    verifiedPurchase: true
  },
  {
    id: "r4",
    name: "Marcus Ramirez",
    rating: 5,
    comment: "The Orange Espresso Tonic is incredible! I was skeptical but the sparkling tonic combined with local citrus juice and espresso is the ultimate morning boost. Fast service, extremely clean restrooms, and ample parking outside.",
    date: "April 30, 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    drinkOrdered: "Orange Espresso Tonic",
    verifiedPurchase: true
  },
  {
    id: "r5",
    name: "Min-Ji Park",
    rating: 5,
    comment: "Reminds me exactly of the minimalist, cozy cafes in Hongdae, Seoul. Incredible attention to detail in the drinks. The strawberry puree tastes organic and freshly made on site. Staff always welcomes you with a warm smile. A gems place in Suwanee!",
    date: "April 11, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    drinkOrdered: "Strawberry Chantilly Croissant",
    verifiedPurchase: true
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    alt: "Spacious seating area with natural wood tones and cozy orange accents",
    category: "interior"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80",
    alt: "Beautiful layered Matcha Cream Strawberry Latte in glass cup",
    category: "drinks"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    alt: "Flaky freshly-baked Golden Croissants piled high on display",
    category: "pastries"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    alt: "Cozy café lighting and minimal wooden tables at sunset",
    category: "interior"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80",
    alt: "Tiramisu Espresso Cold Whipped Latte with cocoa powder dusting",
    category: "drinks"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=80",
    alt: "A colorful selection of delicate French Macarons",
    category: "pastries"
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80",
    alt: "Modern espresso bar with premium espresso machines and coffee beans",
    category: "interior"
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80",
    alt: "Matcha Einspänner under soft accent lighting",
    category: "drinks"
  }
];
