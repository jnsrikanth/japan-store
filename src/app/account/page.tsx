import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AccountPage() {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.email) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-3">Account</h1>
        <p className="text-gray-600">You must sign in to view your account.</p>
        <a href="/auth/signin" className="text-sakura-600 underline mt-4 inline-block">Sign in</a>
      </main>
    );
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  const orders = await db.order.findMany({ where: { userId: user?.id }, orderBy: { createdAt: "desc" }, take: 20 });
  const addresses = await db.address.findMany({ where: { userId: user?.id }, orderBy: { isDefault: "desc" } });

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Welcome{user?.name ? `, ${user.name}` : ''}</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Saved Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses saved.</p>
        ) : (
          <ul className="space-y-2">
            {addresses.map(a => (
              <li key={a.id} className="border rounded p-3">
                <div className="text-sm text-gray-700">{a.label || 'Address'}</div>
                <div className="text-sm text-gray-600">{a.line1} {a.line2}</div>
                <div className="text-sm text-gray-600">{a.city}, {a.state} {a.postalCode}</div>
                {a.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Default</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map(o => (
              <li key={o.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o.id.slice(0,6).toUpperCase()}</div>
                  <div className="text-sm text-gray-600">Status: {o.status} • Total: ₹{o.totalINR}</div>
                </div>
                <a href={`/orders/${o.id}`} className="text-sakura-600 underline">View</a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
