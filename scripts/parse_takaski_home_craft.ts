/*
  Parse saved Takaski Home & Craft HTML into our source catalog.
  Input: src/data/web_data_home_craft.html (extracted from Safari .webarchive)
  Output: src/data/catalog.source.json

  Notes:
  - We only parse the saved file; no network requests.
  - We extract product cards from WooCommerce markup under ul.products li.product
  - Fields: id (hash of link), name (title), category (gadgets), priceInInr (placeholder if not parseable), description (from title), origin: Japan, remoteImageUrl (img src), externalLink (product link)
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import crypto from 'node:crypto';

function toId(s: string) {
  // Use a stable hash so IDs are unique per product URL/title
  return 'tak-' + crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
}

function parsePriceToINR(txt: string): number | undefined {
  // Try to pick digits and convert rough JPY->INR if JPY; otherwise return a sensible default
  const m = txt.replace(/[,\s]/g, '').match(/([0-9]{2,})/);
  if (!m) return undefined;
  const val = parseInt(m[1], 10);
  if (!isFinite(val)) return undefined;
  // Assume JPY and convert ≈ 0.55 INR per JPY (rough). Cap to a floor.
  const inr = Math.max(199, Math.round(val * 0.55));
  return inr;
}

async function main() {
  const htmlPath = path.join('src', 'data', 'web_data_home_craft.html');
  const outPath = path.join('src', 'data', 'catalog.source.json');
  const html = await fs.readFile(htmlPath, 'utf8');
  const $ = load(html);

  const items: any[] = [];

  $('ul.products li.product').each((_, el) => {
    const card = $(el);
    const linkEl = card.find('a.woocommerce-LoopProduct-link, a.woocommerce-loop-product__link, a:eq(0)').first();
    const href = linkEl.attr('href') || '';
    const title = card.find('h2.woocommerce-loop-product__title, h3, .woocommerce-loop-product__title').first().text().trim() || linkEl.attr('title') || 'Product';
    const imgEl = card.find('img').first();
    let img = imgEl.attr('data-src') || imgEl.attr('data-lazy-src') || imgEl.attr('src') || '';
    if (img.startsWith('//')) img = 'https:' + img;
    const priceTxt = card.find('.price, span.amount, bdi').first().text().trim();
    const inr = parsePriceToINR(priceTxt) ?? 1499;

    const id = toId(href || title);
    items.push({
      id,
      name: title,
      category: 'gadgets',
      priceInInr: inr,
      originalPriceInInr: inr + 200,
      description: title,
      origin: 'Japan',
      remoteImageUrl: img || undefined,
      externalLink: href || undefined,
    });
  });

  await fs.writeFile(outPath, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Parsed ${items.length} items -> ${outPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

