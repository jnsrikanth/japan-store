/*
  Sync approved remote product images into local public/ and produce a normalized catalog.
  Usage: npm run sync:images

  - Reads: src/data/catalog.source.json (array of items with remoteImageUrl)
  - Writes:
    - public/products/<id>.jpg (or .png if detected)
    - src/data/products.json (normalized list used by API)

  Notes:
  - This script does not scrape; it only downloads explicit URLs provided by you.
  - Only use sources you have the rights to use.
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import http from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const productsDir = path.join(root, 'public', 'products');
const sourceCatalogPath = path.join(root, 'src', 'data', 'catalog.source.json');
const outputCatalogPath = path.join(root, 'src', 'data', 'products.json');

function getClient(url: string) {
  return url.startsWith('https') ? https : http;
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

async function download(url: string, dest: string): Promise<void> {
  await new Promise((resolve, reject) => {
    const client = getClient(url);
    client.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if ((res.statusCode || 0) >= 400) {
        reject(new Error(`Failed to download ${url} - status ${res.statusCode}`));
        return;
      }
      const file = fs.open(dest, 'w').then(fh => fh.createWriteStream());
      file.then((ws) => {
        res.pipe(ws);
        ws.on('finish', () => ws.close(resolve));
        ws.on('error', reject);
      }).catch(reject);
    }).on('error', reject);
  });
}

function guessExtFromUrl(u: string): string {
  const lower = u.split('?')[0].toLowerCase();
  if (lower.endsWith('.png')) return '.png';
  if (lower.endsWith('.webp')) return '.webp';
  if (lower.endsWith('.jpeg')) return '.jpeg';
  if (lower.endsWith('.jpg')) return '.jpg';
  return '.jpg';
}

async function main() {
  await ensureDir(productsDir);
  const raw = await fs.readFile(sourceCatalogPath, 'utf8');
  const items = JSON.parse(raw) as Array<{
    id: string;
    name: string;
    category: 'gadgets' | 'toys' | 'electronics' | 'snacks' | 'gifts';
    priceInInr: number;
    originalPriceInInr?: number;
    description: string;
    origin: string;
    remoteImageUrl?: string;
    externalLink?: string;
  }>;

  const normalized: any[] = [];

  for (const item of items) {
    let publicPath = '/images/placeholder.svg';

    if (item.remoteImageUrl && item.remoteImageUrl.startsWith('http')) {
      const ext = guessExtFromUrl(item.remoteImageUrl);
      const fileName = `${item.id}${ext}`;
      const localPath = path.join(productsDir, fileName);
      publicPath = `/products/${fileName}`;

      try {
        console.log(`Downloading ${item.remoteImageUrl} -> ${publicPath}`);
        await download(item.remoteImageUrl, localPath);
      } catch (e) {
        console.warn(`Failed to download ${item.remoteImageUrl}, using placeholder.`);
        publicPath = '/images/placeholder.svg';
      }
    }

    normalized.push({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.priceInInr,
      originalPrice: item.originalPriceInInr,
      image: publicPath,
      rating: 4.6,
      reviews: 100,
      origin: item.origin,
      inStock: true,
      stockQty: 20,
      externalLink: item.externalLink || undefined,
    });
  }

  await fs.writeFile(outputCatalogPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log(`Wrote ${normalized.length} products to ${path.relative(root, outputCatalogPath)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

