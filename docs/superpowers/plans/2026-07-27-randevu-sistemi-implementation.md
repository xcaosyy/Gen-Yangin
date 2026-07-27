# Randevu Sistemi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Apps Script'teki seans takvimini Cloudflare Workers üzerinde çalışan, iPhone PWA bildirimleri, güvenli kişisel oturumlar, doğru raporlar, yedekleme ve doğrulanmış veri taşıma sağlayan yeni sisteme dönüştürmek.

**Architecture:** Uygulama mevcut Astro sitesine dokunmadan `randevu-sistemi/` altında bağımsız bir React + TypeScript PWA ve Hono tabanlı Cloudflare Worker olarak kurulacaktır. Worker aynı `workers.dev` kaynağından statik uygulamayı ve `/api/*` uçlarını sunacak; D1 işlemsel veriyi, R2 şifreli yedekleri, Cron ise hatırlatma ve yedek zamanlarını yönetecektir.

**Tech Stack:** Node.js 22+, TypeScript strict, React, Vite, Cloudflare Vite plugin, Hono, Zod, D1/SQLite migrations, R2, Web Push/VAPID, `@block65/webcrypto-web-push`, Vitest, Cloudflare Workers Vitest pool, Testing Library, Playwright, pdf-lib, fontkit ve ExcelJS.

## Global Constraints

- Yeni uygulamanın bütün dosyaları `randevu-sistemi/` altında tutulacak; mevcut Astro uygulamasının `src/`, `public/` ve paket yapılandırması değiştirilmeyecek.
- Üretim adresi özel kod içeren ücretsiz `*.workers.dev` adresi olacak.
- Bütün HTML ve API cevapları `X-Robots-Tag: noindex, nofollow, noarchive` taşıyacak; HTML ayrıca eşdeğer meta etiketi içerecek.
- Zaman hesapları `Europe/Istanbul` saat diliminde yapılacak.
- İş tarihleri API ve veritabanında `YYYY-MM-DD`, seans saatleri `HH:mm` olarak tutulacak.
- Randevu saatleri yalnızca `09:00`, `10:00`, `11:00`, `14:00`, `15:00`, `16:00` olacak.
- İstemci çevrimdışı kişisel veri saklamayacak ve çevrimdışı yazma kuyruğu oluşturmayacak.
- Danışan için yalnızca ad ve soyad saklanacak.
- PIN, oturum belirteci, VAPID özel anahtarı ve yedek anahtarı hiçbir günlük çıktısına yazılmayacak.
- Rapor ve yönetim yetkileri her istekte sunucu tarafında doğrulanacak.
- Her görev test önce yazılarak tamamlanacak ve ayrı commit ile kapatılacak.
- Üretim kaynağı yaratma, secret ekleme ve deploy işlemleri kullanıcı onayından sonra yapılacak.

---

## File Map

### Project configuration

- `randevu-sistemi/package.json`: komutlar ve bağımlılıklar
- `randevu-sistemi/tsconfig.json`: ortak strict TypeScript ayarları
- `randevu-sistemi/vite.config.ts`: React, Cloudflare ve PWA derlemesi
- `randevu-sistemi/vitest.worker.config.ts`: workerd içinde Worker testleri
- `randevu-sistemi/vitest.ui.config.ts`: jsdom içinde React testleri
- `randevu-sistemi/playwright.config.ts`: mobil WebKit kabul testleri
- `randevu-sistemi/wrangler.jsonc`: Worker, D1, R2, assets ve Cron bağları
- `randevu-sistemi/worker-configuration.d.ts`: Cloudflare binding tipleri

### Database

- `randevu-sistemi/migrations/0001_initial.sql`: bütün temel tablolar, indeksler ve kısıtlar
- `randevu-sistemi/migrations/0002_holidays_2026_2035.sql`: doğrulanmış tatil verisi
- `randevu-sistemi/src/worker/db.ts`: D1 sorgu yardımcıları
- `randevu-sistemi/src/worker/domain-types.ts`: sunucu alan tipleri

### Worker features

- `randevu-sistemi/src/worker/index.ts`: `fetch` ve `scheduled` giriş noktası
- `randevu-sistemi/src/worker/app.ts`: Hono route bileşimi
- `randevu-sistemi/src/worker/middleware/security.ts`: noindex, hata ve cache başlıkları
- `randevu-sistemi/src/worker/middleware/auth.ts`: oturum ve rol doğrulaması
- `randevu-sistemi/src/worker/auth/*`: PIN, giriş, oturum ve cihaz yönetimi
- `randevu-sistemi/src/worker/audit/*`: değiştirilemeyen hareket kaydı
- `randevu-sistemi/src/worker/clients/*`: ad normalizasyonu ve danışan araması
- `randevu-sistemi/src/worker/appointments/*`: randevu kuralları ve rapor sorguları
- `randevu-sistemi/src/worker/availability/*`: tatil, izin ve süpervizyon
- `randevu-sistemi/src/worker/duty/*`: sekreter görev devri
- `randevu-sistemi/src/worker/push/*`: VAPID abonelik ve gönderim
- `randevu-sistemi/src/worker/reminders/*`: günlük soru durum makinesi
- `randevu-sistemi/src/worker/backups/*`: R2 yedek ve geri yükleme
- `randevu-sistemi/src/worker/migration/*`: Apps Script veri önizleme ve aktarım

### Shared contracts

- `randevu-sistemi/src/shared/contracts.ts`: Zod istek/cevap şemaları
- `randevu-sistemi/src/shared/constants.ts`: saatler, statüler ve rol sabitleri
- `randevu-sistemi/src/shared/date.ts`: İstanbul tarihi ve iş günü yardımcıları

### Client

- `randevu-sistemi/src/client/main.tsx`: React başlangıcı
- `randevu-sistemi/src/client/App.tsx`: route ve oturum sınırı
- `randevu-sistemi/src/client/api.ts`: doğrulanmış API istemcisi
- `randevu-sistemi/src/client/sw.ts`: PWA cache, push ve notification click
- `randevu-sistemi/src/client/pages/*`: giriş, takvim, arama, rapor ve yönetim ekranları
- `randevu-sistemi/src/client/features/*`: odaklı takvim, arama, bildirim ve rapor bileşenleri
- `randevu-sistemi/src/client/styles/*`: erişilebilir mobil tasarım
- `randevu-sistemi/public/manifest.webmanifest`: iPhone ana ekranı bilgileri
- `randevu-sistemi/public/icons/*`: PWA simgeleri
- `randevu-sistemi/public/fonts/NotoSans-Regular.ttf`: Türkçe PDF yazı tipi

### Tests and operations

