# Amma Rasoi — Background Music
- **Start:** muted until the **"🎵 Kahani Shuru Karein"** tap, since browsers block autoplay.
- **Chapter changes:** when a chapter fills about 60% of the screen, the music crossfades (about 2 s) to that chapter's track (see the story table).
- **Volume:** about 40%, ducking to about 15% while a rhyme plays in Amma's voice.
- **Control:** a floating diya-shaped mute button that remembers its setting.
- **Polite:** pauses in background tabs and fades out on Shop and Checkout.
- **Files:** 45–60 second seamless loops in MP3 at 128 kbps (about 1 MB each). Only the current and next tracks are preloaded.

**Music prompts.** Each is instrumental, no vocals, a seamless loop, 60 seconds long.

| File | Prompt |
|---|---|
| `home.mp3` | Warm, gentle Indian instrumental with santoor melody over soft tabla, 80 BPM, cosy kitchen afternoon |
| `ch1.mp3` | Slow solo bansuri flute over a tanpura drone with a soft, distant military snare roll, 70 BPM, proud and bittersweet farewell |
| `ch2.mp3` | Rhythmic Indian folk where the dholak mimics a train's chugging, with harmonium melody, 95 BPM, a night journey, comforting |
| `ch3.mp3` | Joyful Indian wedding instrumental with shehnai melody and dholak, 100 BPM, festive and warm |
| `ch4a.mp3` | Slow, emotional Rajasthani sarangi solo with light tanpura, 65 BPM, farewell, tearful but loving |
| `ch4b.mp3` | Bright, cheerful santoor with light percussion and a soft bell, 90 BPM, a happy school morning |
| `ch4c.mp3` | Short playful comic folk loop with dholak and khartal, 110 BPM, cheeky |
| `ch5.mp3` | Bouncy, mischievous Rajasthani folk with morchang, khartal and dholak, 115 BPM, children playing |
| `ch6.mp3` | Very soft santoor and tanpura, 60 BPM, quiet and reverent |
| `ch7.mp3` | Uplifting Rajasthani folk ensemble with kamaicha, harmonium and dholak, building to a celebratory finish, 95 BPM |

Use only tracks whose licence allows **commercial use**, and log each source in `public/audio/CREDITS.md`.

## Where to put the files

Save each loop as `public/audio/music/<file>` (e.g. `public/audio/music/ch1.mp3`), then rebuild. Until a file exists, the site plays a soft synthesised tanpura placeholder for that chapter.

## Amma's voice

Record Amma reading each rhyme (phone is fine, quiet room). Save as `public/audio/voice/<rhyme-id>.mp3` — ids are in `content/rhymes.ts` (e.g. `hero.mp3`, `ch1.mp3`, `besan.mp3`). Until then the "Amma Sunao" button uses the browser's Hindi voice as a stand-in.

