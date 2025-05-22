import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createReview } from "../../store/reviewSlice";

type ReviewItem = {
  User?: {
    username: string;
  };
  comment: string;
  rating: number;
};

type ReviewProps = {
  review: ReviewItem[];
};

const Review: React.FC<ReviewProps & { productId: number }> = ({ review, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const userId = user?.id;
  const username = user?.username;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("You must be logged in to post a review");
    dispatch(
      createReview({
        id: null,
        productId: String(productId),
        userId,
        comment,
        rating,
        createdAt: new Date().toISOString(),
        User: {
          id: userId,
          username: username || "Anonymous",
        },
      })
    );
  };

  return (
    <section className="bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
          {review.length === 0 && (
            <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
          )}
          {review.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">
                  {item?.User?.username || "Anonymous"}
                </p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(item.rating)
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
              </div>
              <p className="text-gray-700">{item.comment}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-lg p-6 border shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              placeholder="Write your comment..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Your Rating:</span>
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl transition ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Review;