- `randevu-sistemi/tests/worker/*`: D1 ve Worker entegrasyon testleri
- `randevu-sistemi/tests/ui/*`: React bileşen testleri
- `randevu-sistemi/tests/setup-ui.ts`: Testing Library eşleştiricileri
- `randevu-sistemi/tests/e2e/*`: Playwright mobil akışları
- `randevu-sistemi/scripts/generate-vapid.mjs`: VAPID anahtarı üretimi
- `randevu-sistemi/scripts/generate-holidays.mjs`: tatil migration üretimi
- `randevu-sistemi/scripts/convert-apps-script-export.mjs`: eski JSON dönüşümü
- `randevu-sistemi/docs/operations.md`: kurulum, yedek ve geri yükleme işletim kılavuzu
- `randevu-sistemi/docs/iphone-install.md`: iPhone ana ekran ve bildirim kurulumu
- `randevu-sistemi/docs/acceptance-checklist.md`: gerçek cihaz kabul listesi

---

### Task 1: Isolated Cloudflare React/Worker Foundation

**Files:**

- Create: `randevu-sistemi/package.json`
- Create: `randevu-sistemi/tsconfig.json`
- Create: `randevu-sistemi/vite.config.ts`
- Create: `randevu-sistemi/vitest.worker.config.ts`
- Create: `randevu-sistemi/vitest.ui.config.ts`
- Create: `randevu-sistemi/wrangler.jsonc`
- Create: `randevu-sistemi/worker-configuration.d.ts`
- Create: `randevu-sistemi/index.html`
- Create: `randevu-sistemi/src/worker/index.ts`
- Create: `randevu-sistemi/src/worker/app.ts`
- Create: `randevu-sistemi/src/worker/middleware/security.ts`
- Create: `randevu-sistemi/src/client/main.tsx`
- Create: `randevu-sistemi/src/client/App.tsx`
- Create: `randevu-sistemi/tests/setup-ui.ts`
- Test: `randevu-sistemi/tests/worker/security-headers.test.ts`
- Test: `randevu-sistemi/tests/ui/app-shell.test.tsx`

**Interfaces:**

- Produces: `createApp(): Hono<{ Bindings: Env }>`
- Produces: Worker default export with `fetch()` and `scheduled()`
- Produces: `applySecurityHeaders(response: Response, isApi: boolean): Response`

- [ ] **Step 1: Create the package and strict configuration**

Use these scripts and dependencies in `package.json`:

```json
{
  "name": "seans-takvimi",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "npm run test:worker && npm run test:ui",
    "test:worker": "vitest run --config vitest.worker.config.ts",
    "test:ui": "vitest run --config vitest.ui.config.ts",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy"
  }
}
```

Run:

```bash
cd randevu-sistemi
npm install react react-dom react-router-dom hono zod date-fns @block65/webcrypto-web-push pdf-lib @pdf-lib/fontkit exceljs
npm install -D typescript vite @vitejs/plugin-react @cloudflare/vite-plugin wrangler vitest @cloudflare/vitest-pool-workers @testing-library/react @testing-library/jest-dom jsdom vite-plugin-pwa playwright cheerio @types/react @types/react-dom
```

- [ ] **Step 2: Write failing security and shell tests**

```ts
// tests/worker/security-headers.test.ts
import { SELF } from "cloudflare:test";
import { expect, it } from "vitest";

it("marks every response as non-indexable", async () => {
  const response = await SELF.fetch("https://example.test/api/health");
  expect(response.headers.get("X-Robots-Tag"))
    .toBe("noindex, nofollow, noarchive");
});
```

```tsx
// tests/ui/app-shell.test.tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "../../src/client/App";

it("renders the application title", () => {
  render(<App />);
  expect(screen.getByText("Seans Takvimi")).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the tests and confirm failure**

Run:

```bash
npm run test:worker
npm run test:ui
```

Expected: FAIL because the Worker and React shell do not exist.

- [ ] **Step 4: Add the smallest Worker and React shell**

```ts
// src/worker/app.ts
import { Hono } from "hono";
import { securityHeaders } from "./middleware/security";

export function createApp() {
  const app = new Hono<{ Bindings: Env }>();
  app.use("*", securityHeaders);
  app.get("/api/health", (c) => c.json({ ok: true }));
  return app;
}
```

```ts
// src/worker/middleware/security.ts
import type { MiddlewareHandler } from "hono";

export const securityHeaders: MiddlewareHandler = async (c, next) => {
  await next();
  c.header("X-Robots-Tag", "noindex, nofollow, noarchive");
  if (c.req.path.startsWith("/api/")) {
    c.header("Cache-Control", "no-store");
  }
};
```

```ts
// src/worker/index.ts
import { createApp } from "./app";

const app = createApp();

export default {
  fetch: app.fetch,
  async scheduled(): Promise<void> {}
} satisfies ExportedHandler;
```

```tsx
// src/client/App.tsx
export default function App() {
  return <main><h1>Seans Takvimi</h1></main>;
}
```

Configure Vite with `cloudflare()` and React. Use this local-safe Wrangler
configuration; Task 16 replaces the local D1 UUID with the ID returned by
Cloudflare resource creation:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "seans-takvimi-7f3c91",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2026-07-27",
  "assets": {
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/api/*"]
  },
  "d1_databases": [{
    "binding": "DB",
    "database_name": "seans-takvimi-db",
    "database_id": "11111111-1111-1111-1111-111111111111",
    "migrations_dir": "migrations"
  }],
  "r2_buckets": [{
    "binding": "BACKUPS",
    "bucket_name": "seans-takvimi-backups"
  }],
  "triggers": { "crons": ["*/15 * * * *"] }
}
```

Inject the noindex meta tag into `index.html`. Configure
`tests/setup-ui.ts` to import `@testing-library/jest-dom/vitest`, and reference
it from `vitest.ui.config.ts`.

- [ ] **Step 5: Verify foundation**

Run:

```bash
npm test
npm run typecheck
npm run build
```

Expected: all tests PASS and `dist/` is produced.

- [ ] **Step 6: Commit**

```bash
git add randevu-sistemi
git commit -m "feat: scaffold Cloudflare appointment app"
```

---

### Task 2: D1 Schema, Shared Contracts, and Audit Primitive

**Files:**

- Create: `randevu-sistemi/migrations/0001_initial.sql`
- Create: `randevu-sistemi/src/shared/constants.ts`
- Create: `randevu-sistemi/src/shared/contracts.ts`
- Create: `randevu-sistemi/src/shared/date.ts`
- Create: `randevu-sistemi/src/worker/db.ts`
- Create: `randevu-sistemi/src/worker/domain-types.ts`
- Create: `randevu-sistemi/src/worker/audit/repository.ts`
- Test: `randevu-sistemi/tests/worker/schema.test.ts`
- Test: `randevu-sistemi/tests/worker/date.test.ts`

**Interfaces:**

- Produces: `APPOINTMENT_SLOTS`, `APPOINTMENT_STATUSES`, `USER_ROLES`
- Produces: `todayInIstanbul(now?: Date): string`
- Produces: `appendAudit(db, event): Promise<void>`
- Produces: D1 tables listed in the design specification

- [ ] **Step 1: Write schema and date tests first**

