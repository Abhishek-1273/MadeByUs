import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.model.js";

dotenv.config();

const products = [
  // ---------------- PENDANTS ----------------
  {
    name: "Pressed Rose Pendant",
    description: "Real pressed rose petals suspended in crystal-clear resin on a gold-plated chain.",
    price: 599, mrp: 899, category: "pendants",
    colors: ["Blush Pink", "Ivory"],
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"],
    emoji: "❋", badge: "Bestseller", inStock: true, rating: 5, reviews: 142,
  },
  {
    name: "Ocean Wave Pendant",
    description: "Swirls of blue and white resin capturing a tiny ocean — no two are alike.",
    price: 549, mrp: 749, category: "pendants",
    colors: ["Ocean Blue", "Teal"],
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80"],
    emoji: "❋", badge: "Unique", inStock: true, rating: 4, reviews: 88,
  },
  {
    name: "Golden Leaf Pendant",
    description: "Delicate gold foil flakes floating in amber-tinted resin. Elegant everyday wear.",
    price: 499, mrp: null, category: "pendants",
    colors: ["Amber", "Gold"],
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"],
    emoji: "❋", badge: null, inStock: true, rating: 5, reviews: 61,
  },

  // ---------------- EARRINGS ----------------
  {
    name: "Floral Drop Earrings",
    description: "Lightweight handpoured drops with dried baby's breath blooms inside.",
    price: 449, mrp: 649, category: "earrings",
    colors: ["White", "Lavender"],
    images: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80"],
    emoji: "✦", badge: "New", inStock: true, rating: 5, reviews: 73,
  },
  {
    name: "Marble Stud Earrings",
    description: "Minimal black-and-white marble effect studs. Goes with everything.",
    price: 349, mrp: 499, category: "earrings",
    colors: ["Black", "White"],
    images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=600&q=80"],
    emoji: "✦", badge: "Bestseller", inStock: true, rating: 4, reviews: 119,
  },
  {
    name: "Glitter Hoop Earrings",
    description: "Sparkly resin hoops with a holographic glitter finish. Catch the light.",
    price: 399, mrp: null, category: "earrings",
    colors: ["Rose Gold", "Silver"],
    images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80"],
    emoji: "✦", badge: null, inStock: false, rating: 4, reviews: 45,
  },

  // ---------------- BRACELETS ----------------
  {
    name: "Sunset Bangle",
    description: "Warm orange-to-pink gradient bangle with tiny gold flecks. Statement piece.",
    price: 699, mrp: 999, category: "bracelets",
    colors: ["Sunset Orange", "Pink"],
    images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"],
    emoji: "○", badge: "Limited", inStock: true, rating: 5, reviews: 52,
  },
  {
    name: "Forest Charm Bracelet",
    description: "Delicate beaded bracelet with a resin charm holding real moss and ferns.",
    price: 549, mrp: 699, category: "bracelets",
    colors: ["Forest Green", "Brown"],
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"],
    emoji: "○", badge: null, inStock: true, rating: 4, reviews: 38,
  },

  // ---------------- KEYCHAINS ----------------
  {
    name: "Initial Letter Keychain",
    description: "Personalised resin keychain with your initial and dried flowers. A perfect little gift.",
    price: 249, mrp: 399, category: "keychains",
    colors: ["Pink", "Blue", "Clear"],
    images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80"],
    emoji: "◈", badge: "Bestseller", inStock: true, rating: 5, reviews: 210,
  },
  {
    name: "Galaxy Keychain",
    description: "A swirling galaxy of blues, purples and glitter sealed in resin.",
    price: 299, mrp: null, category: "keychains",
    colors: ["Galaxy Blue", "Purple"],
    images: ["https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80"],
    emoji: "◈", badge: "Unique", inStock: true, rating: 5, reviews: 97,
  },

  // ---------------- COUPLE GIFTS ----------------
  {
    name: "Anniversary Love Box",
    description: "A curated box of matching resin pieces — made for two, perfect for milestones.",
    price: 1299, mrp: 1799, category: "couple-gifts",
    colors: ["Matching keychains", "Couple pendants", "Love letter card", "Gift box"],
    images: ["https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&q=80"],
    emoji: "♡", badge: "Bestseller", inStock: true, rating: 5, reviews: 64,
  },
  {
    name: "Long Distance Set",
    description: "Stay connected across miles. Matching pieces that keep you close every day.",
    price: 899, mrp: 1199, category: "couple-gifts",
    colors: ["Pinky promise pair", "Name tags", "Handwritten note"],
    images: ["https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80"],
    emoji: "∞", badge: "New", inStock: true, rating: 5, reviews: 41,
  },
  {
    name: "Valentine's Special",
    description: "Crafted with extra love. Limited availability — order early!",
    price: 749, mrp: 999, category: "couple-gifts",
    colors: ["Heart pendant", "His & hers keychains", "Rose petal charm"],
    images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"],
    emoji: "◈", badge: "Limited", inStock: true, rating: 5, reviews: 29,
  },

  // ---------------- CUSTOM ORDERS ----------------
  {
    name: "Custom Memory Frame",
    description: "Send us your dried flowers or keepsake — we preserve it forever in a resin frame.",
    price: 1499, mrp: null, category: "custom-orders",
    colors: ["Your choice"],
    images: ["https://images.unsplash.com/photo-1522313222-b7fad6e329b9?w=600&q=80"],
    emoji: "✎", badge: "Unique", inStock: true, rating: 5, reviews: 18,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // purane products hata do (sirf seed wale rahein)
    await Product.deleteMany({});
    console.log("Old products cleared.");

    const created = await Product.insertMany(products);
    console.log(`✅ ${created.length} products inserted!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seed();