# Gen Yangin SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready SEO upgrade for Gen Yangin: technical metadata, schema, robots, improved navigation, core commercial pages, and discreet local authority pages.

**Architecture:** Keep Astro's existing page-per-route structure. Add reusable data and components for SEO, JSON-LD, calls to action, commercial service pages, and local pages so content can grow without bloating the layout.

**Tech Stack:** Astro 6, Tailwind CSS 4, `@astrojs/sitemap`, static Astro pages, inline JSON-LD.

## Global Constraints

- Main menu stays simple: Anasayfa, Hakkimizda, Hizmetler, Yonetmelik, Iletisim.
- City pages must not appear as a visible city list in the main nav or footer.
- Primary commercial sectors are hotels and factories.
- Primary scenarios are failed inspection, new license/opening, and pre-inspection control.
- Avoid ranking guarantees, fabricated regulation dates, and copied city text.
- Use `https://genyangin.com` as the production site URL.
- Keep edits scoped to SEO/content architecture; do not redesign the whole visual system.

---

## File Structure

- Modify `src/layouts/Layout.astro`: central SEO props, canonical, Open Graph, Twitter cards, base Organization/LocalBusiness/WebSite schema, clean nav links.
- Create `src/data/site.ts`: company URL, contact, address, social, and shared navigation data.
- Create `src/data/seo.ts`: route metadata, service page data, local page data, FAQ data.
- Create `src/components/JsonLd.astro`: safe JSON-LD renderer.
- Create `src/components/SeoBreadcrumbs.astro`: invisible structured breadcrumbs plus optional compact visible breadcrumbs when used.
- Create `src/components/ServicePage.astro`: reusable commercial page template for hotel/factory/report/consulting pages.
- Create `src/components/LocalSeoPage.astro`: reusable local authority page template without adding nav clutter.
- Create `src/pages/otel-yangin-yonetmeligi.astro`
- Create `src/pages/otel-itfaiye-uygunluk-raporu.astro`
- Create `src/pages/fabrika-yangin-yonetmeligi.astro`
- Create `src/pages/fabrika-itfaiye-uygunluk-raporu.astro`
- Create `src/pages/yangin-denetimi-revizyonu.astro`
- Create `src/pages/itfaiye-uygunluk-raporu.astro`
- Create `src/pages/yangin-danismanligi.astro`
- Create `src/pages/ege-bolgesi-yangin-danismanligi.astro`
- Create city pages for Manisa, Izmir, Aydin, Denizli, Mugla, Balikesir.
- Modify existing pages in `src/pages/*.astro`: pass correct SEO props and repair `/yonetmelik` prop mismatch.
- Create `public/robots.txt`: allow crawling and point to sitemap.

---

### Task 1: Technical SEO Foundation

**Files:**
- Create: `src/data/site.ts`
- Create: `src/components/JsonLd.astro`
- Modify: `src/layouts/Layout.astro`
- Create: `public/robots.txt`

**Interfaces:**
- Produces: `siteConfig` object with `siteUrl`, `name`, `phone`, `email`, `address`, `sameAs`.
- Produces: `JsonLd` component accepting `data: unknown`.
- Produces: `Layout` props: `pageTitle`, `description`, `canonical`, `ogType`, `noindex`, `jsonLd`.

- [ ] **Step 1: Add shared site config**

Create `src/data/site.ts` with company constants:

```ts
export const siteConfig = {
  siteUrl: "https://genyangin.com",
  name: "Gen Yangin",
  legalName: "Gen Yangin Danismanlik ve Yapi Cozumleri",
  description:
    "Otel ve fabrikalar icin yangin yonetmeligi danismanligi, itfaiye uygunluk raporu hazirligi ve anahtar teslim yapisal yangin guvenligi cozumleri.",
  phone: "+905336626210",
  displayPhone: "0 533 662 62 10",
  email: "info@genyangin.com",
  whatsapp: "https://wa.me/905336626210",
  instagram: "https://instagram.com/genyangin",
  address: {
    streetAddress: "Dincer Mah. 2301 Sok. No:23/A",
    addressLocality: "Sehzadeler",
    addressRegion: "Manisa",
    postalCode: "45020",
    addressCountry: "TR",
  },
  geo: {
    latitude: 38.6128738,
    longitude: 27.4229344,
  },
  sameAs: ["https://instagram.com/genyangin"],
};
```

