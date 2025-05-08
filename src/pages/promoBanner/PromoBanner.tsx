// components/PromoBanners.jsx
export default function PromoBanners() {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Adidas Shoes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Adidas Shoes</h3>
                  <p className="text-white text-xl mb-4">The Summer Sale Off 50%</p>
                  <button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Nike Shoes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Nike Shoes</h3>
                  <p className="text-white text-xl mb-4">Makes Yourself Keep Sporty</p>
                  <button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }