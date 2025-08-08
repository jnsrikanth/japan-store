import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <Footer />
      <ShoppingCart />
    </div>
  );
}

