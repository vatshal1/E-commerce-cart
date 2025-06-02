import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCartItem, getAllCartItems } from "../store/slices/cartSlice";
import {
  wishlistAddItem,
  getWishlistAllItems,
  wishlistRemoveItem,
} from "../store/slices/wishListSlice";

export default function Product({
  title,
  rating,
  productId,
  price,
  imageUrl,
  category,
  description,
}) {
  const dispatch = useDispatch();

  // Check if item is already in cart or wishlist
  const cartItems = useSelector(getAllCartItems);
  const wishlistItems = useSelector(getWishlistAllItems);

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isInCart = cartItems.some((item) => item.productId === productId);

  const isInWishlist = wishlistItems.some(
    (item) => item.productId === productId
  );

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

  const handleAddToCart = async () => {
    setIsCartLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate loading
    dispatch(addCartItem({ title, rating, price, imageUrl, productId }));
    setIsCartLoading(false);
  };

  const handleWishlistToggle = async () => {
    setIsWishlistLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate loading

    if (isInWishlist) {
      dispatch(wishlistRemoveItem({ productId }));
    } else {
      dispatch(
        wishlistAddItem({
          title,
          rating,
          price,
          imageUrl,
          productId,
          description,
          category,
        })
      );
    }
    setIsWishlistLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Product Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-md">
          {category}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {imageError ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <span className="text-4xl mb-2">🖼️</span>
            <span className="text-sm">Image not available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Wishlist Button Overlay */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
            isInWishlist
              ? "bg-red-500 text-white shadow-md"
              : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white"
          } ${
            isWishlistLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-110"
          }`}
        >
          {isWishlistLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
          ) : isInWishlist ? (
            "❤️"
          ) : (
            "🤍"
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3
          title={title}
          className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]"
        >
          {title.length > 50 ? `${title.substring(0, 50)}...` : title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars()}</div>
          <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description.length > 80
            ? `${description.substring(0, 80)}...`
            : description}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-green-600">₹</span>
            <span className="text-xl font-bold text-green-600">
              {(price * 8).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isCartLoading || isInCart}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isInCart
                ? "bg-green-50 text-green-700 cursor-default"
                : isCartLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {isCartLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
            ) : isInCart ? (
              <>
                <span className="mr-1">✓</span>
                In Cart
              </>
            ) : (
              <>
                <span className="mr-1">🛒</span>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
