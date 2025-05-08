import Footer from "../../globals/components/Footer";
import Categories from "../cartegory/Categories";
import Features from "../features/Features";
import ProductCard from "../product/components/ProductCard";
import ProductFilters from "../product/components/ProductFilters";
import PromoBanners from "../promoBanner/PromoBanner";

// components/Hero.jsx
export default function Hero() {
  return (
    <section className="relative bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">New Summer Shoes Collection</h1>
            <p className="text-gray-600 mb-6">
              Competently expedite alternative benefits whereas leading-edge catalysts for change. 
              Globally leverage existing an expanded array of leadership.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition duration-300">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Summer Shoes Collection"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        

        </div>
        <Categories/>
        <ProductFilters/>

          <PromoBanners/>
          
          <Features/>
          <Footer/>
      </div>
    </section>




    
  );
}