// Business details. Replace the placeholders before going live.
export const site = {
  name: "Amma Rasoi",
  family: "Mittal Parivaar",
  /** WhatsApp number in international format without "+" */
  whatsapp: "919346676395",
  phoneDisplay: "+91 93466 76395",
  email: "hello@ammarasoi.in",
  /** TODO: real FSSAI registration number */
  fssai: "FSSAI Reg. No. — coming soon",
  address: "Mittal Niwas, Haryana",
  deliveryNote: "Made fresh to order. Dispatched within 2 days. Pan-India delivery.",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
