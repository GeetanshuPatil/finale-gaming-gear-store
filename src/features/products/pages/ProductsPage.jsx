import BackButton from "../../../shared/components/BackButton";
import ProductFilters from "../components/layout/ProductFilters";
import ProductList from "./ProductList";

const ProductsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl mt-1 font-bold dark:text-white text-green-500">Gaming Gear</h1>

        <p className="text-gray-400 mt-1">
          Explore our premium gaming collection.
        </p>
      </div>

      <ProductFilters />

      <div className="mt-6">
        <ProductList />
      </div>
    </div>
  );
};
export default ProductsPage;
