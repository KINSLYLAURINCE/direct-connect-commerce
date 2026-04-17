export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  available: boolean;
  features: string[];
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "memoire", name: "Mémoire de Forme", icon: "🧠", count: 6 },
  { id: "ressorts", name: "Ressorts Ensachés", icon: "🌀", count: 5 },
  { id: "latex", name: "Latex Naturel", icon: "🌿", count: 4 },
  { id: "hybride", name: "Hybride Premium", icon: "💎", count: 5 },
  { id: "orthopedique", name: "Orthopédique", icon: "🩺", count: 4 },
  { id: "enfant", name: "Enfant & Bébé", icon: "🧸", count: 3 },
];

export const products: Product[] = [
  {
    id: "mat-001",
    name: "CloudRest Mémoire 24cm",
    description: "Matelas en mousse à mémoire de forme thermosensible avec accueil moelleux et soutien ferme.",
    price: 599,
    category: "memoire",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    badge: "Best-Seller",
    available: true,
    features: ["Mémoire de forme", "Hypoallergénique", "Housse déhoussable", "Garantie 10 ans"],
    specs: { "Épaisseur": "24 cm", "Densité": "55 kg/m³", "Fermeté": "Medium", "Tailles": "90 à 200 cm" },
  },
  {
    id: "mat-002",
    name: "OrthoSpring Premium",
    description: "Matelas à ressorts ensachés indépendants pour un soutien ciblé et une indépendance de couchage parfaite.",
    price: 799,
    category: "ressorts",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    badge: "Nouveau",
    available: true,
    features: ["1 200 ressorts", "7 zones de confort", "Anti-acariens", "Coutil tencel"],
    specs: { "Épaisseur": "28 cm", "Ressorts": "1 200", "Fermeté": "Ferme", "Tailles": "140 à 200 cm" },
  },
  {
    id: "mat-003",
    name: "BioLatex Nature",
    description: "Matelas 100% latex naturel certifié, parfait pour les personnes recherchant une literie écologique.",
    price: 899,
    category: "latex",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
    available: true,
    features: ["100% Latex naturel", "Bio & Eco-Tex", "Respirant", "Anti-bactérien"],
    specs: { "Épaisseur": "22 cm", "Densité": "85 kg/m³", "Fermeté": "Medium-Ferme", "Certif.": "GOLS / Oeko-Tex" },
  },
  {
    id: "mat-004",
    name: "HybridLuxe Royal",
    description: "Matelas hybride combinant ressorts ensachés et mémoire de forme pour un confort haut de gamme.",
    price: 1299,
    category: "hybride",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    badge: "Premium",
    available: true,
    features: ["Hybride 7 zones", "Mémoire gel", "Bord renforcé", "Coutil cachemire"],
    specs: { "Épaisseur": "32 cm", "Ressorts": "1 800", "Fermeté": "Medium", "Garantie": "15 ans" },
  },
  {
    id: "mat-005",
    name: "DorsiCare Ortho",
    description: "Matelas orthopédique recommandé pour les douleurs dorsales avec soutien ferme et zones différenciées.",
    price: 749,
    category: "orthopedique",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
    available: true,
    features: ["Soutien orthopédique", "5 zones", "Anti-douleur dos", "Recommandé kiné"],
    specs: { "Épaisseur": "26 cm", "Densité": "60 kg/m³", "Fermeté": "Très ferme", "Tailles": "80 à 180 cm" },
  },
  {
    id: "mat-006",
    name: "BabyDream Confort",
    description: "Matelas bébé en mousse haute résilience, déhoussable et lavable, traité anti-acariens.",
    price: 199,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800&h=600&fit=crop",
    badge: "Bébé",
    available: true,
    features: ["Mousse HR", "Déhoussable", "Anti-acariens", "Tailles berceau"],
    specs: { "Épaisseur": "12 cm", "Densité": "25 kg/m³", "Fermeté": "Ferme", "Tailles": "60x120 / 70x140" },
  },
  {
    id: "mat-007",
    name: "ZenMemory Plus",
    description: "Matelas mémoire de forme avec gel rafraîchissant pour un sommeil tempéré toute l'année.",
    price: 699,
    category: "memoire",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    available: true,
    features: ["Gel thermorégulant", "Mémoire visco", "Housse 4 saisons", "Sans CFC"],
    specs: { "Épaisseur": "25 cm", "Densité": "60 kg/m³", "Fermeté": "Medium", "Tailles": "Toutes" },
  },
  {
    id: "mat-008",
    name: "PocketSpring Élite",
    description: "Matelas à ressorts ensachés haut de gamme avec coutil naturel et bord renforcé.",
    price: 949,
    category: "ressorts",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&h=600&fit=crop",
    badge: "Tendance",
    available: true,
    features: ["1 500 ressorts", "Coutil lin", "Bord renforcé", "5 zones"],
    specs: { "Épaisseur": "30 cm", "Ressorts": "1 500", "Fermeté": "Medium-Ferme", "Garantie": "12 ans" },
  },
  {
    id: "mat-009",
    name: "HybridFlex Pro",
    description: "Combinaison parfaite de mousse à mémoire et ressorts pour un soutien dynamique.",
    price: 1099,
    category: "hybride",
    image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&h=600&fit=crop",
    available: true,
    features: ["Hybride 5 zones", "Mémoire 5cm", "Anti-transpiration", "Déhoussable"],
    specs: { "Épaisseur": "29 cm", "Ressorts": "1 400", "Fermeté": "Medium", "Tailles": "Toutes" },
  },
  {
    id: "mat-010",
    name: "JuniorSleep Évolutif",
    description: "Matelas enfant évolutif pour lit junior, ferme et confortable, idéal de 3 à 12 ans.",
    price: 249,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
    available: true,
    features: ["Mousse HR", "Anti-acariens", "Hypoallergénique", "Déhoussable"],
    specs: { "Épaisseur": "16 cm", "Densité": "30 kg/m³", "Fermeté": "Ferme", "Tailles": "90x190 / 90x200" },
  },
  {
    id: "mat-011",
    name: "LatexComfort Pure",
    description: "Matelas latex 100% naturel avec 7 zones de confort, idéal pour les dormeurs sensibles.",
    price: 1199,
    category: "latex",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
    badge: "Eco",
    available: true,
    features: ["Latex 100% naturel", "7 zones", "Respirant", "Bio"],
    specs: { "Épaisseur": "24 cm", "Densité": "80 kg/m³", "Fermeté": "Medium", "Garantie": "15 ans" },
  },
  {
    id: "mat-012",
    name: "ChiroSupport Plus",
    description: "Matelas orthopédique extra-ferme conçu avec des kinésithérapeutes pour soulager le dos.",
    price: 999,
    category: "orthopedique",
    image: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=800&h=600&fit=crop",
    available: false,
    features: ["Extra-ferme", "Soutien lombaire", "Anti-affaissement", "Recommandé kiné"],
    specs: { "Épaisseur": "28 cm", "Densité": "65 kg/m³", "Fermeté": "Extra-ferme", "Tailles": "Toutes" },
  },
];

export const teamMembers = [
  { name: "Sophie Martin", role: "PDG & Fondatrice", description: "15 ans d'expertise dans la literie haut de gamme et le bien-être.", linkedin: "#" },
  { name: "Julien Durand", role: "Directeur Production", description: "Spécialiste des mousses et ressorts. Ancien Bultex.", linkedin: "#" },
  { name: "Aïcha Bensaïd", role: "Responsable Qualité", description: "Garante des certifications Oeko-Tex et écologiques.", linkedin: "#" },
  { name: "David Rodriguez", role: "Directeur Commercial", description: "Plus de 50M€ générés dans la literie premium.", linkedin: "#" },
];

export const stats = [
  { label: "Clients Satisfaits", value: 25000, suffix: "+" },
  { label: "Modèles de Matelas", value: 27, suffix: "" },
  { label: "Note Moyenne", value: 4.9, suffix: "/5" },
  { label: "Livraison Express", value: 48, suffix: "h" },
];

export const trustBadges = [
  "Oeko-Tex Certifié",
  "Made in France",
  "100 Nuits d'Essai",
  "Livraison Offerte",
  "Garantie 10 ans",
  "Paiement Sécurisé",
];
