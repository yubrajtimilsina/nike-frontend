import { Link } from "react-router-dom";

// components/Categories.jsx
export default function Categories() {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Men's Collection"
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                    <Link to={'/men'}>
                  <h3 className="text-2xl font-bold text-white mb-2">MEN COLLECTIONS</h3>
                  <a href="#" className="text-white font-medium hover:underline">Explore All →</a>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Women's Collection"
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                    <Link to={'/women'}>
                  <h3 className="text-2xl font-bold text-white mb-2">WOMEN COLLECTIONS</h3>
                  <a href="#" className="text-white font-medium hover:underline">Explore All →</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }