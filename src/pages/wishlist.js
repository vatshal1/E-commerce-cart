import { useSelector, useDispatch } from "react-redux";
import {
  getWishlistAllItems,
  wishlistRemoveItem,
} from "../store/slices/wishListSlice";
import { addCartItem } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const wishListItems = useSelector(getWishlistAllItems);
  console.log(wishListItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(wishlistRemoveItem({ productId }));
  };

  const handleMoveToCart = (item) => {
    dispatch(addCartItem(item));
    // console.log("dispatch item", item);
    dispatch(wishlistRemoveItem({ productId: item.productId }));
  };

  if (wishListItems.length === 0) {
    return (
      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        <div className="empty-wishlist">
          <div className="empty-wishlist-content">
            <div className="empty-wishlist-icon">💝</div>
            <h3>Your wishlist is empty</h3>
            <p>
              Save items you love to your wishlist and find them here later!
            </p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist ({wishListItems.length} items)</h2>
      <div className="wishlist-items-container">
        {wishListItems.map((item) => (
          <div key={item.productId} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={item.imageUrl} alt={item.title} />
            </div>

            <div className="wishlist-item-details">
              <h3 className="wishlist-item-title">{item.title}</h3>
              <p className="wishlist-item-category">{item.category}</p>
              <div className="wishlist-item-rating">
                <span className="rating-stars">
                  {/* //! logic */}
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`star ${
                        index < Math.floor(item.rating) ? "filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </span>
                <span className="rating-value">({item.rating})</span>
              </div>
              <p className="wishlist-item-description">
                {/* //! logic */}
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
            </div>

            <div className="wishlist-item-actions">
              <div className="wishlist-item-price">₹{item.price}</div>
              <div className="wishlist-buttons">
                <button
                  className="move-to-cart-btn"
                  onClick={() => handleMoveToCart(item)}
                >
                  🛒 Move to Cart
                </button>
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
