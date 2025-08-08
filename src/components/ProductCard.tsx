import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, openCart } = useCart();
  const available = product.stockQty ? product.stockQty > 0 : product.inStock;

  const handleAdd = () => {
    if (!available) return;
    addItem(product);
    setTimeout(openCart, 50);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async"/>
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-sakura-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Save ¥{product.originalPrice - product.price}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.origin}</p>
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">¥{product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={!available}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            available ? 'bg-sakura-600 hover:bg-sakura-700 text-white shadow' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {available ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

