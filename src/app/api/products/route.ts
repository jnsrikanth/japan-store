import type { NextRequest } from 'next/server';
import products from '@/data/products.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const list = category ? (products as any[]).filter((p) => p.category === category) : (products as any[]);
  return new Response(JSON.stringify(list), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Cache for 5 minutes, allow stale for 60s while revalidating
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
    }
  });
}
