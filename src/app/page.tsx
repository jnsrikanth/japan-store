import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGridServer from '@/components/ProductGridServer';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Categories from '@/components/Categories';

export default function Home({ searchParams }: any) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <ProductGridServer category={category} />
      <Footer />
      <ShoppingCart />
    </div>
  );
}