```ts
// tests/worker/date.test.ts
import { expect, it } from "vitest";
import { todayInIstanbul } from "../../src/shared/date";

it("uses the Istanbul calendar date", () => {
  expect(todayInIstanbul(new Date("2026-07-26T22:30:00Z"))).toBe("2026-07-27");
});
```

```ts
// tests/worker/schema.test.ts
import { env } from "cloudflare:workers";
import { expect, it } from "vitest";

it("creates every required table", async () => {
  const rows = await env.DB.prepare(
    "SELECT name FROM sqlite_master WHERE type='table'"
  ).all<{ name: string }>();
  const names = rows.results.map((row) => row.name);
  expect(names).toEqual(expect.arrayContaining([
    "users", "sessions", "push_subscriptions", "clients", "appointments",
    "availability_blocks", "holidays", "duty_delegations", "reminder_tasks",
    "notification_deliveries", "audit_log", "backup_registry"
  ]));
});
```

- [ ] **Step 2: Run tests and confirm missing schema**

Run:

```bash
npm run test:worker -- tests/worker/schema.test.ts tests/worker/date.test.ts
```

Expected: FAIL for missing migration and helpers.

- [ ] **Step 3: Create the normalized schema**

`0001_initial.sql` must include foreign keys, UTC millisecond timestamps, soft
delete columns, and this partial uniqueness rule:

```sql
CREATE UNIQUE INDEX appointments_active_slot_unique
ON appointments(appointment_date, appointment_time)
WHERE deleted_at IS NULL;
```

Use constrained text values:

```sql
status TEXT NOT NULL CHECK (
  status IN ('SCHEDULED','ATTENDED','DOUBLE_ATTENDED',
             'NO_SHOW_PLANNED','NO_SHOW_UNINFORMED')
)
```

Make `audit_log` append-only at the application interface: export only
`appendAudit`; do not export update or delete functions.

- [ ] **Step 4: Add shared constants and date functions**

```ts
export const APPOINTMENT_SLOTS =
  ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] as const;

export const APPOINTMENT_STATUSES = [
  "SCHEDULED", "ATTENDED", "DOUBLE_ATTENDED",
  "NO_SHOW_PLANNED", "NO_SHOW_UNINFORMED"
] as const;
```

Use `Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" })` for
business dates and keep all audit timestamps in UTC milliseconds.

- [ ] **Step 5: Apply local migrations and verify**

Run:

```bash
npx wrangler d1 migrations apply DB --local
npm run test:worker -- tests/worker/schema.test.ts tests/worker/date.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add randevu-sistemi/migrations randevu-sistemi/src/shared randevu-sistemi/src/worker
git add randevu-sistemi/tests/worker/schema.test.ts randevu-sistemi/tests/worker/date.test.ts
git commit -m "feat: add normalized appointment database"
```

---

### Task 3: Secure PIN Login and Revocable Device Sessions

**Files:**

- Create: `randevu-sistemi/src/worker/auth/crypto.ts`
- Create: `randevu-sistemi/src/worker/auth/repository.ts`
- Create: `randevu-sistemi/src/worker/auth/service.ts`
- Create: `randevu-sistemi/src/worker/auth/routes.ts`
- Create: `randevu-sistemi/src/worker/middleware/auth.ts`
- Create: `randevu-sistemi/src/client/pages/LoginPage.tsx`
- Create: `randevu-sistemi/src/client/features/auth/session.ts`
- Test: `randevu-sistemi/tests/worker/auth.test.ts`
- Test: `randevu-sistemi/tests/ui/login.test.tsx`

**Interfaces:**

- Produces: `hashPin(pin, salt, pepper): Promise<string>`
- Produces: `login(username, pin, deviceLabel, now): Promise<LoginResult>`
- Produces: `requireSession(c): Promise<AuthenticatedUser>`
- Produces: `/api/auth/login`, `/api/auth/session`, `/api/auth/logout`

- [ ] **Step 1: Write failing authentication tests**

Cover successful login, HttpOnly cookie, wrong PIN, five-attempt lock for exactly
15 minutes, session renewal, logout and remote revocation:

```ts
it("locks the account for 15 minutes after five failures", async () => {
  for (let i = 0; i < 5; i++) await attempt("dilara", "000000");
  const result = await attempt("dilara", "123456");
  expect(result).toMatchObject({ ok: false, code: "ACCOUNT_LOCKED" });
});
```

- [ ] **Step 2: Confirm tests fail**

Run:

```bash
npm run test:worker -- tests/worker/auth.test.ts
```

Expected: FAIL because auth services are missing.

- [ ] **Step 3: Implement PIN and session primitives**

Use PBKDF2-SHA-256 with 100,000 iterations through `crypto.subtle`, a random
16-byte user salt, and `PIN_PEPPER` from Worker secrets. Generate 32-byte random
session tokens; store only their SHA-256 digest in D1.

Set the cookie:

```ts
const cookie = [
  `session=${token}`,
  "Path=/",
  "HttpOnly",
  "Secure",
  "SameSite=Strict",
  "Max-Age=31536000"
].join("; ");
```

Renew `expires_at` after authenticated use so regularly used devices do not ask
for PIN again. Record device label, created time, last-seen time and revocation.

- [ ] **Step 4: Add API and login UI**

Validate login input with Zod:

```ts
export const LoginRequest = z.object({
  username: z.string().trim().toLocaleLowerCase("tr-TR"),
  pin: z.string().regex(/^\d{6}$/),
  deviceLabel: z.string().trim().min(1).max(80)
});
```

The login UI must use numeric input, show remaining lock time, and never retain
the PIN in local storage.

- [ ] **Step 5: Verify**

Run:

```bash
npm run test:worker -- tests/worker/auth.test.ts
npm run test:ui -- tests/ui/login.test.tsx
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add randevu-sistemi/src/worker/auth randevu-sistemi/src/worker/middleware/auth.ts
git add randevu-sistemi/src/client/pages/LoginPage.tsx randevu-sistemi/src/client/features/auth
git add randevu-sistemi/tests
git commit -m "feat: add secure persistent device login"
```

---

### Task 4: Client Identity, Turkish Normalization, and Search

**Files:**

- Create: `randevu-sistemi/src/worker/clients/normalize.ts`
- Create: `randevu-sistemi/src/worker/clients/repository.ts`
- Create: `randevu-sistemi/src/worker/clients/service.ts`
- Create: `randevu-sistemi/src/worker/clients/routes.ts`
- Test: `randevu-sistemi/tests/worker/clients.test.ts`

**Interfaces:**

- Produces: `normalizeClientName(value: string): { displayName: string; searchName: string }`
- Produces: `findClients(query: string): Promise<ClientSearchResult[]>`
- Produces: `/api/clients?query=`, `/api/clients/:id/history`

- [ ] **Step 1: Write normalization and search tests**

