import type { L } from "./types";
import type { Mood } from "./story";

export type Festival = { id: string; title: L; blurb: L; months: number[]; file: string; mood: Mood; rhymeId: string; contents: string[] };

export const festivals: Festival[] = [
  {
    id: "diwali",
    title: { en: "Diwali Dabba", hi: "दिवाली डब्बा" },
    blurb: { en: "Besan, motichoor and dry fruit ladoos in a maroon-and-gold box with a clay diya and Amma's note.", hi: "बेसन, मोतीचूर और ड्राई फ्रूट लड्डू, मैरून-सुनहरे डब्बे में, मिट्टी के दीये और अम्मा के नोट के साथ।" },
    months: [9, 10],
    file: "fest-diwali.png",
    mood: "night",
    rhymeId: "diwali",
    contents: ["besan-ladoo", "motichoor-ladoo", "dry-fruit-ladoo"],
  },
  {
    id: "rakhi",
    title: { en: "Rakhi Box", hi: "राखी बॉक्स" },
    blurb: { en: "A rakhi, roli-chawal and a dozen ladoos — we can ship it straight to your brother's door.", hi: "राखी, रोली-चावल और दर्जन भर लड्डू — सीधे भाई के घर भेज सकते हैं।" },
    months: [7, 8],
    file: "fest-rakhi.png",
    mood: "dawn",
    rhymeId: "rakhi",
    contents: ["besan-ladoo", "churma-ladoo"],
  },
  {
    id: "sankranti",
    title: { en: "Sankranti Til Box", hi: "संक्रांति तिल बॉक्स" },
    blurb: { en: "Til and gond ladoos for the coldest week of the year, with a little paper kite on top.", hi: "साल के सबसे ठंडे हफ़्ते के लिए तिल और गोंद के लड्डू, ऊपर एक छोटी काग़ज़ की पतंग।" },
    months: [0, 11],
    file: "fest-sankranti.png",
    mood: "day",
    rhymeId: "sankranti",
    contents: ["til-ladoo", "gond-ladoo"],
  },
];
