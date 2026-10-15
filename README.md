# Amma Rasoi

The Mittal family's website for Amma's ladoos: a 7-chapter scrolling story with music, rhymes and motion graphics, plus a shop that orders over WhatsApp.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Pages

| Route | What's there |
|---|---|
| `/` | Jharokha hero (shutters open), favourites, "20 saal ka safar" strip, Ladoo Gang, scroll-linked "Kaise Banta Hai", festival boxes, reviews |
| `/amma-ki-kahani` | The story: intro paths, chapters 1–7 with scenes (jet route, train, garland, dusk diyas, chalkboard, Jamai burst, Ladoo Gang, calendar, India map), family tree, finale |
| `/shop`, `/shop/[slug]` | Filterable products, size + quantity with ladoos stacking on the thali, add-to-cart fly animation |
| `/gifting`, `/faq`, `/contact` | Festival boxes and bulk orders, FAQ, contact |

## Editing content (no design changes needed)

- `content/story.ts` — chapters, years, story text (English + Hindi)
- `content/rhymes.ts` — every rhyme on the site
- `content/family.ts` — names, relations, memories, favourite ladoos (memories are placeholders)
- `content/products.ts` — products, sizes, **sample prices**, ingredients
- `content/site.ts` — WhatsApp number, **FSSAI number**, email, address
- `content/reviews.ts` — real customer reviews only

## Swapping in real images, music and Amma's voice

Drop files into `public/` with the exact names below, then rebuild (`npm run build`, or `npm run assets` while developing). Placeholders disappear automatically.

- Illustrations → `public/illustrations/<name>.png` — prompts and filenames in `prompts/image-prompts.md`
- Family portraits → `public/illustrations/family/<id>.png` (`amma`, `sanjeev`, `pallavi`, `rajeev`, `neha`, `ritu`, `nitin`, `nitya`, `vardhan`, `paridhi`, `ammol`, `harshi`, `daskh`)
- Product photos → `public/products/<slug>.jpg`
- Chapter music → `public/audio/music/<track>.mp3` — prompts in `prompts/music-prompts.md` (log licences in `public/audio/CREDITS.md`)
- Amma's voice → `public/audio/voice/<rhyme-id>.mp3`

Until real music exists, each chapter plays a soft synthesised tanpura placeholder; until Amma's voice is recorded, "Amma Sunao" uses the browser's Hindi voice.

## Motion & accessibility

GSAP + ScrollTrigger (SplitText, DrawSVG, MotionPath), Motion for UI, Lenis smooth scroll, Howler for music. With `prefers-reduced-motion`, smooth scroll, the intro loader, scrubbed scenes and ambient loops are switched off. Music never autoplays — it starts on the "Kahani Shuru Karein" tap or the diya button.

## Not built yet (Phase 2)

Razorpay checkout, Supabase orders and admin, Shiprocket, gift box builder, quiz, Chhupa Dabba, Tukbandi Corner.