```ts
it.each([
  ["  şule   ışık ", "ŞULE IŞIK"],
  ["ilker izci", "İLKER İZCİ"],
  ["iLkEr İZCİ", "İLKER İZCİ"]
])("normalizes %s", (input, expected) => {
  expect(normalizeClientName(input).displayName).toBe(expected);
});
```

Verify that `ilker`, `İLKER` and `ılker` do not create accidental duplicate
search behavior, while existing client selection always uses the UUID.

- [ ] **Step 2: Run and confirm failure**

Run:

```bash
npm run test:worker -- tests/worker/clients.test.ts
```

- [ ] **Step 3: Implement deterministic normalization**

Apply `trim`, collapse Unicode whitespace, normalize to NFC, convert with
`toLocaleUpperCase("tr-TR")`, and store a diacritic-preserving `search_name`.
Search with escaped SQL `LIKE` against `search_name`; never interpolate raw SQL.

- [ ] **Step 4: Add client routes and history ordering**

History response:

```ts
type ClientHistoryResponse = {
  client: { id: string; displayName: string };
  restrictionEndsOn: string | null;
  upcoming: AppointmentSummary[];
  past: AppointmentSummary[];
};
```

Order upcoming ascending and past descending.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/clients.test.ts
npm run typecheck
git add randevu-sistemi/src/worker/clients randevu-sistemi/tests/worker/clients.test.ts
git commit -m "feat: add normalized client identity and search"
```

---

### Task 5: Appointment Rules, Concurrency, Movement, and No-Show Restriction

**Files:**

- Create: `randevu-sistemi/src/worker/appointments/repository.ts`
- Create: `randevu-sistemi/src/worker/appointments/rules.ts`
- Create: `randevu-sistemi/src/worker/appointments/service.ts`
- Create: `randevu-sistemi/src/worker/appointments/routes.ts`
- Test: `randevu-sistemi/tests/worker/appointments.test.ts`
- Test: `randevu-sistemi/tests/worker/no-show-restriction.test.ts`

**Interfaces:**

- Produces: `createAppointment(input, actor): Promise<Appointment>`
- Produces: `moveAppointment(id, date, time, actor): Promise<Appointment>`
- Produces: `changeAppointmentStatus(id, status, actor): Promise<Appointment>`
- Produces: `restrictionEnd(finalizedHistory): string | null`
- Produces: `/api/appointments` CRUD routes and `/api/calendar`

- [ ] **Step 1: Write failing rule tests**

Cover allowed slot validation, weekday validation, duplicate active slot,
soft-delete reuse, movement audit, status correction and double-session storage.

```ts
it("allows booking on the exact restriction end date", () => {
  expect(canBookOn("2026-09-05", "2026-09-05")).toBe(true);
});

it("blocks the day before restriction end", () => {
  expect(canBookOn("2026-09-04", "2026-09-05")).toBe(false);
});
```

- [ ] **Step 2: Confirm tests fail**

```bash
npm run test:worker -- tests/worker/appointments.test.ts tests/worker/no-show-restriction.test.ts
```

- [ ] **Step 3: Implement pure business rules**

Use `addMonths(parseISO(secondNoShowDate), 1)` and format back to `YYYY-MM-DD`.
Filter out `SCHEDULED`; examine the last two finalized outcomes only. Recalculate
after every status correction.

Map D1 uniqueness failures to:

```json
{
  "error": {
    "code": "SLOT_TAKEN",
    "message": "Bu saat başka bir kullanıcı tarafından dolduruldu."
  }
}
```

- [ ] **Step 4: Implement transactional service operations**

Each write must execute the appointment change and `appendAudit` in one D1 batch.
Return the committed row; do not return optimistic client IDs.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/appointments.test.ts tests/worker/no-show-restriction.test.ts
npm run typecheck
git add randevu-sistemi/src/worker/appointments randevu-sistemi/tests/worker
git commit -m "feat: enforce appointment and no-show rules"
```

---

### Task 6: Holidays, Leave, Supervision, and Conflict Detection

**Files:**

- Create: `randevu-sistemi/scripts/generate-holidays.mjs`
- Create: `randevu-sistemi/migrations/0002_holidays_2026_2035.sql`
- Create: `randevu-sistemi/src/worker/availability/repository.ts`
- Create: `randevu-sistemi/src/worker/availability/service.ts`
- Create: `randevu-sistemi/src/worker/availability/routes.ts`
- Test: `randevu-sistemi/tests/worker/availability.test.ts`
- Test: `randevu-sistemi/tests/worker/holidays.test.ts`

**Interfaces:**

- Produces: `isSlotAvailable(date, time): Promise<AvailabilityResult>`
- Produces: `createAvailabilityBlock(input, actor): Promise<Block>`
- Produces: `listConflictingAppointments(block): Promise<AppointmentSummary[]>`
- Produces: `/api/availability`, `/api/holidays`, `/api/availability/conflicts`

- [ ] **Step 1: Write failing holiday and block tests**

Verify:

- 29 October closes every slot.
- 28 October closes `14:00`, `15:00`, `16:00` only.
- Full-day leave closes every slot in its inclusive date range.
- Exact `SÜPERVİZYON` creates a non-reportable block.
- A value matching `/^[—–-]+$/` creates a non-reportable block.
- A newly created block returns existing appointment conflicts without deleting them.

- [ ] **Step 2: Generate and review the holiday migration**

The generator must emit fixed holidays for every year 2026–2035:

```js
const fixed = [
  ["01-01", "Yılbaşı", "FULL"],
  ["04-23", "Ulusal Egemenlik ve Çocuk Bayramı", "FULL"],
  ["05-01", "Emek ve Dayanışma Günü", "FULL"],
  ["05-19", "Atatürk'ü Anma, Gençlik ve Spor Bayramı", "FULL"],
  ["07-15", "Demokrasi ve Millî Birlik Günü", "FULL"],
  ["08-30", "Zafer Bayramı", "FULL"],
  ["10-28", "Cumhuriyet Bayramı Arifesi", "AFTERNOON"],
  ["10-29", "Cumhuriyet Bayramı", "FULL"]
];
```

At development time, `generate-holidays.mjs` must fetch the yearly
`Resmi Tatiller` links exposed by the T.C. Diyanet Vakit Hesaplama navigation at
`https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=185`. Parse the
2026–2035 pages with Cheerio, retain only official full-day and half-day holiday
rows, normalize them to `{ date, name, period }`, merge them with the fixed list
above, and fail generation when:

- any year from 2026 through 2035 is missing;
- a year has no Ramazan Bayramı or Kurban Bayramı;
- an arife row is not `AFTERNOON`;
- the same date is emitted twice with conflicting periods.

Commit the generated SQL so production never contacts the Diyanet site or any
live holiday API. Run this duplicate check before continuing:

```sql
SELECT holiday_date, COUNT(*)
FROM holidays
GROUP BY holiday_date
HAVING COUNT(*) > 1;
```

Expected: zero rows.

- [ ] **Step 3: Confirm tests fail, then implement availability**

