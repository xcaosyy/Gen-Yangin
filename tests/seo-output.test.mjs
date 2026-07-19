import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

function readDist(path) {
  return readFileSync(join(dist, path), "utf8");
}

function assertIncludes(file, expected) {
  const html = readDist(file);
  assert.ok(
    html.includes(expected),
    `Expected ${file} to include ${expected}`,
  );
}

function assertExists(path) {
  assert.ok(existsSync(join(root, path)), `Expected ${path} to exist`);
}

assertIncludes("index.html", '<link rel="canonical" href="https://genyangin.com/"');
assertIncludes("index.html", 'property="og:title"');
assertIncludes("index.html", '"@type":"LocalBusiness"');
assertExists("public/robots.txt");

const commercialRoutes = [
  "otel-yangin-yonetmeligi/index.html",
  "otel-itfaiye-uygunluk-raporu/index.html",
  "fabrika-yangin-yonetmeligi/index.html",
  "fabrika-itfaiye-uygunluk-raporu/index.html",
  "yangin-denetimi-revizyonu/index.html",
  "itfaiye-uygunluk-raporu/index.html",
  "yangin-danismanligi/index.html",
];

for (const route of commercialRoutes) {
  assertExists(join("dist", route));
  assertIncludes(route, "Denetimden kaldıysanız");
  assertIncludes(route, "Ücretsiz Ön Keşif");
}

const localRoutes = [
  "ege-bolgesi-yangin-danismanligi/index.html",
  "manisa-yangin-danismanligi/index.html",
  "izmir-yangin-danismanligi/index.html",
  "aydin-yangin-danismanligi/index.html",
  "denizli-yangin-danismanligi/index.html",
  "mugla-yangin-danismanligi/index.html",
  "balikesir-yangin-danismanligi/index.html",
];

for (const route of localRoutes) {
  assertExists(join("dist", route));
  assertIncludes(route, "Gen Yangın");
}

const guideRoutes = [
  "yangin-merdiveni-zorunlulugu/index.html",
  "kacis-mesafesi-hesaplama/index.html",
  "sprinkler-zorunlulugu/index.html",
  "yangin-kapisi-standartlari/index.html",
  "panik-bar-zorunlulugu/index.html",
  "duman-tahliye-sistemi/index.html",
  "acil-yonlendirme-ve-aydinlatma/index.html",
  "tahliye-projesi/index.html",
  "yangin-algilama-sistemi/index.html",
  "otel-yangin-guvenligi-kontrol-listesi/index.html",
  "fabrika-yangin-risk-analizi/index.html",
];

for (const route of guideRoutes) {
  assertExists(join("dist", route));
  assertIncludes(route, "Yangın Yönetmeliği Rehberi");
  assertIncludes(route, "Gen Yangın");
}

const layoutSource = readFileSync(join(root, "src/layouts/Layout.astro"), "utf8");
assert.ok(
  !layoutSource.includes("/mugla-yangin-danismanligi"),
  "City pages must not be listed in the global layout navigation",
);

console.log("SEO output checks passed.");
