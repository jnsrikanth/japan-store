import useSWR from 'swr';
import ProductCard from '@/components/ProductCard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductGrid() {
  const { data } = useSWR('/api/products', fetcher);
  const list = data || [];

  return (
    <section id="products" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Finds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p: any) => (
            <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </section>
  );
}

