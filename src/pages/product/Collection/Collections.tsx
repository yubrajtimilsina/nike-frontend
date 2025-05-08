// components/Collections.jsx
import { Link } from 'react-router-dom';

const Collections = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Shoes",
      description: "Premium footwear for men",
      image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/men",
      featured: true
    },
    {
      id: 2,
      name: "Women's Shoes",
      description: "Stylish shoes for women",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/women",
      featured: true
    },
    {
      id: 3,
      name: "Running",
      description: "Performance running shoes",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/running",
      featured: false
    },
    {
      id: 4,
      name: "Sneakers",
      description: "Casual and trendy sneakers",
      image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/sneakers",
      featured: false
    },
    {
      id: 5,
      name: "Formal",
      description: "Elegant dress shoes",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/formal",
      featured: false
    },
    {
      id: 6,
      name: "Sandals",
      description: "Comfortable summer footwear",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/sandals",
      featured: false
    },
    {
      id: 7,
      name: "Boots",
      description: "Durable boots for all seasons",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/boots",
      featured: false
    },
    {
      id: 8,
      name: "Limited Edition",
      description: "Exclusive designer collaborations",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/limited-edition",
      featured: true
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect pair from our carefully curated selection of footwear
          </p>
        </div>

        {/* Featured Collections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.filter(cat => cat.featured).map(category => (
              <div key={category.id} className="relative rounded-xl overflow-hidden group h-96">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white mb-6">{category.description}</p>
                    <Link 
                      to={category.link}
                      className="inline-block bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium transition duration-300"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Collections */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Browse All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.id} className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 h-64">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <Link 
                      to={category.link}
                      className="text-white hover:text-gray-200 font-medium flex items-center"
                    >
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Collection Banner */}
        <div className="mt-16 bg-gray-100 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Summer Collection 2023</h2>
              <p className="text-gray-600 mb-6">
                Discover our latest summer styles designed for comfort and style in warm weather.
              </p>
              <Link 
                to="/summer-collection"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 self-start"
              >
                View Collection
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Summer Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;