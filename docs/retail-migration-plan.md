<!-- markdownlint-disable MD034 MD060 -->

# Plan: Migrate Retail Landing Page to Astro Home

## 🎉 COMPLETION STATUS: ✅ COMPLETE

**Project Status:** All phases completed successfully!

- ✅ **Phase 1**: Page setup + component directory created
- ✅ **Phase 2**: All 14 retail-specific components built with bilingual content
- ✅ **Phase 3**: Footer integration + i18n keys added
- ✅ **Phase 4**: Build verification complete (0 TypeScript errors, production build 60.47s)

**Routes Live:**

- 🌍 EN: https://astro-home.local/retail
- 🇹🇭 TH: https://astro-home.local/th/retail

---

## TL;DR

Migrate the bilingual retail landing page from `go.dealdroid.ai` into the existing Astro site at `/retail` (EN) and `/th/retail` (TH). The page has ~15 distinct sections. About 3-4 existing components can be reused; ~11 new retail-specific components need to be created. All copy/text must be preserved exactly from the source.

**Source pages:**

- TH: <https://go.dealdroid.ai/th/retail>
- EN: <https://go.dealdroid.ai/en/retail>

---

## Page Sections Analysis (Source → Target)

| #   | Section Name             | Source (TH)                                                                             | Existing Component                      | Action                                                                                       |
| --- | ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | Hero                     | "ตอบแชทเร็วกว่า ลูกค้าไม่หาย ปิดการขายด้วย AI" + chat mockup + stat bar + channel icons | `hero.astro` (partial)                  | **New**: `retail/hero.astro` — different layout with chat mockup, stats strip, channel logos |
| 2   | Client Logos (scrolling) | Pojjaman, Atlas Estate, Builk, Jubili, DJI13STORE, ENSONEER, AUTOLUB, SoldOutt etc.     | `logos.astro` (similar)                 | **New**: `retail/client-logos.astro` — infinite scroll animation                             |
| 3   | Pain Points              | "เพราะ Admin ยังตอบช้า และปิดขายไม่ได้" — 6 cards with images                           | —                                       | **New**: `retail/pain-points.astro` — 6-card grid with illustrations                         |
| 4   | Bridge/Transition        | "แล้วคุณจะต้องเสียค่า Ads อีกเท่าไหร่?" — persuasive copy block                         | `sectionhead.astro` (partial)           | **New**: `retail/bridge.astro` — large persuasive text block                                 |
| 5   | DealDroid AI Solution    | 6 feature bullets + chat demo mockup + channel support                                  | `feature-alt.astro` (partial)           | **New**: `retail/solution.astro` — feature list with animated chat mockup                    |
| 6   | Conversation Use Cases   | "จากทักครั้งแรก จนปิดการขาย" — 6 tabbed use cases with chat screenshots                 | —                                       | **New**: `retail/use-cases.astro` — tabbed/stepped showcase with chat screenshots            |
| 7   | Mid-page CTA             | "นัดคุยวิเคราะห์ Inbox ฟรี"                                                             | `cta.astro` (reusable)                  | **Reuse**: `cta.astro` with retail-specific translations                                     |
| 8   | Case Study / Proof       | DJI 13 Store results — 2,930 customers, 80% AI, 10% handoff, 24/7                       | `proof.astro` (partial)                 | **New**: `retail/case-study.astro` — elaborate proof with logo, stats, channels              |
| 9   | Features Grid            | "ทุกอย่างที่ Sales ที่ดีต้องทำได้" — 8 feature cards                                    | `feature-overview-grid.astro` (similar) | **New**: `retail/features-grid.astro` — 8-card grid                                          |
| 10  | 3 Easy Steps             | Setup → Connect → Launch & Sell                                                         | —                                       | **New**: `retail/steps.astro` — numbered 3-step process                                      |
| 11  | Target Audience          | "เราเลือกลูกค้า" — Great Fit / Not a Fit two-column                                     | —                                       | **New**: `retail/audience.astro` — two-column criteria with ✓/✗                              |
| 12  | Testimonial Quote        | DJI 13 Store CEO quote                                                                  | `testimonials.astro` (partial)          | **New**: `retail/testimonial.astro` — single large quote card                                |
| 13  | Built by ShakeSphere     | Company info + trusted-by enterprise logos                                              | —                                       | **New**: `retail/built-by.astro` — company showcase + enterprise logo grid                   |
| 14  | FAQ                      | 8 accordion questions                                                                   | `faq.astro` (reusable)                  | **Reuse**: `faq.astro` pattern with retail-specific Q&A data                                 |
| 15  | Final CTA                | "พร้อมหยุดสูญเสียรายได้..." + booking + LINE/WhatsApp                                   | `cta.astro` (partial)                   | **New**: `retail/final-cta.astro` — elaborate CTA with dual buttons + urgency                |
| 16  | Footer                   | Simple DealDroid footer                                                                 | `footer.astro` (existing)               | **Modify**: Add "Retail" link to existing footer menu                                        |

