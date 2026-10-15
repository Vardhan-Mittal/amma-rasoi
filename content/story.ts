import type { L } from "./types";
import type { TrackId } from "./music";

export type SceneId = "jet" | "train" | "garland" | "dusk" | "chalkboard" | "jamai" | "gang" | "calendar" | "delivery";
export type Mood = "night" | "dawn" | "station" | "festive" | "dusk" | "day" | "warm" | "courtyard";

export type Chapter = {
  id: string;
  number: string;
  year: number;
  title: L;
  kicker: L;
  beats: L[];
  quote?: L;
  rhymeId: string;
  track: TrackId;
  /** illustration filenames in public/illustrations, first is the main one */
  images: string[];
  /** object-position per image when the subject is off-centre */
  focus?: Record<string, string>;
  scene: SceneId;
  mood: Mood;
};

export const storyIntro: L = {
  en: "Ek beta aasmaan mein, ek patri pe, aur beti school mein — teeno ke bag mein ek hi cheez: Amma ka dabba.",
  hi: "एक बेटा आसमान में, एक पटरी पे, और बेटी स्कूल में — तीनों के बैग में एक ही चीज़: अम्मा का डब्बा।",
};

export const storyIntroMeaning: L = {
  en: "One son in the sky, one on the railway tracks, the daughter in a classroom — and in all three bags, the same thing: Amma's dabba.",
  hi: "एक बेटा आसमान में, एक रेल की पटरी पर, बेटी कक्षा में — और तीनों के बैग में वही चीज़: अम्मा का डब्बा।",
};