```bash
npm run test:worker -- tests/worker/availability.test.ts tests/worker/holidays.test.ts
```

`isSlotAvailable` must check weekend, holiday period, psychologist leave,
supervision/manual block and existing active appointment in that order.

- [ ] **Step 4: Add end-of-data warning**

Return an admin warning beginning 1 January 2035:

```json
{
  "code": "HOLIDAY_DATA_EXPIRES",
  "message": "Resmî tatil takvimi 2035 sonunda bitiyor."
}
```

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/availability.test.ts tests/worker/holidays.test.ts
npm run typecheck
git add randevu-sistemi/scripts/generate-holidays.mjs randevu-sistemi/migrations
git add randevu-sistemi/src/worker/availability randevu-sistemi/tests/worker
git commit -m "feat: add holidays leave and blocked slots"
```

---

### Task 7: Secretary Duty Delegation

**Files:**

- Create: `randevu-sistemi/src/worker/duty/repository.ts`
- Create: `randevu-sistemi/src/worker/duty/service.ts`
- Create: `randevu-sistemi/src/worker/duty/routes.ts`
- Create: `randevu-sistemi/src/worker/notifications/port.ts`
- Create: `randevu-sistemi/src/client/pages/DutyPage.tsx`
- Test: `randevu-sistemi/tests/worker/duty.test.ts`
- Test: `randevu-sistemi/tests/ui/duty.test.tsx`

**Interfaces:**

- Produces: `activeSecretary(date): Promise<User>`
- Produces: `delegateDuty(input, actor): Promise<DutyDelegation>`
- Produces: `reclaimDuty(delegationId, actor): Promise<DutyDelegation>`
- Produces: `NotificationPort.notify(userId, message): Promise<void>`
- Produces: `/api/duty/current`, `/api/duty/delegate`, `/api/duty/reclaim`

- [ ] **Step 1: Write failing delegation tests**

Cover Dilara default, required Medine/Ecem delegate, inclusive date range, no work
push to Dilara during leave, early reclaim and admin override.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/duty.test.ts
npm run test:ui -- tests/ui/duty.test.tsx
```

- [ ] **Step 3: Implement delegation state**

Reject missing delegate:

```ts
const DelegateDutyRequest = z.object({
  startsOn: IsoDate,
  endsOn: IsoDate,
  delegateUserId: z.string().uuid(),
  reason: z.enum(["LEAVE", "TEMPORARY_ASSIGNMENT"])
});
```

Require the delegate to be active and to have username `medine` or `ecem`.
Audit every creation, override and early reclaim. Define the notification
boundary without depending on the later Web Push implementation:

```ts
export interface NotificationPort {
  notify(userId: string, message: {
    title: string;
    body: string;
    url: string;
  }): Promise<void>;
}
```

Send the manager the approved leave/delegate message and an early-return message
through this port. Tests inject a recording fake; Task 8 binds it to Web Push.

- [ ] **Step 4: Add mobile duty screen**

Show date range, Medine/Ecem selection, current responsible person and
`Görevi geri al`. Keep calendar access available to the leave user.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/duty.test.ts
npm run test:ui -- tests/ui/duty.test.tsx
git add randevu-sistemi/src/worker/duty randevu-sistemi/src/client/pages/DutyPage.tsx
git add randevu-sistemi/tests
git commit -m "feat: add secretary duty delegation"
```

---

### Task 8: PWA Installation and Web Push Delivery

**Files:**

- Create: `randevu-sistemi/public/manifest.webmanifest`
- Create: `randevu-sistemi/public/icons/icon-192.png`
- Create: `randevu-sistemi/public/icons/icon-512.png`
- Create: `randevu-sistemi/public/icons/icon-maskable-512.png`
- Create: `randevu-sistemi/src/client/sw.ts`
- Create: `randevu-sistemi/src/client/features/notifications/push.ts`
- Create: `randevu-sistemi/src/client/features/notifications/NotificationSetup.tsx`
- Create: `randevu-sistemi/src/worker/push/repository.ts`
- Create: `randevu-sistemi/src/worker/push/service.ts`
- Create: `randevu-sistemi/src/worker/push/routes.ts`
- Create: `randevu-sistemi/scripts/generate-vapid.mjs`
- Test: `randevu-sistemi/tests/worker/push.test.ts`
- Test: `randevu-sistemi/tests/ui/notification-setup.test.tsx`

**Interfaces:**

- Produces: `subscribeForPush(registration): Promise<PushSubscription>`
- Produces: `sendPush(userId, message): Promise<PushSendResult>`
- Produces: `/api/push/public-key`, `/api/push/subscriptions`, `/api/push/test`
- Consumes: `NotificationPort` from Task 7

- [ ] **Step 1: Write failing push tests**

Mock the subscription endpoint and verify VAPID payload creation, success logging,
410 subscription removal and no notification to revoked devices.

```ts
it("removes an expired push subscription after HTTP 410", async () => {
  fetchMock.mockResolvedValue(new Response(null, { status: 410 }));
  await sendPush(userId, message);
  expect(await repository.find(subscriptionId)).toBeNull();
});
```

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/push.test.ts
npm run test:ui -- tests/ui/notification-setup.test.tsx
```

- [ ] **Step 3: Implement standard Web Push**

Use `buildPushPayload` from `@block65/webcrypto-web-push` with
`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` and `VAPID_SUBJECT` Worker secrets.
Send with `fetch(subscription.endpoint, payload)`. Store endpoint, `p256dh`,
`auth`, device session ID and last success/failure.

Implement `WebPushNotificationPort` by calling `sendPush` and inject it into the
duty service. Re-run the Task 7 tests with this adapter plus a mocked push
endpoint to prove delegation and early-return messages reach the manager.

- [ ] **Step 4: Implement the service worker**

```ts
self.addEventListener("push", (event) => {
  const payload = event.data?.json();
  event.waitUntil(self.registration.showNotification(payload.title, {
    body: payload.body,
    data: { url: payload.url, taskId: payload.taskId },
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png"
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
```

