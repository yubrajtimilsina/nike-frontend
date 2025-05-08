import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/productSlice";
import ProductCard from "./ProductCard";

const ProductFilters = () => {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((store) => store.products);
  const { brand } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setActiveBrand(brand || "All");
  }, [brand]);

  const brands = ["All", ...new Set(products.map((product) => product.brand))];

  const filterProducts =
    activeBrand === "All"
      ? products
      : products.filter(
          (p) => p.brand.toLowerCase() === activeBrand.toLowerCase()
        );

  const handleBrandClick = (selectBrand: string) => {
    if (selectBrand === "All") navigate("/men");
    else navigate(`/men/${selectBrand}`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Bestsellers Products</h2>

        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-2 min-w-max">
            {brands.map((brand) => (
              <button
                onClick={() => handleBrandClick(brand)}
                key={brand}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeBrand === brand
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 bg-white flex flex-col items-center">
       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            { filterProducts.length>0 && filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
      </section>
    </section>
  );
};

export default ProductFilters;
