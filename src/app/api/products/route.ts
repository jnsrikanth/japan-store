import type { NextRequest } from 'next/server';
import products from '@/data/products.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const list = category ? (products as any[]).filter((p) => p.category === category) : (products as any[]);
  return Response.json(list);
}