- [ ] **Step 2: Add JSON-LD renderer**

Create `src/components/JsonLd.astro`:

```astro
---
interface Props {
  data: unknown;
}

const { data } = Astro.props;
---

<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

- [ ] **Step 3: Upgrade Layout SEO head**

Modify `src/layouts/Layout.astro` frontmatter to import `siteConfig` and `JsonLd`, compute canonical URL, and build base schema. The `Layout` must accept:

```ts
const {
  pageTitle = "Gen Yangin | Yangin Danismanligi ve Anahtar Teslim Yapisal Cozumler",
  description = siteConfig.description,
  canonical,
  ogType = "website",
  noindex = false,
  jsonLd = [],
} = Astro.props;
```

It must render:

```astro
<link rel="canonical" href={canonicalUrl} />
<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:site_name" content={siteConfig.name} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={description} />
```

Render `JsonLd` for Organization, LocalBusiness, WebSite, and each item in `jsonLd`.

- [ ] **Step 4: Create robots.txt**

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://genyangin.com/sitemap-index.xml
```

- [ ] **Step 5: Build check**

Run: `npm run build`

Expected: build completes and sitemap files are generated under `dist`.

---

### Task 2: Existing Page Metadata and Navigation

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/hizmetler.astro`
- Modify: `src/pages/yonetmelik.astro`
- Modify: `src/pages/yangin-sozlugu.astro`
- Modify: `src/pages/yangin-mevzuati-revizyonlari.astro`
- Modify: `src/pages/hakkimizda.astro`
- Modify: `src/pages/iletisim.astro`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: `Layout` SEO props from Task 1.
- Produces: current pages with unique titles, descriptions, and working metadata.

- [ ] **Step 1: Pass explicit home metadata**

Change `src/pages/index.astro` to call:

```astro
<Layout
  pageTitle="Manisa Yangin Danismanligi ve Anahtar Teslim Yangin Projeleri | Gen Yangin"
  description="Manisa ve Ege Bolgesi'nde otel ve fabrikalar icin yangin yonetmeligi danismanligi, itfaiye uygunluk raporu hazirligi ve anahtar teslim yapisal yangin guvenligi cozumleri."
>
```

- [ ] **Step 2: Fix `/yonetmelik` metadata prop**

Replace `<Layout title="...">` with:

```astro
<Layout
  pageTitle="Yangin Yonetmeligi Rehberi | Binalarin Yangindan Korunmasi | Gen Yangin"
  description="Binalarin Yangindan Korunmasi Hakkinda Yonetmelik maddeleri, kacak yollar, yangin merdiveni, sprinkler ve itfaiye denetimi icin pratik yangin guvenligi rehberi."
>
```

- [ ] **Step 3: Keep main menu simple**

In `src/layouts/Layout.astro`, keep desktop and mobile primary links to:

```txt
/
/hakkimizda
/hizmetler
/yonetmelik
/iletisim
```

Do not add city links to main nav or footer.

- [ ] **Step 4: Build check**

Run: `npm run build`

Expected: build completes without Astro prop errors.

---

### Task 3: Reusable Commercial Service Pages

**Files:**
- Create: `src/data/seo.ts`
- Create: `src/components/ServicePage.astro`
- Create seven commercial pages listed below.
- Modify: `src/pages/hizmetler.astro`

**Interfaces:**
- Produces: `servicePages` map keyed by route slug.
- Produces: `ServicePage` component accepting `page`.

- [ ] **Step 1: Add service page data**

Create `src/data/seo.ts` with a `servicePages` object. Each page must include:

```ts
export type ServicePageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sectors: string[];
  scenarios: string[];
  checks: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};
