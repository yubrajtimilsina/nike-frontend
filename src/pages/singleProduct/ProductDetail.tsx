
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice";
import Review from "./Review";
import { fetchReview } from "../../store/reviewSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store.products);
  const { review } = useAppSelector((store) => store.reviews);

  const isLoggedIn = useAppSelector(
    (store) => !!store.auth.user.token || !!localStorage.getItem("tokenauth")
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id)).then(() => {
        dispatch(fetchReview(id));
      });
    }
  }, [id, dispatch]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add to cart");
      return;
    }

    if (!product?.id || !selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    } else {
      await dispatch(addToCart(product.id, selectedSize, selectedColor));
      navigate("/");
    }
  };

  // Calculate average rating from reviews
  const averageRating = review.length > 0
    ? review.reduce((sum, r) => sum + (r.rating ?? 0), 0) / review.length
    : 0;
  const roundedRating = Math.round(averageRating);

  const availableSizes =
    product?.sizes && product.sizes.length > 0
      ? product.sizes
      : ["No sizes available"];
  const availableColors =
    product && (product.colors ?? []).length > 0
      ? product.colors
      : ["No colors available"];

  // Map review to match ReviewItem
  const mappedReviews = review.map((r) => ({
    id: r.id || "",
    productId: r.productId || "",
    userId: r.userId || "",
    comment: r.comment || "",
    rating: r.rating ?? 0,
    createdAt: r.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(), // Default updatedAt
    User: r.User ? { id: r.User.id || "", username: r.User.username || "" } : { id: "", username: "" },
  }));

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/men" className="hover:text-indigo-600">
              Men
            </Link>{" "}
            /
            <Link to="/men/sneakers" className="hover:text-indigo-600">
              Sneakers
            </Link>{" "}
            / <span className="text-gray-800 font-semibold">{product?.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="mb-4 rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:5001/${product?.images}`}
                  alt="Product Image"
                />
              </div>
            </div>

            <div>
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-2xl font-bold mb-2">
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
                        i < roundedRating
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
                  {averageRating.toFixed(1)} ({review.length} {review.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-indigo-600 mr-3">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {(product?.discount ?? 0) > 0 && (
                    <>
                      <span className="text-gray-400 line-through mr-2">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                        Save {product?.discount ?? 0}%
                      </span>
                    </>
                  )}
                </div>
                {(product?.totalStock ?? 0) > 0 ? (
                  <span className="text-green-600 text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        size !== "No sizes available" && setSelectedSize(size)
                      }
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-gray-300 hover:border-indigo-600"
                      } ${
                        size === "No sizes available"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={size === "No sizes available"}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        color !== "No colors available" &&
                        setSelectedColor(color)
                      }
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-gray-300 hover:border-indigo-600"
                      } ${
                        color === "No colors available"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={color === "No colors available"}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-600">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Review key={product?.id} review={mappedReviews} productId={product?.id!} />
      </section>
    </>
  );
};

export default ProductDetail;
