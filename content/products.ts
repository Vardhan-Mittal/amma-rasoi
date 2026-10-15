import type { L } from "./types";

export type Size = { label: string; grams: number; price: number };

export type Product = {
  slug: string;
  name: L;
  tagline: L;
  description: L;
  rhymeId: string;
  category: "classic" | "winter" | "festival";
  sizes: Size[];
  ingredients: string[];
  shelfLife: string;
  /** family member id whose favourite this is */
  favouriteOf?: string;
  /** colours for the drawn ladoo when no real photo exists */
  art: { base: string; shade: string; speck: string; topping?: string };
};

// TODO: replace sample prices with real ones.
const std = (p250: number, p500: number, p1k: number): Size[] => [
  { label: "250 g", grams: 250, price: p250 },
  { label: "500 g", grams: 500, price: p500 },
  { label: "1 kg", grams: 1000, price: p1k },
];

export const products: Product[] = [
  {
    slug: "besan-ladoo",
    name: { en: "Besan Ladoo", hi: "बेसन लड्डू" },
    tagline: { en: "The one that started it all", hi: "जहाँ से सब शुरू हुआ" },
    description: {
      en: "Besan roasted for a full forty minutes in desi ghee — not thirty-five — until the whole house smells like Diwali. Rolled by hand, topped with pistachio.",
      hi: "देसी घी में पूरे चालीस मिनट भुना बेसन — पैंतीस नहीं — जब तक पूरा घर दिवाली जैसा न महक उठे। हाथ से बंधे, पिस्ते के साथ।",
    },
    rhymeId: "besan",
    category: "classic",
    sizes: std(220, 420, 800),
    ingredients: ["Besan (gram flour)", "Desi ghee", "Bura (powdered sugar)", "Cardamom", "Pistachio"],
    shelfLife: "15 days at room temperature",
    favouriteOf: "nitya",
    art: { base: "#E9A93A", shade: "#B9741C", speck: "#F7D27A", topping: "#7FA35B" },
  },
  {
    slug: "motichoor-ladoo",
    name: { en: "Motichoor Ladoo", hi: "मोतीचूर लड्डू" },
    tagline: { en: "Tiny pearls, big celebrations", hi: "छोटे मोती, बड़ी खुशियाँ" },
    description: {
      en: "Hundreds of tiny boondi pearls fried in ghee, soaked in saffron syrup and pressed together with melon seeds. The wedding-day ladoo.",
      hi: "घी में तली नन्ही बूंदी, केसर की चाशनी और मगज़ के साथ। शादी वाला लड्डू।",
    },
    rhymeId: "motichoor",
    category: "festival",
    sizes: std(240, 460, 880),
    ingredients: ["Besan", "Desi ghee", "Sugar", "Saffron", "Melon seeds", "Cardamom"],
    shelfLife: "7 days at room temperature",
    favouriteOf: "vardhan",
    art: { base: "#F08A24", shade: "#C2601A", speck: "#FFC56B", topping: "#F4E6C8" },
  },
  {
    slug: "gond-ladoo",
    name: { en: "Gond Ladoo", hi: "गोंद के लड्डू" },
    tagline: { en: "Amma's winter medicine", hi: "अम्मा की सर्दी की दवाई" },
    description: {
      en: "Edible gum puffed in ghee with whole wheat, dry fruits and dry ginger. Every winter posting, Sanjeev's unit waited for this parcel.",
      hi: "घी में फूला गोंद, गेहूँ का आटा, मेवे और सोंठ। हर सर्दी की पोस्टिंग पर संजीव की यूनिट इसी पार्सल का इंतज़ार करती थी।",
    },
    rhymeId: "gond",
    category: "winter",
    sizes: std(280, 540, 1040),
    ingredients: ["Gond (edible gum)", "Whole wheat flour", "Desi ghee", "Jaggery", "Almonds", "Dry ginger"],
    shelfLife: "30 days at room temperature",
    favouriteOf: "daskh",
    art: { base: "#A8692E", shade: "#6E3F18", speck: "#E2B87A", topping: "#D9C29A" },
  },
  {
    slug: "methi-ladoo",
    name: { en: "Methi Ladoo", hi: "मेथी के लड्डू" },
    tagline: { en: "A little bitter, a lot of good", hi: "थोड़ा कड़वा, बहुत फ़ायदा" },
    description: {
      en: "Fenugreek, jaggery and whole wheat roasted slowly in ghee — the ladoo Amma insists on for aching knees in winter.",
      hi: "मेथी, गुड़ और आटा, घी में धीमी आँच पर — सर्दी में घुटनों के लिए अम्मा का नुस्खा।",
    },
    rhymeId: "methi",
    category: "winter",
    sizes: std(260, 500, 960),
    ingredients: ["Fenugreek seeds", "Whole wheat flour", "Desi ghee", "Jaggery", "Gond", "Dry fruits"],
    shelfLife: "30 days at room temperature",
    favouriteOf: "pallavi",
    art: { base: "#8A5A2B", shade: "#5A3716", speck: "#C99A5E" },
  },
  {
    slug: "churma-ladoo",
    name: { en: "Churma Ladoo", hi: "चूरमा लड्डू" },
    tagline: { en: "Straight from Marwar", hi: "सीधे मारवाड़ से" },
    description: {
      en: "Coarse wheat baati crumbled warm, mixed with ghee, jaggery and poppy seeds. Best with dal-baati, perfect on its own.",
      hi: "गरम बाटी का मोटा चूरा, घी, गुड़ और खसखस के साथ।",
    },
    rhymeId: "churma",
    category: "classic",
    sizes: std(230, 440, 840),
    ingredients: ["Coarse wheat flour", "Desi ghee", "Jaggery", "Poppy seeds", "Cardamom"],
    shelfLife: "10 days at room temperature",
    favouriteOf: "ammol",
    art: { base: "#C98B3E", shade: "#8E5A22", speck: "#EED19A", topping: "#F3EAD6" },
  },
  {
    slug: "dry-fruit-ladoo",
    name: { en: "Dry Fruit Ladoo", hi: "ड्राई फ्रूट लड्डू" },
    tagline: { en: "A royal saugaat", hi: "शाही सौगात" },
    description: {
      en: "Dates, figs, cashews, almonds and pistachios — no added sugar. Nitin ji eats four at a time, so order accordingly.",
      hi: "खजूर, अंजीर, काजू, बादाम, पिस्ता — बिना चीनी। नितिन जी एक साथ चार खाते हैं।",
    },
    rhymeId: "dry-fruit",
    category: "festival",
    sizes: std(380, 740, 1440),
    ingredients: ["Dates", "Figs", "Cashews", "Almonds", "Pistachios", "Desi ghee"],
    shelfLife: "30 days at room temperature",
    favouriteOf: "paridhi",
    art: { base: "#7A3E22", shade: "#4E2412", speck: "#D9A066", topping: "#8DB060" },
  },
  {
    slug: "til-ladoo",
    name: { en: "Til Ladoo", hi: "तिल के लड्डू" },
    tagline: { en: "Til-gud khao, meetha bolo", hi: "तिल-गुड़ खाओ, मीठा बोलो" },
    description: {
      en: "Roasted sesame bound with melted jaggery — crunchy, nutty and made by the hundred every Makar Sankranti.",
      hi: "भुने तिल और पिघला गुड़ — कुरकुरे, हर मकर संक्रांति पर सैकड़ों।",
    },
    rhymeId: "til",
    category: "winter",
    sizes: std(200, 380, 720),
    ingredients: ["Sesame seeds", "Jaggery", "Desi ghee", "Peanuts", "Cardamom"],
    shelfLife: "30 days at room temperature",
    favouriteOf: "harshi",
    art: { base: "#B98A4A", shade: "#7E5A2A", speck: "#F5E6C4" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
