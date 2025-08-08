import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // In a real app, validate items and persist order, decrement stock, etc.
    const orderId = `ord_${Date.now()}`;
    return new Response(JSON.stringify({ id: orderId, status: 'PENDING' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Checkout failed';
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
