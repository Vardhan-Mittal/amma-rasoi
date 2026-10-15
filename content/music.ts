// Background music per section. Drop real loops into public/audio/music/<id>.mp3.
// Until then the site plays a soft synthesised tanpura-style placeholder so the
// chapter-by-chapter crossfades can be heard and tested.
export type TrackId = "home" | "ch1" | "ch2" | "ch3" | "ch4a" | "ch4b" | "ch4c" | "ch5" | "ch6" | "ch7";

export type SynthSpec = {
  /** Sa (tonic) frequency in Hz */
  root: number;
  bpm: number;
  /** scale degrees in semitones used by the plucked melody */
  scale: number[];
  /** melody pattern as indexes into scale; -1 = rest */
  pattern: number[];
  wave: OscillatorType;
  brightness: number; // lowpass cutoff Hz
};

export const tracks: Record<TrackId, { label: string; prompt: string; synth: SynthSpec }> = {
  home: { label: "Santoor afternoon", prompt: "Warm, gentle Indian instrumental with santoor melody over soft tabla, 80 BPM, cosy kitchen afternoon", synth: { root: 146.83, bpm: 80, scale: [0, 2, 4, 7, 9, 12], pattern: [0, 2, 3, -1, 4, 3, 2, -1], wave: "triangle", brightness: 2200 } },
  ch1: { label: "Bansuri farewell", prompt: "Slow solo bansuri flute over a tanpura drone with a soft, distant military snare roll, 70 BPM, proud and bittersweet farewell", synth: { root: 130.81, bpm: 70, scale: [0, 2, 3, 7, 8, 12], pattern: [4, -1, 3, 2, -1, -1, 1, 0], wave: "sine", brightness: 1600 } },
  ch2: { label: "Rail ki seeti", prompt: "Rhythmic Indian folk where the dholak mimics a train's chugging, with harmonium melody, 95 BPM, a night journey, comforting", synth: { root: 138.59, bpm: 95, scale: [0, 2, 4, 5, 7, 9], pattern: [0, 0, 2, 0, 3, 2, 1, 0], wave: "square", brightness: 1200 } },
  ch3: { label: "Shehnai welcome", prompt: "Joyful Indian wedding instrumental with shehnai melody and dholak, 100 BPM, festive and warm", synth: { root: 155.56, bpm: 100, scale: [0, 2, 4, 7, 9, 12], pattern: [0, 2, 3, 4, 3, 2, 3, -1], wave: "sawtooth", brightness: 1800 } },
  ch4a: { label: "Sarangi bidaai", prompt: "Slow, emotional Rajasthani sarangi solo with light tanpura, 65 BPM, farewell, tearful but loving", synth: { root: 123.47, bpm: 65, scale: [0, 1, 4, 5, 7, 8], pattern: [5, 4, -1, 3, 2, -1, 1, 0], wave: "sawtooth", brightness: 1100 } },
  ch4b: { label: "School morning", prompt: "Bright, cheerful santoor with light percussion and a soft bell, 90 BPM, a happy school morning", synth: { root: 174.61, bpm: 90, scale: [0, 2, 4, 7, 9, 12], pattern: [0, 1, 2, 3, 4, 3, 2, 1], wave: "triangle", brightness: 2600 } },
  ch4c: { label: "Jamai sting", prompt: "Short playful comic folk loop with dholak and khartal, 110 BPM, cheeky", synth: { root: 164.81, bpm: 110, scale: [0, 2, 4, 5, 7, 12], pattern: [0, -1, 4, -1, 2, 5, -1, 0], wave: "square", brightness: 2000 } },
  ch5: { label: "Ladoo Gang", prompt: "Bouncy, mischievous Rajasthani folk with morchang, khartal and dholak, 115 BPM, children playing", synth: { root: 146.83, bpm: 115, scale: [0, 3, 5, 7, 10, 12], pattern: [0, 2, 0, 3, 0, 4, 3, 2], wave: "square", brightness: 1700 } },
  ch6: { label: "Quiet santoor", prompt: "Very soft santoor and tanpura, 60 BPM, quiet and reverent", synth: { root: 130.81, bpm: 60, scale: [0, 2, 4, 7, 9], pattern: [2, -1, -1, 1, -1, -1, 0, -1], wave: "sine", brightness: 1300 } },
  ch7: { label: "Rajasthani celebration", prompt: "Uplifting Rajasthani folk ensemble with kamaicha, harmonium and dholak, building to a celebratory finish, 95 BPM", synth: { root: 146.83, bpm: 95, scale: [0, 2, 4, 5, 7, 9, 12], pattern: [0, 2, 4, 6, 4, 2, 3, 4], wave: "triangle", brightness: 2400 } },
};
