'use client';

import useSWR from 'swr';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductGrid() {
  const params = useSearchParams();
  const category = params.get('category') || '';
  const key = category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products';
  const { data } = useSWR(key, fetcher);
  const list = data || [];

  return (
    <section id="products" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Finds {category ? `— ${category}` : ''}</h2>
          {category && (
            <a href="/" className="text-sm text-sakura-600 hover:text-sakura-700 font-medium">Clear filter</a>
          )}
        </div>
        {list.length === 0 ? (
          <p className="text-gray-500">No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