---

## Implementation Steps

### Phase 1: Setup & Assets (blocking)

1. Create `src/pages/retail.astro` (EN) and `src/pages/th/retail.astro` (TH) — basic page shells wrapping `Layout.astro`
2. Create `src/components/retail/` directory for all retail-specific components
3. Download all retail-page images/logos from `go.dealdroid.ai/assets/` into `src/assets/retail/`:
   - **Client logos**: pojjaman, atlas-estate, builk, jubili, dji13store, ensoneer, autolub, soldoutt, duc-de-praslin, jubili-intake
   - **Enterprise logos**: minor, power-buy, central-group, scg, scb, citi, auntie-annes, bec-tero, thaiticket-major, major-cineplex, who, lifepal
   - **Channel icons**: messenger, line, whatsapp, instagram, website, shopee
   - **Other**: pain point illustrations, chat mockup images, step illustrations, shakesphere logo
4. Add all retail translation keys using page-level `page_ui` pattern (recommended for this amount of content — define in each component)

### Phase 2: New Components (parallel — each can be built independently)

5. **`retail/hero.astro`** — Tagline + subtitle + 2 CTA buttons (primary: นัดคุย/Get Audit, outline: ดูผลลัพธ์/See Results) + chat mockup image + stats strip (80%, 24/7, 118+, Peak) + channel icons row. _TH hero uses DJI 13 Store mockup, EN uses TechGear SG mockup._
6. **`retail/client-logos.astro`** — Infinite horizontal scroll animation with ~10 client logos. Use CSS `@keyframes scroll` animation.
7. **`retail/pain-points.astro`** — Section header + 6 cards in 2×3 grid. Each card: title, description, illustration.
   - Cards: (1) ตอบช้า/Slow replies, (2) ตอบแต่ปิดไม่ได้/Answer but don't sell, (3) Run Ads ตอนดึก/Ads 24/7, (4) ลูกค้าต่างชาติ/Multi-language, (5) คำถามซ้ำๆ/Repetitive Q, (6) ROI ถูกขโมย/ROI leaking + transition quote
