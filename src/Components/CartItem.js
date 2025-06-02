import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../store/slices/cartSlice";

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Smooth animation
    dispatch(removeCartItem({ productId }));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Product Image */}
        <div className="flex justify-center md:justify-start">
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-2xl">🖼️</span>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={title}
                onError={handleImageError}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-2 text-center md:text-left">
          <h3
            title={title}
            className="font-semibold text-gray-800 mb-1 line-clamp-2"
          >
            {title}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="flex">{renderStars()}</div>
            <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="block">Unit Price:</span>
            <span className="font-semibold text-green-600">
              ₹{(price * 83).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => dispatch(decreaseCartItemQuantity({ productId }))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={`w-8 h-8 flex items-center justify-center transition-colors ${
                quantity <= 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <span className="font-bold">−</span>
            </button>
            <span className="px-4 py-1 font-semibold text-gray-800 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => dispatch(increaseCartItemQuantity({ productId }))}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
            >
              <span className="font-bold">+</span>
            </button>
          </div>
        </div>

        {/* Total Price and Remove */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-center">
            <span className="text-lg font-bold text-blue-600">
              ₹{(quantity * price * 83).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleRemove}
            disabled={isRemoving}
            aria-label={`Remove ${title} from cart`}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isRemoving
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105"
            }`}
          >
            {isRemoving ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></span>
            ) : (
              <>
                <span className="mr-1">🗑️</span>
                Remove
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
