import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  getWishlistAllItems,
  wishlistRemoveItem,
} from "../store/slices/wishListSlice";
import { addCartItem } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const wishListItems = useSelector(getWishlistAllItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = useCallback(
    (productId) => {
      dispatch(wishlistRemoveItem({ productId }));
    },
    [dispatch]
  );

  const handleMoveToCart = useCallback(
    (item) => {
      dispatch(addCartItem(item));
      dispatch(wishlistRemoveItem({ productId: item.productId }));
    },
    [dispatch]
  );

  if (wishListItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Your Wishlist
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Save items you love to your wishlist and find them here later!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Your Wishlist ({wishListItems.length}{" "}
          {wishListItems.length === 1 ? "item" : "items"})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishListItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={`${item.title} - wishlist item`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="flex"
                    aria-label={`Rating: ${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={
                          index < Math.floor(item.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="text-sm text-gray-600">({item.rating})</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </p>

                {/* Price and Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-green-600">
                    ₹{(item.price * 83).toFixed(2)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    aria-label={`Move ${item.title} to cart`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🛒 Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    aria-label={`Remove ${item.title} from wishlist`}
                    className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