8. **`retail/bridge.astro`** — Large persuasive text block explaining the cost of slow inbox responses. Dark/gradient background for contrast.
9. **`retail/solution.astro`** — DealDroid AI section header + 6 feature bullets with icons + "Request Live Demo" CTA + channel support row + animated chat demo mockup image.
10. **`retail/use-cases.astro`** — "จากทักครั้งแรก จนปิดการขาย" — 6 tabs/steps: First Contact, Product Recommendation, Objection Handling, Closing, FAQ, Out-of-Scope. Each with chat screenshot image. Mid-section CTA.
11. **`retail/case-study.astro`** — Case study header + store logo/info + channel badges + 4 stat cards (2,930 customers / 80% AI / 10% qualified / 24/7 coverage) + CTA to full case study.
12. **`retail/features-grid.astro`** — Section header + 8 feature cards in 2×4 or responsive grid. Each: icon, title, description. Features: 24/7, Recommend, Brand Voice, Qualify Leads, FAQ, 118+ Languages, Human Handoff, Multi-Channel + closing statement.
13. **`retail/steps.astro`** — 3 numbered steps: Setup Business, Connect Channels, Launch & Sell. Each with illustration + description. "กลัว Setup ไม่เป็น?" reassurance text + CTA.
14. **`retail/audience.astro`** — Two columns: "เหมาะกับร้านที่" (6 criteria with ✓) and "ไม่เหมาะถ้า" (3 criteria with ✗). + CTA + urgency text.
15. **`retail/testimonial.astro`** — Single large quote card. TH: ณัฐชนน ชีวะวัฒนากร, CEO, DJI 13 Store. EN: anonymous "CEO, Authorized Electronics Dealer".
16. **`retail/built-by.astro`** — ShakeSphere section: logo, description, 4 stats (20+ years, 100+ projects, AI Core, TH/SEA team), enterprise logo grid (Minor, Power Buy, Central Group, SCG, SCB, Citi, Auntie Anne's, BEC Tero, Thaiticket Major, Major Cineplex, WHO, Lifepal).
17. **`retail/final-cta.astro`** — Large CTA with heading, description, primary button (นัดคุย/Get Audit) + secondary link (LINE/WhatsApp), trust signals (Free, No commitment, 48 hours), scarcity text (limited 3 brands/week).

### Phase 3: Page Assembly & i18n (depends on Phase 1 + 2)

18. Wire all components into `src/pages/retail.astro` in correct order:

    ```
    Hero → ClientLogos → PainPoints → Bridge → Solution → UseCases →
    CaseStudy → FeaturesGrid → Steps → Audience → Testimonial →
    BuiltBy → FAQ → FinalCTA
    ```

19. Wire same into `src/pages/th/retail.astro`
20. Add all retail-specific translations — preserve **exact** copy from source pages for both TH and EN
21. CTA links: TH → LINE (`https://line.me/R/ti/p/@dealdroid`), EN → WhatsApp or booking link

### Phase 3.5: Footer Link

22. Add "Retail" / "AI สำหรับร้านค้า" link to `src/components/footer.astro` in the `company` menu array, pointing to `/retail` (auto-translated via `translatePath`). Also add i18n keys if needed.

### Phase 4: Styling & Polish (depends on Phase 3)

23. Match visual style: dark sections for bridge/CTA, gradient backgrounds, card shadows, responsive breakpoints
24. Implement infinite logo scroll CSS animation
25. Ensure responsive layout (mobile-first) for all new components
26. Add anchor IDs for in-page navigation (`#proof`, `#features`, etc.)

---

## Relevant Files

### Existing (reuse/reference)

| File                               | Purpose                                              |
| ---------------------------------- | ---------------------------------------------------- |
| `src/layouts/Layout.astro`         | Page wrapper, SEO, navbar, footer                    |
| `src/components/container.astro`   | Max-width wrapper (use in all sections)              |
| `src/components/sectionhead.astro` | Badge + title + description pattern                  |
| `src/components/cta.astro`         | Reference for CTA styling                            |
| `src/components/faq.astro`         | Accordion pattern (reuse with different data)        |
| `src/components/logos.astro`       | Logo strip reference                                 |
| `src/components/proof.astro`       | Stats card pattern reference                         |
| `src/components/ui/button.astro`   | Button component (`style="primary"\|"outline"`)      |
| `src/components/ui/link.astro`     | Link component (same as button but `<a>`)            |
| `src/components/ui/badge.astro`    | Badge label component                                |
| `src/i18n/ui.ts`                   | Translation strings                                  |
| `src/i18n/utils.ts`                | `useTranslations()`, `usePageTranslations()` helpers |
| `src/pages/index.astro`            | Reference page composition pattern                   |
| `src/pages/th/index.astro`         | Reference Thai page pattern                          |
| `src/components/footer.astro`      | **Modify**: Add retail link to company menu          |

### New files to create

```
src/pages/retail.astro                    # EN retail page
src/pages/th/retail.astro                 # TH retail page
src/components/retail/hero.astro
src/components/retail/client-logos.astro
src/components/retail/pain-points.astro
src/components/retail/bridge.astro
src/components/retail/solution.astro
src/components/retail/use-cases.astro
src/components/retail/case-study.astro
src/components/retail/features-grid.astro
src/components/retail/steps.astro
src/components/retail/audience.astro
src/components/retail/testimonial.astro
src/components/retail/built-by.astro
src/components/retail/final-cta.astro
src/assets/retail/                        # All images/logos
```

---

## Verification Checklist

### Build & Basic

- [ ] `pnpm dev` — `/retail` and `/th/retail` render without errors
- [ ] `pnpm build` — production build succeeds
- [ ] `pnpm spellcheck` — passes (add retail terms to cspell if needed)

### Content Verification (ตรวจข้อความตรงกับต้นฉบับทุกจุด)

ข้อความทุกชิ้นต้องตรงกับ source page **ทุกคำ** — ไม่แปล ไม่แก้ไข ไม่สรุปย่อ

#### Section-by-Section Content Check

| #   | Section               | TH content checkpoint                                                                                                                                                                                                                            | EN content checkpoint                                                                                                                                                                                                                          |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero                  | ✅ Tagline: "ตอบแชทเร็วกว่า ลูกค้าไม่หาย ปิดการขายด้วย AI"                                                                                                                                                                                       | ✅ "Reply Faster. Lose Fewer Leads. Close Sales with AI."                                                                                                                                                                                      |
| 1   | Hero subtitle         | ✅ "ให้ DealDroid AI ตอบแชทแทน Admin ของคุณ ตอบทันทีลูกค้าไม่รอ 24 ชั่วโมงไม่เว้นวันหยุด ปิดการขายให้ รองรับแชทพุ่งเมื่อยิง ads โดยไม่ต้องจ้างคนเพิ่ม"                                                                                           | ✅ "DealDroid AI replaces your chat team 24/7 — instant replies, product recommendations, and closes deals while you sleep. No extra headcount needed."                                                                                        |
| 1   | Hero stats bar        | ✅ "80% จบ Chat โดย bot เอง" / "24/7 ขายแบบไม่มีวันหยุด" / "118+ ภาษา" / "↗ Peak รองรับแชทพุ่ง"                                                                                                                                                  | ✅ "80% Chats handled by AI" / "24/7 Always selling" / "118+ Languages" / "↗ Peak Handles campaign traffic surges"                                                                                                                             |
| 2   | Client Logos          | ✅ Logo list: Pojjaman, Atlas Estate, Builk, Jubili, Jubili Intake, Duc de Praslin, DJI13STORE, ENSONEER, AUTOLUB, SoldOutt                                                                                                                      | ✅ Same logos both languages                                                                                                                                                                                                                   |
| 3   | Pain Points header    | ✅ "เพราะ Admin ยังตอบช้า และปิดขายไม่ได้"                                                                                                                                                                                                       | ✅ "Because your inbox can't keep up with your ads"                                                                                                                                                                                            |
| 3   | Pain Point cards (6)  | ✅ (1) "ตอบช้าจนลูกค้าหาย" (2) "Admin ตอบแต่ปิดการขายไม่ได้" (3) "Run Ads ตอนดึก แต่คนตอบไม่อยู่" (4) "เจอลูกค้าต่างชาติ ตอบได้แค่ Snakeๆ Fishๆ" (5) "คำถามซ้ำๆ เผาเวลาทีมงาน" (6) "ROI ของ ads ถูกขโมยไป"                                       | ✅ (1) "Slow replies = lost customers" (2) "Chat agents answer but don't sell" (3) "Ads run 24/7, your team doesn't" (4) "Multi-language customers, mono-language team" (5) "Repetitive questions burn your team" (6) "Your ad ROI is leaking" |
| 3   | Pain Point quote      | ✅ "Inbox คือหน้าร้านของคุณในยุคนี้ — ใครตอบเร็ว ตอบดีกว่า ถือว่าชนะ"                                                                                                                                                                            | ✅ "Your inbox is your storefront now — whoever replies fastest, wins."                                                                                                                                                                        |
| 4   | Bridge                | ✅ "แล้วคุณจะต้องเสียค่า Ads อีกเท่าไหร่?" + ย่อหน้าอธิบาย 3 ย่อหน้า (ทุกบาทที่จ่าย / แคมเปญพีค / การจ้าง Admin เพิ่ม)                                                                                                                           | ✅ "How much more ad spend will you waste?" + 3 paragraphs (Every dollar / Campaign peaks / Hiring more agents)                                                                                                                                |
| 5   | Solution header       | ✅ "DealDroid AI — ผู้ช่วยขายที่ออนไลน์ตลอดเวลา — ไม่ลา ไม่พลาด ไม่หยุดขาย"                                                                                                                                                                      | ✅ "DealDroid AI — Your always-online sales assistant — never on leave, never off-duty, never stops selling"                                                                                                                                   |
| 5   | Solution features (6) | ✅ (1) AI Sales Agent นักขายมือ Pro (2) เข้าใจสินค้า แนะนำได้ (3) Brand Voice (4) รองรับแชทพุ่ง (5) 118+ ภาษา (6) "ขอดู Live Demo →"                                                                                                             | ✅ (1) AI Sales Agent trained as pro (2) Understands products (3) Brand voice (4) Handles surges (5) 118+ languages (6) "Request a Live Demo →"                                                                                                |
| 5   | Solution channels     | ✅ Messenger, LINE, WhatsApp, Instagram, Website                                                                                                                                                                                                 | ✅ Same + Shopee                                                                                                                                                                                                                               |
| 6   | Use Cases header      | ✅ "จากทักครั้งแรก จนปิดการขาย — สถานการณ์จริงที่ DealDroid AI พร้อมรับมือ"                                                                                                                                                                      | ✅ "From first hello to closed deal — Real scenarios DealDroid AI handles every day"                                                                                                                                                           |
| 6   | Use Case tabs (6)     | ✅ (1) ทักครั้งแรก (2) แนะนำสินค้า (3) โน้มน้าวไปในทางปิดการขาย (4) ปิดการขาย (5) ตอบคำถามทั่วไป (6) เคสนอกขอบเขต                                                                                                                                | ✅ (1) First Contact (2) Product Recommendation (3) Objection Handling (4) Closing the Sale (5) FAQ Auto-Reply (6) Out-of-Scope Handling                                                                                                       |
| 6   | Use Cases mid-CTA     | ✅ "อยากดูตัวอย่างที่ตรงกับธุรกิจคุณ? นัดคุยวิเคราะห์ Inbox ฟรี 30 นาที"                                                                                                                                                                         | ✅ "See DealDroid Handle Your Use Case →"                                                                                                                                                                                                      |
| 8   | Case Study header     | ✅ "ไม่ใช่แค่ 'ลองใช้ AI' — นี่คือผลลัพธ์จริงใน 1 เดือน"                                                                                                                                                                                         | ✅ "Not just 'trying AI' — These are real results from month one"                                                                                                                                                                              |
| 8   | Case Study stats (4)  | ✅ 2,930 ลูกค้า / 80% AI จบ / 10% ส่งต่อ / 24/7 ดูแล                                                                                                                                                                                             | ✅ 2,930 Customers / 80% Resolved by AI / 10% Qualified / 24/7 Coverage                                                                                                                                                                        |
| 8   | Case Study subhead    | ✅ "เดือนแรกที่ใช้ DealDroid AI ตอบลูกค้าแทน Admin ให้มากกว่า 90%"                                                                                                                                                                               | ✅ "In the first month with DealDroid, AI handled 90%+ of all customer chats"                                                                                                                                                                  |
| 9   | Features header       | ✅ "ทุกอย่างที่ Sales ที่ดีต้องทำได้"                                                                                                                                                                                                            | ✅ "Everything a great salesperson does — at scale"                                                                                                                                                                                            |
| 9   | Feature cards (8)     | ✅ (1) ตอบทันที 24 ชม (2) Recommend สินค้าได้ (3) Brand Voice ของคุณเอง (4) กรองลูกค้าตัวจริง (5) ตอบ FAQ อัตโนมัติ (6) รองรับ 118+ ภาษา (7) ส่งให้มนุษย์ เมื่อต้องส่ง (8) เชื่อมต่อ Facebook, LINE OA, Website หรือ Instagram                   | ✅ (1) Instant replies, 24/7 (2) Product recommendations (3) Your brand voice (4) Qualifies & hands off hot leads (5) Auto-answers FAQs (6) 118+ languages (7) Smart human handoff (8) All your channels, one AI                               |
| 9   | Features closing      | ✅ "เหมือนมี 'Sales มือโปร' อยู่ใน inbox ตลอดเวลา — ตอบไว แนะนำเป็น ปิดได้"                                                                                                                                                                      | ✅ "Like having a top-performing salesperson in every inbox — always on, always closing"                                                                                                                                                       |
| 10  | Steps header          | ✅ "เริ่มใช้ง่าย AI เริ่มรับลูกค้าภายใน 48 ชั่วโมง"                                                                                                                                                                                              | ✅ "Go live in 48 hours — AI starts selling immediately"                                                                                                                                                                                       |
| 10  | Steps (3)             | ✅ (1) Setup Business (2) Connect Channels (3) Launch & Sell + "กลัว Setup ไม่เป็น?"                                                                                                                                                             | ✅ (1) Set Up Your Business (2) Connect Your Channels (3) Launch & Start Selling + "Worried about setup?"                                                                                                                                      |
| 11  | Audience header       | ✅ "เราเลือกลูกค้า เพื่อให้ผลลัพธ์ชัดเจนทุกราย"                                                                                                                                                                                                  | ✅ "We're selective — so every client gets real results"                                                                                                                                                                                       |
| 11  | Great Fit (6)         | ✅ FB 50K+ / Ads 50K+ บาท / ใช้ Messenger/LINE/IG/Website / มี Admin / มองหา AI / เจอปัญหารับแชทช้า                                                                                                                                              | ✅ Running paid ads $1K+ / Selling via chat channels / Chat team not fast enough / Looking for AI tools / Chat volume spikes / Multilingual customers                                                                                          |
| 11  | Not a Fit (3)         | ✅ ไม่มี chat inbox / Ad spend ต่ำกว่า 50K / ต้องการ chatbot ราคาถูกทั่วไป                                                                                                                                                                       | ✅ Don't sell through chat / Ad spend under $1K / Looking for basic scripted chatbot                                                                                                                                                           |
| 12  | Testimonial           | ✅ "DealDroid AI รับลูกค้าเกือบ 3,000 รายใน 1 เดือน.. 80% AI จบเอง..." — ณัฐชนน ชีวะวัฒนากร (นัท), CEO, DJI 13 Store                                                                                                                             | ✅ "DealDroid AI handled nearly 3,000 customers in one month. 80% were resolved by AI alone..." — CEO, Authorized Electronics Dealer                                                                                                           |
| 13  | Built by header       | ✅ "สร้างโดยทีม ShakeSphere — บริษัท Tech Consulting ไทย ที่ทำ Digital Project ให้กับองค์กรชั้นนำมากกว่า 20 ปี"                                                                                                                                  | ✅ "Built by ShakeSphere — A Southeast Asian tech consultancy delivering digital products and AI systems for 20+ years"                                                                                                                        |
| 13  | Built by stats        | ✅ 20+ ปี / 100+ Projects / AI Core / TH Local team · Bangkok                                                                                                                                                                                    | ✅ 20+ Years / 100+ Projects / AI Core / SEA Regional team · Bangkok                                                                                                                                                                           |
| 13  | Enterprise logos      | ✅ Minor, Power Buy, Central Group, SCG, SCB, Citi, Auntie Anne's, BEC Tero, Thaiticket Major, Major Cineplex, WHO, Lifepal                                                                                                                      | ✅ Same logos                                                                                                                                                                                                                                  |
| 14  | FAQ questions (8)     | ✅ (1) บอทจะตอบมั่วไหม? (2) ใช้เวลานานไหมกว่าจะ Live? (3) ต้องเปลี่ยนระบบไหม? (4) รองรับแคมเปญพุ่งได้จริงไหม? (5) ทีมแอดมินอยากช่วยปิดการขาย ทำได้ไหม? (6) วัดผลยังไง? (7) Bot จะตอบผิดไหม? (8) Setup ยากไหม? + (9) ต่างจาก chatbot ทั่วไปยังไง? | ✅ (1) Will the bot say something wrong? (2) How long to go live? (3) Need to switch platform? (4) Handle campaign surges? (5) Team can take over? (6) How to measure? (7) Different from regular chatbot? (8) Setup difficult?                |
| 15  | Final CTA             | ✅ "พร้อมหยุดสูญเสียรายได้จากการรับลูกค้าแบบไม่มีประสิทธิภาพหรือยัง?" + "นัดคุยวิเคราะห์ Inbox ฟรี — 30 นาที" + LINE link                                                                                                                        | ✅ "Ready to stop losing revenue to slow chat responses?" + "Get Free Inbox Audit — 30 min" + WhatsApp link                                                                                                                                    |
| 15  | Final CTA trust       | ✅ "วิเคราะห์ Inbox ให้ฟรี · ไม่มีข้อผูกมัด · Live ได้ใน 48 ชั่วโมง" + "รับจำนวนจำกัด · สัปดาห์นี้รับไม่เกิน 3 แบรนด์"                                                                                                                           | ✅ "Free inbox analysis · No commitment · Go live in 48 hours" + "Limited spots · Only 3 brands accepted this week"                                                                                                                            |

#### Chat Conversation Content Check (บทสนทนาใน Chat Mockup)

Chat mockup ต้องมีข้อความเหมือนต้นฉบับทุกประการ:

**TH Hero Chat Mockup (DJI 13 Store):**

- [ ] Store name: "DJI 13 Store"
- [ ] Customer: "DJI Mini 4 Pro ราคาเท่าไหร่คะ?"
- [ ] Bot: "DJI Mini 4 Pro ราคา 27,990 บาทครับ ตอนนี้ซื้อคู่กับ DJI RC 2 ลดเพิ่มอีก 2,000 บาท!"
- [ ] Bot: "📦 เหลือ 3 ตัวสุดท้ายครับ"
- [ ] Customer: "ขอดูรูปหน่อยได้มั้ยค่ะ"
- [ ] Bot: [แสดงรูป DJI Mini 4 Pro]
- [ ] Customer: "อ่า เอาตัวนี้ก็ได้ค่ะ"

**EN Hero Chat Mockup (TechGear SG):**

- [ ] Store name: "TechGear SG"
- [ ] Customer: "Hi! How much is the Sony WH-1000XM5?"
- [ ] Bot: "Hey there! 👋 The Sony WH-1000XM5 is S$449. 🎧 Right now we have a bundle deal — get a free carrying case worth S$59! 📦 Only 5 left in stock."
- [ ] Customer: "Deal! I'll take one."

**TH Use Cases Chat Mockup (DJI 13 Store - First Contact):**

- [ ] Customer: "สวัสดีค่ะ สนใจสินค้า อยากสอบถามหน่อย"
- [ ] Bot: "สวัสดีครับ! ยินดีต้อนรับสู่ DJI 13 Store 🎉 เราเป็นตัวแทนจำหน่าย DJI อย่างเป็นทางการ ของแท้ 100% พร้อมรับประกันศูนย์และส่งฟรีทั่วไทยครับ วันนี้สนใจสินค้าประเภทไหนเป็นพิเศษครับ?"
- [ ] Bot quick replies: "🚁 โดรน" / "📷 กล้อง Action Camera" / "🎒 อุปกรณ์เสริม"

**EN Use Cases Chat Mockup (TechGear SG - First Contact):**

- [ ] Customer: "Hi! I'm interested in your products"
- [ ] Bot: "Hey there! Welcome to TechGear SG 🎉 We're an authorized dealer for premium electronics — 100% authentic with full local warranty and free delivery across Singapore! What are you looking for today? 🎧 Headphones & Audio 📷 Cameras & Drones 📱 Accessories"

#### Animation & Interactive Content Check

- [ ] **Client Logo Scroll** — infinite horizontal auto-scroll animation, seamless loop, ความเร็วเท่ากับต้นฉบับ
- [ ] **Hero Chat Mockup** — ถ้ามี typing animation หรือ message appear animation ต้องเหมือนต้นฉบับ
- [ ] **Pain Point Cards** — ถ้ามี hover effect หรือ scroll-triggered animation ต้องเหมือนต้นฉบับ
- [ ] **Use Cases Tabs** — tab switching animation/transition เปลี่ยน tab แล้วเนื้อหาเปลี่ยนตาม + chat screenshot สลับได้ถูกต้อง
- [ ] **FAQ Accordion** — expand/collapse animation ทำงานถูกต้อง, เปิด/ปิดได้ทีละข้อ
- [ ] **Stats Numbers** — ถ้ามี count-up animation (เช่น 2,930 นับขึ้น) ต้อง implement ตาม
- [ ] **Steps Section** — ถ้ามี step-by-step reveal animation ต้องเหมือนต้นฉบับ
- [ ] **Scroll Behavior** — smooth scroll สำหรับ anchor links (#proof, #features ฯลฯ)
- [ ] **CTA Buttons** — hover states, transitions ตรงกับ design system ของเว็บปัจจุบัน

### Responsive & Cross-browser

- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px)
- [ ] Language switching works (localStorage + URL prefix)
- [ ] CTA links: TH → LINE (`https://line.me/R/ti/p/@dealdroid`), EN → WhatsApp/booking
- [ ] Anchor navigation (#proof etc.)
- [ ] Visual compare side-by-side: source vs migrated (both TH and EN)

---

## Key Decisions

- **Page-level translations** (`page_ui` pattern) preferred over adding 100+ keys to global `ui.ts` — keeps retail content self-contained
- **New component directory** `src/components/retail/` to avoid polluting the shared components folder
- **Images**: Download from `go.dealdroid.ai/assets/` to `src/assets/retail/` for local hosting and Astro image optimization
- **TH hero** uses DJI 13 Store chat mockup; **EN hero** uses TechGear SG mockup (matching source)
- **FAQ component**: Reuse existing `faq.astro` accordion pattern but with retail-specific data passed in
- **No pricing section** on this page (source doesn't have one — CTAs go to booking/consultation)
- **Scope**: `/retail` and `/th/retail` pages + footer link addition in `footer.astro`

## Excluded from scope

- Adding "Retail" to the main navigation bar (navbar — can be added later)
- SEO metadata optimization beyond basic title/description
- Analytics event tracking for retail-specific CTAs
- Chat widget customization for retail page
