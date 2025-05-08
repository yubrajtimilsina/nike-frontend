// components/WomenCollection.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WomenCollection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Heels', 'Flats', 'Sneakers', 'Sandals', 'Boots'];

  const shoes = [
    {
      id: 1,
      name: "Air Force 1 '07",
      category: "Sneakers",
      brand: "Nike",
      price: 120.99,
      discount: 15,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isNew: true
    },
    {
      id: 2,
      name: "Classic Court",
      category: "Flats",
      brand: "Adidas",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Pointed Toe Pump",
      category: "Heels",
      brand: "Steve Madden",
      price: 95.50,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Platform Sneaker",
      category: "Sneakers",
      brand: "Puma",
      price: 75.00,
      discount: 20,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "Leather Ankle Boot",
      category: "Boots",
      brand: "Sam Edelman",
      price: 145.00,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isNew: true
    },
    {
      id: 6,
      name: "Strappy Sandal",
      category: "Sandals",
      brand: "Nine West",
      price: 65.00,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      name: "Ballet Flat",
      category: "Flats",
      brand: "Tory Burch",
      price: 195.00,
      discount: 10,
      image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      name: "Chunky Heel",
      category: "Heels",
      brand: "Aldo",
      price: 89.00,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const filteredShoes = activeFilter === 'All' 
    ? shoes 
    : shoes.filter(shoe => shoe.category === activeFilter);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <Link to={'/product/:id'} ></Link>
        <div className="relative rounded-xl overflow-hidden mb-12 h-64 md:h-80">
          <img 
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Women's Collection</h1>
              <p className="text-lg md:text-xl mb-6">Stylish footwear for every occasion</p>
              <Link 
                to="/shop" 
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition ${activeFilter === filter ? 'bg-pink-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredShoes.map(shoe => (
            <div key={shoe.id} className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              {/* Badges */}
              <div className="absolute top-3 left-3 flex space-x-2 z-10">
                {shoe.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    New
                  </span>
                )}
                {shoe.discount && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    -{shoe.discount}%
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={shoe.image} 
                  alt={shoe.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{shoe.name}</h3>
                    <p className="text-gray-500 text-sm">{shoe.brand}</p>
                  </div>
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">{shoe.category}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-bold text-pink-600">${shoe.price.toFixed(2)}</span>
                    {shoe.discount && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        ${((shoe.price * 100) / (100 - shoe.discount)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="text-pink-600 hover:text-pink-800 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 text-center">
          <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md font-medium transition duration-300">
            View More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default WomenCollection;