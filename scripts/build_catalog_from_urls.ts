/*
  Build a source catalog JSON from a file of URLs.
  Usage:
    ts-node --transpile-only scripts/build_catalog_from_urls.ts product_urls.txt src/data/catalog.source.json

  - Reads a text file and extracts all URLs (http/https)
  - Maps each to a category using keywords in the URL line context
  - Generates reasonable defaults in INR
  - Leaves remoteImageUrl unset (sync will fallback to placeholder if none)
*/

import fs from 'node:fs/promises';
import path from 'node:path';

function categoryFromLine(line: string): 'electronics' | 'gadgets' | 'toys' | 'gifts' | 'snacks' {
  const l = line.toLowerCase();
  if (/(electronics|electronic|otamatone|transformer|adapter|rgb|led|synth)/.test(l)) return 'electronics';
  if (/(gadget|kitchen|bento|knife|onigiri|sushi|toothbrush|home)/.test(l)) return 'gadgets';
  if (/(toy|toys|plush|figure|ghibli|samurai|daruma|takoyaki)/.test(l)) return 'toys';
  if (/(snack|candy|matcha|tea|gift|envelope|souvenir|journal|sticker|crate)/.test(l)) return 'gifts';
  return 'gifts';
}

async function main() {
  const inFile = process.argv[2];
  const outFile = process.argv[3];
  if (!inFile || !outFile) {
    console.error('Usage: build_catalog_from_urls.ts <input.txt> <output.json>');
    process.exit(1);
  }
  const raw = await fs.readFile(inFile, 'utf8');
  const lines = raw.split(/\r?\n/);
  const urlRe = /(https?:\/\/[^\s)\]"']+)/g;

  const items: any[] = [];
  const seen = new Set<string>();

  const isImageUrl = (s: string) => /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(s);

  for (const line of lines) {
    const matches = line.match(urlRe);
    if (!matches) continue;
    for (let u of matches) {
      u = u.replace(/[).,]$/, '');
      if (seen.has(u)) continue;
      seen.add(u);
      const cat = categoryFromLine(line);
      const id = 'url-' + Buffer.from(u).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
      const name = 'Product';
      const base = {
        id,
        name,
        category: cat as any,
        priceInInr: 1499,
        originalPriceInInr: 1799,
        description: 'Curated Japanese product',
        origin: 'Japan' as const,
      };
      if (isImageUrl(u)) {
        items.push({ ...base, remoteImageUrl: u });
      } else {
        items.push({ ...base, externalLink: u });
      }
    }
  }

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Wrote ${items.length} items to ${outFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

