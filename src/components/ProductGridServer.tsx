import products from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

export default function ProductGridServer({ category }: { category?: string | null }) {
  const list = Array.isArray(products) ? (category ? (products as any[]).filter((p) => p.category === category) : (products as any[])) : [];
  const title = `Featured Finds${category ? ` — ${category}` : ''}`;

  return (
    <section id="products" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
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
