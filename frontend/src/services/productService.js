import { API_URL } from "../config";

// Backend ke category-wise default colors (mockData wale bg/accent ki jagah)
const CATEGORY_STYLE = {
  "pendants":      { bg: "#F5ECED", accent: "#C4707A" },
  "earrings":      { bg: "#E8F2F5", accent: "#5A8FA0" },
  "bracelets":     { bg: "#F5F4F0", accent: "#B8965A" },
  "keychains":     { bg: "#F5ECED", accent: "#C4707A" },
  "couple-gifts":  { bg: "#F5F2E8", accent: "#B8965A" },
  "custom-orders": { bg: "#EEEAF5", accent: "#7B68C8" },
};

// Backend product → frontend (ProductCard) shape
function normalize(p) {
  const style = CATEGORY_STYLE[p.category] || { bg: "#F5F4F0", accent: "#B8965A" };
  return {
    id:       p._id,
    name:     p.name,
    desc:     p.description,        // backend: description → frontend: desc
    price:    p.price,
    mrp:      p.mrp ?? null,
    category: p.category,
    colors:   p.colors || [],
    images:   p.images || [],       // Cloudinary URLs
    rating:   p.rating || 0,
    reviews:  p.reviews || 0,
    inStock:  p.inStock,
    badge:    p.badge || null,
    emoji:    p.emoji || "🌸",
    bg:       style.bg,
    accent:   style.accent,
  };
}

// Saare active products (optional category filter)
export async function getProducts(category) {
  const url = category && category !== "all"
    ? `${API_URL}/products?category=${category}`
    : `${API_URL}/products`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Products load nahi ho paaye");

  const data = await res.json();
  return (data.products || []).map(normalize);
}