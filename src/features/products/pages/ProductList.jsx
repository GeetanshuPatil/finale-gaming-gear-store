import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import ProductFilters from "../components/layout/ProductFilters";

const ProductList = ({ limit }) => {
  const { products = [], loading, error } = useProducts();

  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-fr">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : displayedProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