Request permission only after a user button press and explain iPhone Home Screen
installation before asking.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/push.test.ts
npm run test:ui -- tests/ui/notification-setup.test.tsx
npm run build
git add randevu-sistemi
git commit -m "feat: add installable PWA web push"
```

---

### Task 9: Reminder State Machine and Scheduled Processing

**Files:**

- Create: `randevu-sistemi/src/worker/reminders/repository.ts`
- Create: `randevu-sistemi/src/worker/reminders/state-machine.ts`
- Create: `randevu-sistemi/src/worker/reminders/service.ts`
- Create: `randevu-sistemi/src/worker/reminders/routes.ts`
- Modify: `randevu-sistemi/src/worker/index.ts`
- Test: `randevu-sistemi/tests/worker/reminders.test.ts`
- Test: `randevu-sistemi/tests/worker/reminder-schedule.test.ts`

**Interfaces:**

- Produces: `processReminderTick(now: Date): Promise<ReminderRunSummary>`
- Produces: `answerReminder(taskId, answer, actor): Promise<ReminderTask>`
- Produces: `/api/reminders/pending`, `/api/reminders/:id/answer`
- Consumes: `activeSecretary`, `sendPush`, holiday and business-date helpers

- [ ] **Step 1: Write table-driven schedule tests**

Test exact Istanbul instants for 16:45, 17:00, 17:15 and next business day 08:45.
Cover Friday-to-Monday, full holiday skip, no duplicate send, Yes before 08:45,
No, no answer and duty transfer while a task is open.

```ts
it.each([
  ["2026-07-27T13:45:00Z", "INITIAL_1645"],
  ["2026-07-27T14:00:00Z", "FOLLOWUP_1700"],
  ["2026-07-27T14:15:00Z", "FINAL_1715"]
])("emits %s at %s", async (utc, expectedStage) => {
  const result = await processReminderTick(new Date(utc));
  expect(result.sentStages).toContain(expectedStage);
});
```

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/reminders.test.ts tests/worker/reminder-schedule.test.ts
```

- [ ] **Step 3: Implement idempotent state transitions**

Use a unique index on `(task_date, stage)` in `notification_deliveries`. Create
daily tasks only on weekday, non-full-holiday dates. A task remains open until
Yes; morning follow-up includes the original date.

Admin completion message format:

```ts
`${formatTurkishDate(task.taskDate)} tarihli talepler ${actor.displayName} tarafından çağrı merkezine iletildi.`
```

- [ ] **Step 4: Wire the scheduled handler**

Configure one Cron trigger every 15 minutes. `scheduled()` calls reminder
processing and records its summary. Task 14 extends the same handler with the
nightly backup due check.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/reminders.test.ts tests/worker/reminder-schedule.test.ts
npm run typecheck
git add randevu-sistemi/src/worker/reminders randevu-sistemi/src/worker/index.ts
git add randevu-sistemi/tests/worker randevu-sistemi/wrangler.jsonc
git commit -m "feat: add secretary reminder workflow"
```

---

### Task 10: Weekly and Daily Calendar UI

**Files:**

- Create: `randevu-sistemi/src/client/api.ts`
- Create: `randevu-sistemi/src/client/pages/CalendarPage.tsx`
- Create: `randevu-sistemi/src/client/features/calendar/WeekGrid.tsx`
- Create: `randevu-sistemi/src/client/features/calendar/DayView.tsx`
- Create: `randevu-sistemi/src/client/features/calendar/AppointmentDialog.tsx`
- Create: `randevu-sistemi/src/client/features/calendar/StatusDialog.tsx`
- Create: `randevu-sistemi/src/client/features/calendar/calendar.css`
- Test: `randevu-sistemi/tests/ui/calendar.test.tsx`
- Test: `randevu-sistemi/tests/ui/appointment-dialog.test.tsx`

**Interfaces:**

- Consumes: `/api/calendar`, appointment and client endpoints
- Produces: default weekly grid and day-detail navigation

- [ ] **Step 1: Write failing UI interaction tests**

```tsx
it("opens daily view when the user taps SALI 28", async () => {
  render(<CalendarPage initialWeek="2026-07-27" />);
  await user.click(screen.getByRole("button", { name: /salı 28/i }));
  expect(screen.getByRole("button", { name: /haftalık görünüme geç/i }))
    .toBeVisible();
});
```

Also test week arrows, empty-slot direct dialog, moved appointment, closed slot,
double-session label and server conflict refresh.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:ui -- tests/ui/calendar.test.tsx tests/ui/appointment-dialog.test.tsx
```

- [ ] **Step 3: Implement the approved mobile layout**

Weekly view is the default. Day headings are buttons. Daily view has six large
slot buttons and a `Haftalık görünüme geç` button. Use both text and color for
status; touch targets must be at least 44 CSS pixels.

- [ ] **Step 4: Implement confirmed writes**

`api.ts` parses every response through the Zod contract. Do not update local
calendar state until the API returns the committed appointment. On
`SLOT_TAKEN`, refetch the week and show the Turkish error.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:ui -- tests/ui/calendar.test.tsx tests/ui/appointment-dialog.test.tsx
npm run build
git add randevu-sistemi/src/client randevu-sistemi/tests/ui
git commit -m "feat: add weekly and daily appointment calendar"
```

---

### Task 11: Client Search and Appointment Status UI

**Files:**

- Create: `randevu-sistemi/src/client/pages/SearchPage.tsx`
- Create: `randevu-sistemi/src/client/features/search/ClientSearch.tsx`
- Create: `randevu-sistemi/src/client/features/search/ClientHistory.tsx`
- Create: `randevu-sistemi/src/client/features/search/search.css`
- Test: `randevu-sistemi/tests/ui/search.test.tsx`
- Test: `randevu-sistemi/tests/ui/status-dialog.test.tsx`

**Interfaces:**

- Consumes: client search/history and appointment status endpoints
- Produces: all-user search and status change interaction

- [ ] **Step 1: Write failing tests**

Test Turkish name search, existing/new client choice, upcoming ascending, past
descending, status labels, restriction end date and status correction.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:ui -- tests/ui/search.test.tsx tests/ui/status-dialog.test.tsx
```

- [ ] **Step 3: Implement search and history**

Debounce text input by 250 ms, show exact client names, and keep separate IDs
even when display names match. History rows must include date, time and Turkish
status label.

- [ ] **Step 4: Implement status actions**

Show `Geldi`, `Çift Seans`, `Haberli İptal`, `Habersiz İptal`. After server
confirmation, refresh both calendar and client restriction badge.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:ui -- tests/ui/search.test.tsx tests/ui/status-dialog.test.tsx
git add randevu-sistemi/src/client/pages/SearchPage.tsx
git add randevu-sistemi/src/client/features/search randevu-sistemi/tests/ui
git commit -m "feat: add client history and status workflow"
```

---

### Task 12: Admin Reports, PDF, and Excel

**Files:**

- Create: `randevu-sistemi/src/worker/appointments/report-query.ts`
- Create: `randevu-sistemi/src/worker/appointments/report-routes.ts`
- Create: `randevu-sistemi/src/client/pages/ReportsPage.tsx`
- Create: `randevu-sistemi/src/client/features/reports/export-pdf.ts`
- Create: `randevu-sistemi/src/client/features/reports/export-excel.ts`
- Create: `randevu-sistemi/public/fonts/NotoSans-Regular.ttf`
- Test: `randevu-sistemi/tests/worker/reports.test.ts`
- Test: `randevu-sistemi/tests/ui/reports.test.tsx`
- Test: `randevu-sistemi/tests/ui/report-exports.test.ts`

**Interfaces:**

- Produces: `getReport(range, actor): Promise<ReportData>`
- Produces: `createReportPdf(data): Promise<Uint8Array>`
- Produces: `createReportWorkbook(data): Promise<ArrayBuffer>`
- Produces: `/api/reports?from=YYYY-MM-DD&to=YYYY-MM-DD`

- [ ] **Step 1: Write exact counting tests**

Seed one of each status plus leave, holiday, supervision, dash block and deleted
appointment. Assert:

```ts
expect(report.counts).toEqual({
  scheduled: 1,
  attended: 1,
  doubleAttended: 1,
  plannedCancellation: 1,
  uninformedNoShow: 1,
  performedTransactions: 2
});
```

Assert secretary receives HTTP 403 and admin receives HTTP 200.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/reports.test.ts
npm run test:ui -- tests/ui/reports.test.tsx tests/ui/report-exports.test.ts
```

