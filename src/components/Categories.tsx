"use client";

const categories = [
  { key: "electronics", name: "Flashy Electronics", image: "/images/electronics.svg" },
  { key: "gadgets", name: "Home Gadgets", image: "/images/gadgets.svg" },
  { key: "toys", name: "Toys", image: "/images/toys.svg" },
  { key: "gifts", name: "Gifts", image: "/images/gifts.svg" },
  { key: "snacks", name: "Popular Snacks/Tea", image: "/images/popular.svg" },
];

export default function Categories() {
  return (
    <section id="categories" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <a
              key={c.key}
              href={`/?category=${encodeURIComponent(c.key)}`} 
              className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow transition"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="w-full h-28 object-cover" />
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-900 group-hover:text-sakura-700">{c.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