```

Include entries for:

```txt
otel-yangin-yonetmeligi
otel-itfaiye-uygunluk-raporu
fabrika-yangin-yonetmeligi
fabrika-itfaiye-uygunluk-raporu
yangin-denetimi-revizyonu
itfaiye-uygunluk-raporu
yangin-danismanligi
```

- [ ] **Step 2: Add ServicePage component**

Create `src/components/ServicePage.astro`. It must render:

- Hero with H1, intro, WhatsApp and phone actions.
- Three scenario cards: failed inspection, new license/opening, pre-inspection.
- Checklist section.
- Process steps.
- FAQ section.
- Related service links.
- Service and FAQ JSON-LD through `Layout jsonLd`.

- [ ] **Step 3: Create route files**

Create one Astro page per route. Example:

```astro
---
import ServicePage from "../components/ServicePage.astro";
import { servicePages } from "../data/seo";
---

<ServicePage page={servicePages["otel-yangin-yonetmeligi"]} />
```

- [ ] **Step 4: Link key commercial pages from Hizmetler**

Add a compact section to `src/pages/hizmetler.astro` linking the seven commercial pages. Keep it under the services content, not in the main nav.

- [ ] **Step 5: Build check**

Run: `npm run build`

Expected: all seven new routes are generated.

---

### Task 4: Discreet Local Authority Pages

**Files:**
- Modify: `src/data/seo.ts`
- Create: `src/components/LocalSeoPage.astro`
- Create: `src/pages/ege-bolgesi-yangin-danismanligi.astro`
- Create: city pages for Manisa, Izmir, Aydin, Denizli, Mugla, Balikesir.

**Interfaces:**
- Produces: `localPages` map keyed by route slug.
- Produces: `LocalSeoPage` component accepting `page`.

- [ ] **Step 1: Add local page data**

Extend `src/data/seo.ts` with:

```ts
export type LocalPageData = {
  slug: string;
  city: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  localContext: string;
  prioritySectors: string[];
  services: string[];
  related: { href: string; label: string }[];
};
```

Create unique entries for `ege-bolgesi-yangin-danismanligi`, `manisa-yangin-danismanligi`, `izmir-yangin-danismanligi`, `aydin-yangin-danismanligi`, `denizli-yangin-danismanligi`, `mugla-yangin-danismanligi`, and `balikesir-yangin-danismanligi`.

- [ ] **Step 2: Add LocalSeoPage component**

Create `src/components/LocalSeoPage.astro`. It must not add nav/footer city lists. It renders:

- Region/city H1.
- Local context.
- Otel and factory service cards.
- Short service list.
- Related links.
- WhatsApp CTA.

- [ ] **Step 3: Create local route files**

Create route files using:

```astro
---
import LocalSeoPage from "../components/LocalSeoPage.astro";
import { localPages } from "../data/seo";
---

<LocalSeoPage page={localPages["manisa-yangin-danismanligi"]} />
```

- [ ] **Step 4: Add one natural link to Ege page**

In `src/pages/hizmetler.astro`, add a single natural link to `/ege-bolgesi-yangin-danismanligi` in a sentence about Manisa and Ege service coverage.

- [ ] **Step 5: Build check**

Run: `npm run build`

Expected: all local pages are generated and not present in main nav.

---

### Task 5: Final Verification

**Files:**
- All modified files.

**Interfaces:**
- Consumes: tasks 1-4.
- Produces: verified production build.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: success.

- [ ] **Step 2: Inspect generated sitemap**

Run: `Get-ChildItem -Recurse dist | Select-String -Pattern "otel-yangin-yonetmeligi|manisa-yangin-danismanligi|sitemap"`

Expected: new commercial and local URLs appear in generated output.

- [ ] **Step 3: Check nav does not expose city pages**

Run: `Select-String -Path dist/**/*.html -Pattern "Mugla Yangin Danismanligi|Aydin Yangin Danismanligi|Balikesir Yangin Danismanligi"`

Expected: city names may appear on their own pages or related local content, but not as a repeated global nav/footer city list.

- [ ] **Step 4: Review git diff**

Run: `git diff --stat`

Expected: changes are limited to SEO/data/components/pages/robots/docs.