- [ ] **Step 3: Implement report query and page**

Filter on `appointment_date`, exclude soft-deleted rows and non-appointment
blocks. Return summary and detail rows `{ clientName, date, time, status }`.

- [ ] **Step 4: Implement export modules**

Load pdf-lib/fontkit and ExcelJS only when the user taps download. Embed
Noto Sans for Turkish text. Excel workbook sheets are exactly `Özet` and
`Ayrıntı`; PDF contains the same totals and detail rows.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/reports.test.ts
npm run test:ui -- tests/ui/reports.test.tsx tests/ui/report-exports.test.ts
npm run build
git add randevu-sistemi/src/worker/appointments randevu-sistemi/src/client
git add randevu-sistemi/public/fonts randevu-sistemi/tests
git commit -m "feat: add admin reports PDF and Excel"
```

---

### Task 13: Admin User, Session, Audit, and Notification Health Screens

**Files:**

- Create: `randevu-sistemi/src/worker/admin/routes.ts`
- Create: `randevu-sistemi/src/worker/admin/service.ts`
- Create: `randevu-sistemi/src/client/pages/AdminPage.tsx`
- Create: `randevu-sistemi/src/client/features/admin/UserManagement.tsx`
- Create: `randevu-sistemi/src/client/features/admin/DeviceSessions.tsx`
- Create: `randevu-sistemi/src/client/features/admin/AuditLog.tsx`
- Create: `randevu-sistemi/src/client/features/admin/NotificationHealth.tsx`
- Test: `randevu-sistemi/tests/worker/admin.test.ts`
- Test: `randevu-sistemi/tests/ui/admin.test.tsx`

**Interfaces:**

- Produces: user create/disable/PIN reset routes
- Produces: device session revoke routes
- Produces: paginated audit and notification-health routes

- [ ] **Step 1: Write failing admin authorization tests**

Test that only admin can create users, reset PIN, revoke sessions, list audit,
override duty and see notification failures. Test that audit rows cannot be
updated or deleted through any route.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/admin.test.ts
npm run test:ui -- tests/ui/admin.test.tsx
```

- [ ] **Step 3: Implement admin services**

Every sensitive action requires the current admin session. PIN reset creates a
new salt/hash and revokes all sessions belonging to that user. Audit pagination
uses `(created_at, id)` cursor ordering.

- [ ] **Step 4: Implement admin UI**

Group controls into `Kullanıcılar`, `Telefon Oturumları`, `Bildirim Durumu`,
`Hareket Geçmişi` and `Görev Sorumlusu`. Destructive controls require a second
confirmation.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/admin.test.ts
npm run test:ui -- tests/ui/admin.test.tsx
git add randevu-sistemi/src/worker/admin randevu-sistemi/src/client/features/admin
git add randevu-sistemi/src/client/pages/AdminPage.tsx randevu-sistemi/tests
git commit -m "feat: add protected administration tools"
```

---

### Task 14: Encrypted R2 Backups and Guarded Restore

**Files:**

- Create: `randevu-sistemi/src/worker/backups/crypto.ts`
- Create: `randevu-sistemi/src/worker/backups/export.ts`
- Create: `randevu-sistemi/src/worker/backups/service.ts`
- Create: `randevu-sistemi/src/worker/backups/routes.ts`
- Create: `randevu-sistemi/src/client/features/admin/Backups.tsx`
- Modify: `randevu-sistemi/src/worker/index.ts`
- Test: `randevu-sistemi/tests/worker/backups.test.ts`
- Test: `randevu-sistemi/tests/worker/restore.test.ts`

**Interfaces:**

- Produces: `createBackup(now): Promise<BackupRecord>`
- Produces: `restoreBackup(id, adminPin): Promise<RestoreResult>`
- Produces: `/api/admin/backups`, download and restore routes

- [ ] **Step 1: Write failing backup tests**

Test AES-GCM round trip, tamper detection, nightly due check, günlük yedeklerin
90 gün saklanması, ay sonu yedeklerinin 12 ay saklanması, failure notification, pre-restore
safety backup and maintenance-mode write rejection.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/backups.test.ts tests/worker/restore.test.ts
```

- [ ] **Step 3: Implement deterministic snapshot and encryption**

Export tables in a fixed order with schema version and row counts:

```ts
type BackupEnvelope = {
  schemaVersion: 1;
  createdAt: number;
  tables: Record<string, unknown[]>;
  rowCounts: Record<string, number>;
};
```

Encrypt UTF-8 JSON with AES-256-GCM using `BACKUP_KEY`, a fresh 12-byte IV, and
store `{ version, iv, ciphertext }` in R2. Keep the key only as a Worker secret
and offline recovery record.

Extend `scheduled()` to call `createBackup` only once per Istanbul calendar day
after 02:00. The backup registry uniqueness key is the backup date, so repeated
15-minute Cron ticks cannot create duplicates.

- [ ] **Step 4: Implement guarded restore**

