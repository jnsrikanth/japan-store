'use client';

import { useCart } from '@/context/CartContext';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import QRCode from 'qrcode';
import { useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';

const ShoppingCart = () => {
  const { state, closeCart, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { mutate } = useSWRConfig();
  const [upiQr, setUpiQr] = useState<string | null>(null);
  const [upiUri, setUpiUri] = useState<string | null>(null);
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || '';
  const upiName = process.env.NEXT_PUBLIC_UPI_NAME || 'Nippon Finds';

  const roundedTotal = useMemo(() => Math.round(totalPrice), [totalPrice]);

  if (!state.isOpen) return null;

  const handleUPICheckout = async () => {
    try {
      if (!upiId) {
        alert('UPI payment is not configured. Please set NEXT_PUBLIC_UPI_ID in .env.local');
        return;
      }
      const params = new URLSearchParams({ pa: upiId, pn: upiName, am: String(roundedTotal), cu: 'INR', tn: 'Nippon Finds Order' });
      const uri = `upi://pay?${params.toString()}`;
      setUpiUri(uri);

      // Minimal order placement endpoint for ID and UI updates
      const orderRes = await fetch('/api/checkout/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items.map((it) => ({ productId: it.id, quantity: it.quantity })) }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order?.error || 'Order placement failed');

      // Optimistically update product stock in UI and revalidate from server
      mutate('/api/products', (current: any[] | undefined) => {
        if (!current) return current;
        const qtyMap = new Map<string, number>();
        for (const it of state.items) {
          qtyMap.set(it.id, (qtyMap.get(it.id) || 0) + it.quantity);
        }
        return current.map((p) => {
          const dec = qtyMap.get(p.id) || 0;
          return dec ? { ...p, stockQty: Math.max(0, (p.stockQty || 0) - dec) } : p;
        });
      }, { revalidate: true });

      const dataUrl = await QRCode.toDataURL(uri, { width: 256, margin: 1 });
      setUpiQr(dataUrl);
      clearCart();

      if (typeof window !== 'undefined') {
        const url = new URL('/success', window.location.origin);
        url.searchParams.set('id', order.id);
        window.open(url.toString(), '_blank');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'UPI checkout failed';
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart ({state.items.length})</h2>
            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close cart">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"><span className="text-4xl">🛍️</span></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some kawaii finds to get started!</p>
                <button onClick={closeCart} className="bg-sakura-600 hover:bg-sakura-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Continue Shopping</button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" loading="lazy" decoding="async"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.origin}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded" disabled={item.quantity <= 1}><MinusIcon className="h-4 w-4 text-gray-600" /></button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded"><PlusIcon className="h-4 w-4 text-gray-600" /></button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto p-1 hover:bg-red-50 rounded"><TrashIcon className="h-4 w-4 text-red-500" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥{item.price * item.quantity}</p>
                      {item.quantity > 1 && (<p className="text-sm text-gray-500">¥{item.price} each</p>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <button onClick={clearCart} className="w-full text-center text-sm text-red-600 hover:text-red-700">Clear Cart</button>
              <div className="flex justify-between items-center text-lg font-semibold"><span>Total:</span><span>¥{totalPrice}</span></div>
              <p className="text-sm text-gray-500 text-center">Worldwide shipping available • Delivery estimates at checkout</p>
              <div className="space-y-3">
                <button onClick={handleUPICheckout} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg">Pay via UPI (Scan QR / Open UPI App)</button>
                {upiQr && (
                  <div className="border border-green-200 rounded-lg p-3 text-center animate-fade-in">
                    <p className="text-sm text-gray-700 mb-2">Scan this QR with any UPI app</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={upiQr} alt="UPI QR" className="mx-auto w-48 h-48" />
                    {upiUri && (
                      <a href={upiUri} className="inline-block mt-3 text-green-700 hover:text-green-800 font-medium underline">Or tap to pay in your UPI app</a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