export const chapters: Chapter[] = [
  {
    id: "aasmaan",
    number: "1",
    year: 2006,
    title: { en: "Aasmaan ka Sipahi", hi: "आसमान का सिपाही" },
    kicker: { en: "The soldier of the skies", hi: "पहला डब्बा" },
    beats: [
      { en: "Twenty years ago, the night before Sanjeev — Bada Beta — left for Air Force training, the house was quiet. Only one light burned — the chulha.", hi: "बीस साल पहले, जिस रात बड़ा बेटा संजीव वायु सेना की ट्रेनिंग के लिए निकलने वाला था, घर में सन्नाटा था। सिर्फ़ एक रोशनी जल रही थी — चूल्हा।" },
      { en: "Amma sat by the kadhai and roasted besan all night, stirring until her arm ached. At dawn, at the gate, she pressed a steel dabba wrapped in newspaper into his hands.", hi: "अम्मा रात भर कड़ाही के पास बैठकर बेसन भूनती रहीं। सुबह, दरवाज़े पर, अख़बार में लिपटा स्टील का डब्बा उसके हाथ में थमा दिया।" },
      { en: "She didn't cry at the gate. She saved that for after the bus left.", hi: "दरवाज़े पर वो नहीं रोईं। आँसू बस के जाने के बाद के लिए बचा रखे थे।" },
      { en: "For years after, at snowy postings far from home, a parcel reached him every Diwali — and his whole unit lined up for a share.", hi: "उसके बाद सालों तक, घर से दूर बर्फ़ीली पोस्टिंग पर, हर दिवाली एक पार्सल पहुँचता — और पूरी यूनिट लाइन में लग जाती।" },
    ],
    quote: { en: "\"Raste mein kha lena. Aur time pe khana khaana, samjhe?\"", hi: "\"रास्ते में खा लेना। और टाइम पे खाना खाना, समझे?\"" },
    rhymeId: "ch1",
    track: "ch1",
    images: ["ch1-night.png", "ch1-gate.png", "ch1-posting.png"],
    focus: { "ch1-night.png": "74% 50%", "ch1-gate.png": "52% 50%" },
    scene: "jet",
    mood: "dawn",
  },
  {
    id: "rail",
    number: "2",
    year: 2009,
    title: { en: "Rail ki Seeti", hi: "रेल की सीटी" },
    kicker: { en: "The whistle of the train", hi: "रेल की सीटी" },
    beats: [
      { en: "Then Rajeev, Chhota Beta, joined the Railways. Long night shifts, cold platforms, trains that never waited for anyone.", hi: "फिर छोटा बेटा राजीव रेलवे में लग गया। लंबी नाइट शिफ़्ट, ठंडे प्लेटफ़ॉर्म, और ट्रेनें जो किसी का इंतज़ार नहीं करतीं।" },
      { en: "But his tiffin always had ladoos in it — and always two extra. One for a colleague. One for the chaiwala on platform number 2.", hi: "पर उसके टिफ़िन में हमेशा लड्डू होते — और हमेशा दो ज़्यादा। एक साथी के लिए, एक प्लेटफ़ॉर्म नंबर 2 के चायवाले के लिए।" },
      { en: "Every station became a little bit like home.", hi: "हर स्टेशन थोड़ा-थोड़ा घर जैसा बन गया।" },
    ],
    rhymeId: "ch2",
    track: "ch2",
    images: ["ch2-rail.png"],
    focus: { "ch2-rail.png": "56% 50%" },
    scene: "train",
    mood: "station",
  },
  {
    id: "bahu",
    number: "3",
    year: 2011,
    title: { en: "Ghar mein Bahu Aayi", hi: "घर में बहू आई" },
    kicker: { en: "New hands in the kitchen", hi: "रसोई में नए हाथ" },
    beats: [
      { en: "Both sons married — Pallavi and Neha came home, and the house filled with laughter again. Two bahus, two new pairs of hands with mehendi still fresh on them.", hi: "दोनों बेटों की शादी हुई — पल्लवी और नेहा घर आईं, और घर फिर हँसी से भर गया। दो बहुएँ, दो नए हाथ, मेहंदी अभी भी ताज़ा।" },
      { en: "Amma's first lesson: the forty-minute bhunai. \"Haath dukhe toh samajhna besan sahi bhun raha hai.\"", hi: "अम्मा का पहला सबक़: चालीस मिनट की भुनाई। \"हाथ दुखे तो समझना बेसन सही भुन रहा है।\"" },
      { en: "\"Recipe nahi di,\" the bahus say today, \"ghar ki chaabi di.\"", hi: "\"रेसिपी नहीं दी,\" बहुएँ आज कहती हैं, \"घर की चाबी दी।\"" },
    ],
    rhymeId: "ch3",
    track: "ch3",
    images: ["ch3-bahu.png"],
    scene: "garland",
    mood: "festive",
  },
  {
    id: "bidaai",
    number: "4a",
    year: 2012,
    title: { en: "Beti ki Bidaai", hi: "बेटी की बिदाई" },
    kicker: { en: "The daughter's farewell", hi: "बेटी की बिदाई" },
    beats: [
      { en: "Then came the hardest day of all — Ritu's bidaai.", hi: "फिर आया सबसे मुश्किल दिन — बेटी ऋतु की बिदाई।" },
      { en: "In the doli, between the jewellery and the tears, Amma tucked a small steel dabba into her hands. \"Sasural mein sabko khilana. Aur khud bhi khaana.\"", hi: "डोली में, गहनों और आँसुओं के बीच, अम्मा ने एक छोटा स्टील का डब्बा उसके हाथ में रख दिया। \"ससुराल में सबको खिलाना। और ख़ुद भी खाना।\"" },
    ],
    rhymeId: "ch4a",
    track: "ch4a",
    images: ["ch4-bidaai.png"],
    focus: { "ch4-bidaai.png": "46% 50%" },
    scene: "dusk",
    mood: "dusk",
  },
  {
    id: "teacher",
    number: "4b",
    year: 2014,
    title: { en: "Teacher Didi", hi: "टीचर दीदी" },
    kicker: { en: "Result day, every year", hi: "हर साल, रिज़ल्ट का दिन" },
    beats: [
      { en: "Ritu became a teacher — and started a tradition her students still talk about.", hi: "ऋतु टीचर बनी — और एक ऐसी परंपरा शुरू की जिसकी बात उसके बच्चे आज भी करते हैं।" },
      { en: "On result day she walks in with Amma's dabba. Pass ho ya fail, ladoo sabko. \"Number agle saal badh jayenge. Ladoo aaj khao.\"", hi: "रिज़ल्ट के दिन वो अम्मा का डब्बा लेकर आती है। पास हो या फ़ेल, लड्डू सबको। \"नंबर अगले साल बढ़ जाएँगे। लड्डू आज खाओ।\"" },
    ],
    rhymeId: "ch4b",
    track: "ch4b",
    images: ["ch4-teacher.png"],
    scene: "chalkboard",
    mood: "day",
  },
  {
    id: "jamai",
    number: "4c",
    year: 2015,
    title: { en: "Jamai Raja", hi: "जमाई राजा" },
    kicker: { en: "The biggest fan", hi: "सबसे बड़े फ़ैन" },
    beats: [
      { en: "And then there is Nitin ji, the damad — officially the family's biggest ladoo fan.", hi: "और फिर हैं दामाद नितिन जी — परिवार के आधिकारिक सबसे बड़े लड्डू फ़ैन।" },
      { en: "His record: four ladoos, one breath. Amma pretends to be shocked. Then she quietly packs a dabba for him to take home.", hi: "उनका रिकॉर्ड: चार लड्डू, एक साँस। अम्मा हैरान होने का नाटक करती हैं। फिर चुपचाप उनके लिए डब्बा पैक कर देती हैं।" },
    ],
    rhymeId: "ch4c",
    track: "ch4c",
    images: ["ch4-jamai.png"],
    focus: { "ch4-jamai.png": "36% 50%" },
    scene: "jamai",
    mood: "courtyard",
  },
  {
    id: "ladoo-gang",
    number: "5",
    year: 2018,
    title: { en: "Chhe Chhote Chor", hi: "छह छोटे चोर" },
    kicker: { en: "The Ladoo Gang", hi: "लड्डू गैंग" },
    beats: [
      { en: "Then came the grandchildren — Nitya, Vardhan, Paridhi, Ammol, Harshi aur Daskh. The house got loud, and the ladoo dabba moved to the top shelf.", hi: "फिर आए बच्चों के बच्चे — नित्या, वर्धन, परिधि, अम्मोल, हर्षी और दक्ष। घर में शोर बढ़ा, और लड्डू का डब्बा सबसे ऊपर वाली शेल्फ़ पर पहुँच गया।" },
      { en: "It didn't help. Chairs were climbed. Crumbs were found on school uniforms. Amma always \"caught\" them — and always let them go.", hi: "कोई फ़ायदा नहीं हुआ। कुर्सियाँ चढ़ी गईं। स्कूल यूनिफ़ॉर्म पर चूरा मिला। अम्मा हमेशा \"पकड़ लेतीं\" — और हमेशा छोड़ देतीं।" },
      { en: "Exam morning: one ladoo and a spoon of dahi. Result day: one ladoo, whatever the marks.", hi: "परीक्षा की सुबह: एक लड्डू और एक चम्मच दही। रिज़ल्ट का दिन: एक लड्डू, नंबर चाहे जो हों।" },
    ],
    quote: { en: "\"Chal le le, par apni mummy ko mat batana.\"", hi: "\"चल ले ले, पर अपनी मम्मी को मत बताना।\"" },
    rhymeId: "ch5",
    track: "ch5",
    images: ["ch5-ladoo-gang.png"],
    focus: { "ch5-ladoo-gang.png": "62% 50%" },
    scene: "gang",
    mood: "warm",
  },
  {
    id: "haath",
    number: "6",
    year: 2024,
    title: { en: "Haath Thakte Hain, Pyaar Nahi", hi: "हाथ थकते हैं, प्यार नहीं" },
    kicker: { en: "Hands get tired. Love doesn't.", hi: "हाथ थकते हैं, प्यार नहीं" },
    beats: [
      { en: "Twenty years change a lot. Amma's knees ache now. Her hands are slower. The doctor says, \"Aaram kijiye, Mataji.\"", hi: "बीस साल बहुत कुछ बदल देते हैं। अम्मा के घुटने अब दुखते हैं। हाथ धीमे हो गए हैं। डॉक्टर कहते हैं, \"आराम कीजिए, माताजी।\"" },
      { en: "But when someone is coming home, she is back at the kadhai. Forty minutes of bhunai — not thirty-five.", hi: "पर जब कोई घर आने वाला हो, वो फिर कड़ाही के पास होती हैं। चालीस मिनट की भुनाई — पैंतीस नहीं।" },
      { en: "The first ladoo still goes to Bhagwan. And she still waits to see your face after the first bite.", hi: "पहला लड्डू आज भी भगवान को जाता है। और वो आज भी पहले कौर के बाद आपका चेहरा देखने का इंतज़ार करती हैं।" },
    ],
    quote: { en: "\"Jaldi karegi toh swaad bhaag jaayega.\"", hi: "\"जल्दी करेगी तो स्वाद भाग जाएगा।\"" },
    rhymeId: "ch6",
    track: "ch6",
    images: ["ch6-hands.png"],
    focus: { "ch6-hands.png": "60% 50%" },
    scene: "calendar",
    mood: "warm",
  },
  {
    id: "amma-rasoi",
    number: "7",
    year: 2026,
    title: { en: "Amma Rasoi Kyun?", hi: "अम्मा रसोई क्यों?" },
    kicker: { en: "Why Amma Rasoi", hi: "क्यों अम्मा रसोई" },
    beats: [
      { en: "It started, again, in a hostel room. A grandchild shared Amma's dabba with friends. Ten minutes later it was empty, and everyone asked: \"Aur milega?\"", hi: "शुरुआत फिर एक हॉस्टल के कमरे से हुई। हमारे एक बच्चे ने दोस्तों के साथ अम्मा का डब्बा बाँटा। दस मिनट में ख़ाली, और सबने पूछा: \"और मिलेगा?\"" },
      { en: "Amma laughed for a long time. Then she said: \"Jo bachche ghar se door hain, unke liye bhi bana deti hoon.\"", hi: "अम्मा बहुत देर तक हँसीं। फिर बोलीं: \"जो बच्चे घर से दूर हैं, उनके लिए भी बना देती हूँ।\"" },
      { en: "Now the whole Mittal family runs it. Sanjeev does quality check (\"Sir!\"). Rajeev handles dispatch like a railway timetable. Ritu writes the notes. Pallavi and Neha roll. Nitin ji does Instagram. The Ladoo Gang ties the ribbons.", hi: "अब पूरा मित्तल परिवार इसे चलाता है। संजीव क्वालिटी चेक करते हैं। राजीव डिस्पैच रेलवे टाइमटेबल की तरह संभालते हैं। ऋतु नोट्स लिखती है। पल्लवी और नेहा लड्डू बाँधती हैं। नितिन जी इंस्टाग्राम। लड्डू गैंग रिबन बाँधती है।" },
    ],
    rhymeId: "ch7",
    track: "ch7",
    images: ["ch7-family.png"],
    scene: "delivery",
    mood: "courtyard",
  },
];

export const promises: { icon: string; text: L }[] = [
  { icon: "🪔", text: { en: "Pure desi ghee — no kanjoosi", hi: "शुद्ध देसी घी — कोई कंजूसी नहीं" } },
  { icon: "🔥", text: { en: "Slow-roasted, forty minutes, no shortcuts", hi: "धीमी आँच, चालीस मिनट, कोई शॉर्टकट नहीं" } },
  { icon: "🤲", text: { en: "Rolled by hand, never by machine", hi: "हाथ से बँधे, मशीन से नहीं" } },
  { icon: "📦", text: { en: "Made fresh after you order", hi: "ऑर्डर के बाद ताज़ा बनते हैं" } },
];
