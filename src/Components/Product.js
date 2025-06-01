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
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if item is already in cart or wishlist
  const cartItems = useSelector(getAllCartItems);
  const wishlistItems = useSelector(getWishlistAllItems);

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
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate loading
    dispatch(addCartItem({ title, rating, price, imageUrl, productId }));
    setIsLoading(false);
  };

  const handleWishlistToggle = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="product-card">
      {/* Product Badge */}
      <div className="product-badge">
        <span className="category-badge">{category}</span>
      </div>

      {/* Product Image */}
      <div className="product-image-container">
        {imageError ? (
          <div className="image-placeholder">
            <span className="placeholder-icon">🖼️</span>
            <span className="placeholder-text">Image not available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Wishlist Button Overlay */}
        <button
          className={`wishlist-toggle ${isInWishlist ? "active" : ""}`}
          onClick={handleWishlistToggle}
          disabled={isLoading}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title" title={title}>
          {title.length > 50 ? `${title.substring(0, 50)}...` : title}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars-container">{renderStars()}</div>
          <span className="rating-value">({rating.toFixed(1)})</span>
        </div>

        {/* Description */}
        <p className="product-description">
          {description.length > 80
            ? `${description.substring(0, 80)}...`
            : description}
        </p>

        {/* Price and Actions */}
        <div className="product-footer">
          <div className="price-container">
            <span className="price-currency">₹</span>
            <span className="price-amount">{(price * 8).toFixed(2)}</span>
          </div>

          <button
            className={`add-to-cart-btn ${isInCart ? "in-cart" : ""}`}
            onClick={handleAddToCart}
            disabled={isLoading || isInCart}
          >
            {isLoading ? (
              <span className="loading-spinner-small"></span>
            ) : isInCart ? (
              <>
                <span className="cart-icon">✓</span>
                In Cart
              </>
            ) : (
              <>
                <span className="cart-icon">🛒</span>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
