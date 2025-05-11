import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
// import Review from "./Review";
import { fetchReview } from "../../store/reviewSlice";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
const isLoggedIn = useAppSelector((store) => !!store.auth.user.token || !!localStorage.getItem('tokenauth'));
  // const { review, status } = useAppSelector((state) => state.reviews);
  const [selectedSize, setSelectedSize] = useState(null);
const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
const navigate=useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchReview());
    }
  }, [id]);

  
const handleAddToCart = () => {
  if(isLoggedIn){
    if (product?.id && selectedSize) {
    dispatch(addToCart(product.id, selectedSize));
  } else {
    alert("Please select a size before adding to cart.");
  }
  }
  else{
    alert('login for add to cart')
    navigate('/login')

  }
  
  
};


  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>{" "}
            /
            <Link to="/men" className="hover:text-indigo-600">
              {" "}
              Men
            </Link>{" "}
            /
            <Link to="/men/sneakers" className="hover:text-indigo-600">
              {" "}
              Sneakers
            </Link>{" "}
            /<span className="text-gray-800 font-medium"> {product?.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={
                    product?.images?.includes("cloudinary.com")
                      ? product.images
                      : `http://localhost:5001/${product?.images}`
                  }
                  alt={product?.name}
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            <div>
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {product?.name}
                  </h1>
                  <p className="text-gray-600 font-bold">{product?.brand}</p>
                  <p className="text-gray-600">
                    {product?.Collection?.collectionName}
                  </p>
                </div>
                {product?.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    New
                  </span>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product?.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({product?.comments || 0} reviews)
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-indigo-600 mr-3">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.discount && (
                    <>
                      <span className="text-gray-400 line-through mr-2">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>
                {product?.totalStock > 0 ? (
                  <span className="text-green-600 text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-600">{product?.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Features</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-gray-300 hover:border-indigo-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
              
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium transition duration-300 disabled:opacity-50"
                  disabled={product?.totalStock === 0}
                >
                  {product?.totalStock && product.totalStock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </button>
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <section>
          {status === "loading" ? (
            <div className="text-center py-12">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4.293 9.293a1 1 0 011.414 0L12 15.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                ></path>
              </svg>
            </div>
          ) : review.length > 0 ? (
            <>
              <h2 className="font-black text-black text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-12">
                What Customers Are Saying
              </h2>
              {review.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            </>
          ) : (
            <p className="text-center text-gray-600">No reviews available.</p>
          )}
        </section> */}
      </section>
    </>
  );
};

export default ProductDetail;
