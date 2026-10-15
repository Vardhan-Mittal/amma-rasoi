import type { L } from "./types";

export type Member = {
  id: string;
  name: string;
  relation: L;
  generation: "amma" | "child" | "spouse" | "grandchild";
  /** for spouses and grandchildren: which child they belong to */
  of?: string;
  emoji: string;
  memory: L;
  favourite: string; // product slug
};

// TODO: memories and favourites are placeholders — swap in the family's real ones.
export const family: Member[] = [
  { id: "amma", name: "Amma", relation: { en: "The heart of it all", hi: "सबका दिल" }, generation: "amma", emoji: "👵", memory: { en: "Jaldi karegi toh swaad bhaag jaayega. Forty minutes of bhunai, every single time.", hi: "जल्दी करेगी तो स्वाद भाग जाएगा। हर बार चालीस मिनट की भुनाई।" }, favourite: "besan-ladoo" },

  { id: "sanjeev", name: "Sanjeev", relation: { en: "Bada Beta · Indian Air Force", hi: "बड़ा बेटा · वायु सेना" }, generation: "child", emoji: "✈️", memory: { en: "At a snowy posting, my whole unit waited for Amma's Diwali parcel more than for leave.", hi: "बर्फ़ीली पोस्टिंग पर पूरी यूनिट छुट्टी से ज़्यादा अम्मा के दिवाली पार्सल का इंतज़ार करती थी।" }, favourite: "gond-ladoo" },
  { id: "pallavi", name: "Pallavi", relation: { en: "Badi Bahu", hi: "बड़ी बहू" }, generation: "spouse", of: "sanjeev", emoji: "🪔", memory: { en: "My first lesson in this house: stir the besan till your arm aches, then stir some more.", hi: "इस घर में पहला सबक़: बेसन तब तक चलाओ जब तक बाज़ू न दुखे, फिर थोड़ा और।" }, favourite: "methi-ladoo" },

  { id: "rajeev", name: "Rajeev", relation: { en: "Chhota Beta · Railways", hi: "छोटा बेटा · रेलवे" }, generation: "child", emoji: "🚂", memory: { en: "Night shifts at the station were never lonely — the tiffin always had two extra ladoos for the chaiwala.", hi: "स्टेशन की नाइट शिफ़्ट कभी अकेली नहीं थी — टिफ़िन में चायवाले के लिए दो लड्डू ज़्यादा होते थे।" }, favourite: "besan-ladoo" },
  { id: "neha", name: "Neha", relation: { en: "Chhoti Bahu", hi: "छोटी बहू" }, generation: "spouse", of: "rajeev", emoji: "🌼", memory: { en: "Amma didn't give me a recipe, she gave me the keys to the house.", hi: "अम्मा ने रेसिपी नहीं दी, घर की चाबी दी।" }, favourite: "churma-ladoo" },

  { id: "ritu", name: "Ritu", relation: { en: "Beti · Teacher", hi: "बेटी · टीचर" }, generation: "child", emoji: "📚", memory: { en: "Result day in my class means one thing: pass ho ya fail, Amma ka ladoo sabko.", hi: "मेरी क्लास में रिज़ल्ट का दिन मतलब: पास हो या फ़ेल, अम्मा का लड्डू सबको।" }, favourite: "motichoor-ladoo" },
  { id: "nitin", name: "Nitin", relation: { en: "Damad ji · Chief taster", hi: "दामाद जी · मुख्य चखने वाले" }, generation: "spouse", of: "ritu", emoji: "🎩", memory: { en: "Four at a time is not greed. It is respect for Amma's hard work.", hi: "एक साथ चार खाना लालच नहीं, अम्मा की मेहनत की इज़्ज़त है।" }, favourite: "dry-fruit-ladoo" },

  { id: "nitya", name: "Nitya", relation: { en: "Sanjeev–Pallavi ki family", hi: "संजीव–पल्लवी का परिवार" }, generation: "grandchild", of: "sanjeev", emoji: "👧", memory: { en: "First one up the kitchen shelf, every single time.", hi: "रसोई की शेल्फ़ पर सबसे पहले चढ़ना — हर बार।" }, favourite: "besan-ladoo" },
  { id: "vardhan", name: "Vardhan", relation: { en: "Sanjeev–Pallavi ki family", hi: "संजीव–पल्लवी का परिवार" }, generation: "grandchild", of: "sanjeev", emoji: "👦", memory: { en: "Motichoor crumbs on the school uniform = proof of a good morning.", hi: "स्कूल यूनिफ़ॉर्म पर मोतीचूर का चूरा = अच्छी सुबह का सबूत।" }, favourite: "motichoor-ladoo" },
  { id: "paridhi", name: "Paridhi", relation: { en: "Rajeev–Neha ki family", hi: "राजीव–नेहा का परिवार" }, generation: "grandchild", of: "rajeev", emoji: "👧", memory: { en: "Exam morning = one ladoo + one spoon of dahi. Never failed.", hi: "परीक्षा की सुबह = एक लड्डू + एक चम्मच दही। कभी फ़ेल नहीं हुआ।" }, favourite: "dry-fruit-ladoo" },
  { id: "ammol", name: "Ammol", relation: { en: "Rajeev–Neha ki family", hi: "राजीव–नेहा का परिवार" }, generation: "grandchild", of: "rajeev", emoji: "👦", memory: { en: "Ladoos hidden in the school bag — Amma always knew.", hi: "स्कूल बैग में छुपे लड्डू — अम्मा को हमेशा पता चल जाता।" }, favourite: "churma-ladoo" },
  { id: "harshi", name: "Harshi", relation: { en: "Ritu–Nitin ki family", hi: "ऋतु–नितिन का परिवार" }, generation: "grandchild", of: "ritu", emoji: "👧", memory: { en: "Sankranti on the roof: kites in one hand, til ladoo in the other.", hi: "छत पर संक्रांति: एक हाथ में पतंग, दूसरे में तिल का लड्डू।" }, favourite: "til-ladoo" },
  { id: "daskh", name: "Daskh", relation: { en: "Ritu–Nitin ki family", hi: "ऋतु–नितिन का परिवार" }, generation: "grandchild", of: "ritu", emoji: "👦", memory: { en: "The youngest. Gets the first ladoo. Always.", hi: "सबसे छोटा सदस्य। पहला लड्डू इसी का। हमेशा।" }, favourite: "gond-ladoo" },
];

export const member = (id: string) => family.find((m) => m.id === id);
export const children = family.filter((m) => m.generation === "child");
export const grandchildren = family.filter((m) => m.generation === "grandchild");
export const spouseOf = (childId: string) => family.find((m) => m.generation === "spouse" && m.of === childId);