Set maintenance mode, verify current admin PIN, take a safety snapshot, decrypt
and validate schema/row counts, replace rows in foreign-key-safe D1 batches,
verify counts, append audit and clear maintenance mode in a `finally` block.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/backups.test.ts tests/worker/restore.test.ts
npm run typecheck
git add randevu-sistemi/src/worker/backups randevu-sistemi/src/client/features/admin/Backups.tsx
git add randevu-sistemi/tests/worker
git commit -m "feat: add encrypted backups and guarded restore"
```

---

### Task 15: Apps Script Export Conversion and Verified Import

**Files:**

- Create: `randevu-sistemi/scripts/convert-apps-script-export.mjs`
- Create: `randevu-sistemi/src/worker/migration/schemas.ts`
- Create: `randevu-sistemi/src/worker/migration/service.ts`
- Create: `randevu-sistemi/src/worker/migration/routes.ts`
- Create: `randevu-sistemi/src/client/features/admin/MigrationReview.tsx`
- Test: `randevu-sistemi/tests/fixtures/apps-script-export.json`
- Test: `randevu-sistemi/tests/worker/migration.test.ts`
- Test: `randevu-sistemi/tests/ui/migration-review.test.tsx`

**Interfaces:**

- Produces: `analyzeImport(payload): MigrationPreview`
- Produces: `commitImport(previewId, resolutions, actor): MigrationResult`
- Produces: admin-only preview and commit routes

- [ ] **Step 1: Capture an anonymous fixture and write failing tests**

Create a fixture covering every current status, future appointments, Turkish
names, duplicate spelling, invalid date and duplicate slot. Do not commit real
client names.

Assert preview totals, status distribution, candidate client groups, invalid rows
and slot conflicts. Assert commit refuses unresolved conflicts.

- [ ] **Step 2: Confirm failure**

```bash
npm run test:worker -- tests/worker/migration.test.ts
npm run test:ui -- tests/ui/migration-review.test.tsx
```

- [ ] **Step 3: Implement converter and preview**

Map existing statuses exactly:

```ts
const STATUS_MAP = {
  SCHEDULED: "SCHEDULED",
  ATTENDED: "ATTENDED",
  DOUBLE_ATTENDED: "DOUBLE_ATTENDED",
  NO_SHOW_PLANNED: "NO_SHOW_PLANNED",
  NO_SHOW_UNINFORMED: "NO_SHOW_UNINFORMED"
} as const;
```

Never discard an unknown row. Put it in `errors` with its original index and
reason. Keep exact normalized full names grouped but allow the admin to split
appointments into separate client IDs before import.

- [ ] **Step 4: Implement atomic import and verification**

Require a final Apps Script export after old-system write freeze. Create a
pre-import backup. Import resolved records, compare total rows and per-status
counts, and return a signed verification summary stored in audit.

- [ ] **Step 5: Verify and commit**

```bash
npm run test:worker -- tests/worker/migration.test.ts
npm run test:ui -- tests/ui/migration-review.test.tsx
git add randevu-sistemi/scripts randevu-sistemi/src/worker/migration
git add randevu-sistemi/src/client/features/admin/MigrationReview.tsx
git add randevu-sistemi/tests
git commit -m "feat: add verified Apps Script migration"
```

---

### Task 16: End-to-End Verification, Operations Docs, and Cloudflare Release

**Files:**

- Create: `randevu-sistemi/playwright.config.ts`
- Create: `randevu-sistemi/tests/e2e/calendar-flow.spec.ts`
- Create: `randevu-sistemi/tests/e2e/admin-flow.spec.ts`
- Create: `randevu-sistemi/tests/e2e/offline-flow.spec.ts`
- Create: `randevu-sistemi/docs/operations.md`
- Create: `randevu-sistemi/docs/iphone-install.md`
- Create: `randevu-sistemi/docs/acceptance-checklist.md`
- Modify: `randevu-sistemi/wrangler.jsonc`

**Interfaces:**

- Consumes: all prior tasks
- Produces: locally verified release, documented provisioning commands and
  user-run iPhone acceptance evidence

- [ ] **Step 1: Write end-to-end tests**

Calendar flow must log in, navigate weeks, open daily view, add/move/status an
appointment and search the client. Admin flow must deny a secretary report
route, export PDF/Excel, delegate duty and revoke a device. Offline flow must
show the exact no-save message and create no new database row.

```ts
test("offline booking is refused without a local ghost appointment", async ({ page, context }) => {
  await context.setOffline(true);
  await page.getByRole("button", { name: /randevu ekle/i }).click();
  await expect(page.getByText("İnternet bağlantısı yok; hiçbir değişiklik kaydedilmedi"))
    .toBeVisible();
});
```

- [ ] **Step 2: Run the complete local verification**

```bash
npm test
npm run typecheck
npm run build
npx playwright test
```

Expected: all commands exit 0.

- [ ] **Step 3: Write exact operating procedures**

`operations.md` must include:

- Cloudflare login and resource creation
- D1 migration commands
- R2 bucket binding
- `wrangler secret put` commands for PIN pepper, VAPID and backup keys
- first admin and secretary creation
- backup download and restore drill
- read-only old-system transition
- rollback to pre-import backup
- 2035 holiday warning response

`iphone-install.md` must include Safari open, Share, Add to Home Screen, first
login, Enable Notifications, test push and notification-settings diagnosis.

- [ ] **Step 4: Provision Cloudflare only after explicit approval**

Run the resource creation commands under the user's Cloudflare account, record
the generated D1 database ID and R2 bucket name in `wrangler.jsonc`, set secrets,
apply remote migrations and deploy with Worker name `seans-takvimi-7f3c91`.

Verify the production headers:

```powershell
$env:SEANS_TAKVIMI_URL = Read-Host 'Wrangler çıktısındaki tam https adresini yapıştırın'
curl.exe -I "$env:SEANS_TAKVIMI_URL/api/health"
```

Expected headers include:

```text
X-Robots-Tag: noindex, nofollow, noarchive
Cache-Control: no-store
```

- [ ] **Step 5: Complete real iPhone acceptance**

Use `docs/acceptance-checklist.md` to record:

- Home Screen installation on all four phones
- persistent login
- notification permission
- test push with app closed
- 16:45/17:00/17:15 simulated run
- next-business-day 08:45 simulated run
- Dilara-to-Medine and Dilara-to-Ecem delegation
- PDF and Excel download
- backup and restore drill using anonymous data

Do not import real data until every item passes.

- [ ] **Step 6: Import, compare, and cut over**

Freeze the Apps Script app for writes, take the final export, preview and resolve
all migration warnings, create a pre-import backup, commit import, compare totals
and status distribution, then enable the new system. Keep the old system
read-only for at least 30 days.

- [ ] **Step 7: Final verification and commit**

```bash
npm test
npm run typecheck
npm run build
npx playwright test
git add randevu-sistemi
git commit -m "docs: add release and acceptance procedures"
```

Expected: all verification commands pass; production acceptance checklist is
complete; no real client data exists in Git.

---

## Spec Coverage Map

| Approved design area | Implementation task |
|---|---|
| Cloudflare Worker, D1, R2, PWA and noindex | Tasks 1–2 |
| Personal PIN, persistent device sessions and server authorization | Task 3 |
| Turkish uppercase names, canonical clients and search | Tasks 4 and 11 |
| Appointment slots, movement, concurrency and status | Tasks 5 and 10 |
| Two uninformed no-shows and one-month restriction | Task 5 |
| Holidays, half days, leave, supervision and conflict list | Task 6 |
| Dilara/Medine/Ecem duty delegation and early reclaim | Tasks 7–8 |
| Closed-app iPhone Web Push | Task 8 |
| 16:45, 17:00, 17:15 and next-business-day 08:45 reminders | Task 9 |
| Approved weekly-to-daily mobile calendar | Task 10 |
| Admin-only detailed counts, PDF and Excel | Task 12 |
| User management, session revocation and immutable audit | Task 13 |
| Seven-day D1 recovery, günlük yedekleri 90 gün ve aylık yedekleri 12 ay saklama | Task 14 |
| Apps Script history/future migration and count verification | Task 15 |
| Offline failure behavior, production checks and iPhone acceptance | Task 16 |
