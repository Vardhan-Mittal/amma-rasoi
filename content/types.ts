/** Bilingual text. `en` is English with Hinglish sprinkled in; `hi` is Devanagari Hindi (falls back to `en`). */
export type L = { en: string; hi?: string };

export type Rhyme = {
  id: string;
  lines: string[];
  /** English meaning, shown in small text under the rhyme */
  meaning: string;
};
