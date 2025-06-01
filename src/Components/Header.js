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
    <header className="main-header">
      <div className="header-contents">
        <h1 className="logo">
          <Link to="/">Shopee</Link>
        </h1>
        <nav className="header-nav">
          <Link className="wishlist-icon nav-icon" to="/wishlist">
            <span role="img" aria-label="wishlist">
              ❤️
            </span>
            <span className="cart-items-count wishlist-count">
              {wishlistItems.length}
            </span>
          </Link>
          <Link className="cart-icon nav-icon" to="/cart">
            <span role="img" aria-label="cart">
              🛒
            </span>
            <span className="cart-items-count cart-count">
              {cartItems.reduce((acc, cur) => acc + cur.quantity, 0)}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
