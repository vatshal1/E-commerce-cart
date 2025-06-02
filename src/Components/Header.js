import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductsData } from "../store/slices/productSlice";
import { getWishlistAllItems } from "../store/slices/wishListSlice";
import { useEffect } from "react";
import { getAllCartItems } from "../store/slices/cartSlice";

export default function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const cartItems = useSelector(getAllCartItems);
  console.log("cartItems1", cartItems);
  const wishlistItems = useSelector(getWishlistAllItems);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Shopee
            </Link>
          </h1>
          <nav className="flex items-center space-x-6">
            <Link
              to="/wishlist"
              className="relative flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
            >
              <span role="img" aria-label="wishlist" className="text-xl">
                ❤️
              </span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span role="img" aria-label="cart" className="text-xl">
                🛒
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
