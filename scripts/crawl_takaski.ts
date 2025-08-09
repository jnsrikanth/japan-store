/*
  Crawler for Takaski (non-invasive):
  - Respects robots.txt (no crawl if disallowed)
  - Rate limits requests (default 1 req/sec)
  - Extracts product title, price (USD), image URL, category by heuristics
  - Maps to our categories: electronics|gadgets|toys|gifts|snacks
  - Writes src/data/catalog.source.json with up to --perCat items per category

  Usage example:
    npm run crawl:takaski

  NOTE: Only run if you have permission and you accept site ToS. This is best-effort; site markup can change.
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import got from 'got';
import { load } from 'cheerio';
// Define CheerioAPI type without importing at runtime to avoid ESM named export issues
type CheerioAPI = ReturnType<typeof load>;
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'src', 'data', 'catalog.source.json');

const startUrl = getArg('--start') || 'https://www.takaski.com/';
const maxPages = Number(getArg('--max') || '500');
const rateMs = Number(getArg('--rate') || '1000');
const perCat = Number(getArg('--perCat') || '20');

const categoryMap = (title: string, url: string): 'electronics' | 'gadgets' | 'toys' | 'gifts' | 'snacks' => {
  const t = `${title} ${url}`.toLowerCase();
  if (/(console|camera|usb|rgb|headphone|earbud|electronic|lamp|led)/.test(t)) return 'electronics';
  if (/(bento|kitchen|home|mold|rice|cooker|organizer|gadget)/.test(t)) return 'gadgets';
  if (/(toy|gashapon|plush|figure|anime|ghibli|origami)/.test(t)) return 'toys';
  if (/(snack|biscuit|candy|matcha|tea|chocolate)/.test(t)) return 'snacks';
  return 'gifts';
};

function getArg(name: string) {
  const i = process.argv.indexOf(name);
  if (i >= 0 && i + 1 < process.argv.length) return process.argv[i + 1];
  return undefined;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function allowedByRobots(): Promise<boolean> {
  try {
    const robots = await got('https://www.takaski.com/robots.txt').text();
    // Very conservative: if Disallow: / present without Allow for /, bail.
    // Adjust as needed per actual robots content.
    if (/Disallow:\s*\//i.test(robots)) return false;
    return true;
  } catch {
    // If robots cannot be fetched, do not crawl.
    return false;
  }
}

function isProductPage($: CheerioAPI): boolean {
  // Heuristic: WooCommerce product schema or add-to-cart button
  return $('body').find('.single-product, form.cart, .woocommerce-product-gallery').length > 0;
}

function extractProduct($: CheerioAPI, url: string) {
  const title = $('h1.product_title, h1.entry-title').first().text().trim();
  if (!title) return null;
  let imageUrl = $('figure.woocommerce-product-gallery__wrapper img').first().attr('src')
    || $('meta[property="og:image"]').attr('content')
    || '';
  imageUrl = imageUrl.replace(/-\d+x\d+\./, '.'); // try original size
  const priceText = $('.summary .price, .price').first().text().trim();
  const usdMatch = priceText.match(/([0-9]+[.,][0-9]{2}|[0-9]+)/);
  const usd = usdMatch ? parseFloat(usdMatch[1].replace(',', '')) : undefined;
  const description = $('div.woocommerce-product-details__short-description, .summary p').first().text().trim();
  const category = categoryMap(title, url);
  return { title, imageUrl, usd, description, category };
}

function normalizeToInr(usd?: number): number | undefined {
  if (!usd) return undefined;
  const rate = 85; // rough conversion; you can wire a live rate source later
  return Math.round(usd * rate);
}

async function crawl() {
  if (!(await allowedByRobots())) {
    console.error('Crawling disallowed by robots.txt — aborting.');
    process.exit(1);
  }

  const toVisit = new Set([startUrl]);
  const visited = new Set<string>();
  const results: any[] = [];
  const perCatCount: Record<string, number> = {
    electronics: 0, gadgets: 0, toys: 0, gifts: 0, snacks: 0
  };

  const limit = pLimit(1); // sequential by default

  while (toVisit.size && visited.size < maxPages) {
    const url = Array.from(toVisit).shift()!;
    toVisit.delete(url);
    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const html = await got(url, { timeout: { request: 15000 } }).text();
      const $ = load(html);

      if (isProductPage($)) {
        const p = extractProduct($, url);
        if (p && p.imageUrl) {
          const inr = normalizeToInr(p.usd);
          const cat = p.category as keyof typeof perCatCount;
          if (perCatCount[cat] < perCat) {
            const id = 'tak-' + Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
            results.push({
              id,
              name: p.title,
              category: cat,
              priceInInr: inr ?? 999,
              originalPriceInInr: inr ? inr + 200 : 1199,
              description: p.description || 'Made in Japan',
              origin: 'Japan',
              remoteImageUrl: p.imageUrl
            });
            perCatCount[cat]++;
          }
        }
      }

      // collect more links
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        if (/^\//.test(href)) {
          toVisit.add(new URL(href, startUrl).toString());
        } else if (href.startsWith('https://www.takaski.com/')) {
          toVisit.add(href);
        }
      });

      await sleep(rateMs);

      // stop if all categories reached quota
      if (Object.values(perCatCount).every((n) => n >= perCat)) break;
    } catch (e) {
      // ignore errors, proceed
    }
  }

  // Write output
  await fs.writeFile(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Wrote ${results.length} items to ${path.relative(root, outPath)}`);
}

crawl().catch((e) => {
  console.error(e);
  process.exit(1);
});

