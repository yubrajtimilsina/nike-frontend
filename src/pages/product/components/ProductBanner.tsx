import { Link } from "react-router-dom"

const ProductBanner = () => {
  return (
    <div>
  <div className="relative rounded-xl overflow-hidden mb-12 h-64 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Men's Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Men's Collection
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Premium footwear designed for comfort and style
            </p>
            <Link
              to="/shop"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default ProductBanner
