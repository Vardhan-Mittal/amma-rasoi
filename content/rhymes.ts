import type { Rhyme } from "./types";

// Every rhyme on the site lives here, so the family can edit them in one place.
const list: Rhyme[] = [
  { id: "hero", lines: ["Ghee ki khushboo, besan ka rang,", "Amma ke ladoo, pyaar ke sang."], meaning: "The scent of ghee, the colour of besan — Amma's ladoos come wrapped in love." },
  { id: "bridge", lines: ["Bete karein desh ki seva,", "Amma bheje ladoo ka mewa."], meaning: "The sons serve the nation; Amma sends them ladoos as their reward." },
  { id: "ch1", lines: ["Beta chala aasmaan ki ore,", "Dabbe mein baandhi mamta ki dor."], meaning: "The son set off for the skies; Amma tied a mother's love into the dabba." },
  { id: "ch2", lines: ["Chhuk-chhuk rail, lambi raat,", "Tiffin mein Amma ke ladoo saath."], meaning: "A chugging train, a long night — and Amma's ladoos in the tiffin." },
  { id: "ch3", lines: ["Do bahuein aayi, ghar mein bahaar,", "Amma ne sikhaya — bhunai mein pyaar."], meaning: "Two daughters-in-law brought spring home; Amma taught them that love is in the roasting." },
  { id: "ch4a", lines: ["Doli mein beti, aankhon mein paani,", "Saath gaya dabba, aur Amma ki kahani."], meaning: "The daughter in the doli, tears in every eye — with her went a dabba, and Amma's story." },
  { id: "ch4b", lines: ["Ek kitaab, ek chalk, ek dabba saath,", "Teacher Didi baante Amma ki saugaat."], meaning: "A book, a chalk and a dabba — Teacher Didi shares Amma's gift." },
  { id: "ch4c", lines: ["Jamai Raja aaye, khaali haath na jaaye,", "Amma ke ladoo chaar-chaar ek saath khaaye!"], meaning: "When the son-in-law visits he never leaves empty-handed — he eats four ladoos at a time!" },
  { id: "ch5", lines: ["Ek, do, teen, chaar, paanch aur chhe,", "Chhe chhote chor, ladoo le ke bhaage re!", "Upar wali shelf pe dabba chhupaya,", "Phir bhi Amma ne hans ke sabko khilaya."], meaning: "One to six — six little thieves ran off with the ladoos! The dabba was hidden on the top shelf, yet Amma laughed and fed them all." },
  { id: "ch6", lines: ["Ghutne dukhe, haath bhi thake,", "Par Amma ke ladoo kabhi na ruke."], meaning: "Knees ache and hands are tired, but Amma's ladoos never stopped." },
  { id: "ch7", lines: ["Jo ghar se door, jo Amma ko tarse,", "Unke liye bhi pyaar yahan se barse."], meaning: "For everyone far from home who misses their Amma — love pours from here for them too." },
  { id: "besan", lines: ["Dheemi aanch pe bhuna besan,", "Ek bite mein khush ho jaaye mann."], meaning: "Besan roasted on a slow flame — one bite and your heart is happy." },
  { id: "motichoor", lines: ["Chhote-chhote moti, meethi-meethi baat,", "Motichoor ho toh lage shaadi ki raat."], meaning: "Tiny pearls, sweet talk — motichoor makes any night feel like a wedding." },
  { id: "gond", lines: ["Sardi aayi, thand badhi,", "Gond ke ladoo — Amma ki dawai badi!"], meaning: "Winter is here — gond ladoo is Amma's big medicine!" },
  { id: "methi", lines: ["Kadwa thoda, kaam bada,", "Methi ladoo — sehat ka ghada."], meaning: "A little bitter, a lot of good — methi ladoo is a pot of health." },
  { id: "churma", lines: ["Dal-baati ke saath ho churma,", "Marwar ka yahi asli dharma."], meaning: "Churma with dal-baati — that's the true way of Marwar." },
  { id: "dry-fruit", lines: ["Kaju, badaam, pista ki baat,", "Dry fruit ladoo — shahi saugaat."], meaning: "Cashew, almond and pistachio — a royal gift." },
  { id: "til", lines: ["Til-gud khao, meetha bolo,", "Amma ke dabbe ka dhakkan kholo."], meaning: "Eat til-gud, speak sweetly — open Amma's dabba." },
  { id: "add", lines: ["Ek aur? Bas ek aur!"], meaning: "One more? Just one more!" },
  { id: "empty-cart", lines: ["Khaali dabba, khaali thaal,", "Amma poochhe — kya hai haal?"], meaning: "Empty dabba, empty plate — Amma asks, how are you?" },
  { id: "loading", lines: ["Besan bhun raha hai… thoda sabar, beta."], meaning: "The besan is roasting… a little patience, child." },
  { id: "order-confirmed", lines: ["Order aaya, chulha jala,", "Amma ne kadhai mein besan dala!"], meaning: "The order came in, the stove is lit, Amma put the besan in the kadhai!" },
  { id: "shipped", lines: ["Dabba chala, rasta lamba,", "Khol ke kehna — wah ri Amma!"], meaning: "The dabba is on its long way — open it and say, wow Amma!" },
  { id: "404", lines: ["Raasta bhatke? Chinta na karo,", "Amma ki rasoi wapas chalo."], meaning: "Lost your way? Don't worry — come back to Amma's kitchen." },
  { id: "diwali", lines: ["Diye jale, saji rangoli,", "Amma ke ladoo se bhari jholi."], meaning: "Lamps lit, rangoli made — a bag full of Amma's ladoos." },
  { id: "rakhi", lines: ["Rakhi bandhi, mithaas ghuli,", "Amma ke dabbe se khushiyan khuli."], meaning: "The rakhi is tied, sweetness spreads — joy opens from Amma's dabba." },
  { id: "sankranti", lines: ["Patang udi, aasmaan khula,", "Til ke ladoo, sabka bhala."], meaning: "Kites fly, the sky opens — til ladoos, good wishes for all." },
  { id: "footer", lines: ["Meetha khao, meetha bolo,", "Amma ki rasoi ke darwaze kholo."], meaning: "Eat sweet, speak sweet — open the doors of Amma's kitchen." },
];

export const rhymes: Record<string, Rhyme> = Object.fromEntries(list.map((r) => [r.id, r]));

export function rhyme(id: string): Rhyme {
  const r = rhymes[id];
  if (!r) throw new Error(`Unknown rhyme: ${id}`);
  return r;
}
