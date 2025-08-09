import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const CheckoutItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  priceINR: z.number().int().nonnegative(),
  qty: z.number().int().positive().max(100),
  image: z.string().optional(),
});

const CheckoutSchema = z.object({ items: z.array(CheckoutItem).min(1) , email: z.string().email().optional(), upiId: z.string().optional()});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = CheckoutSchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid payload', details: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { items, email, upiId } = parsed.data;

    // Compute total from client-provided snapshot values
    const totalINR = items.reduce((sum, it) => sum + it.priceINR * it.qty, 0);

    // Create Order and related rows
    const order = await db.order.create({
      data: {
        email,
        upiIdUsed: upiId,
        status: 'PENDING',
        totalINR,
        items: {
          create: items.map((it) => ({
            productId: it.id,
            nameSnapshot: it.name,
            priceSnapshotINR: it.priceINR,
            quantity: it.qty,
            imageSnapshot: it.image,
          })),
        },
        payments: {
          create: [{ method: 'UPI', status: 'PENDING', amountINR: totalINR }],
        },
      },
      include: { items: true, payments: true },
    });

    return new Response(
      JSON.stringify({ id: order.id, status: order.status, totalINR: order.totalINR, paymentId: order.payments[0]?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Checkout failed';
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
