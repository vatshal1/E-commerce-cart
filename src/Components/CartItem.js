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

  const handleRemove = async () => {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Smooth animation
    dispatch(removeCartItem({ productId }));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className={`cart-item-card ${isRemoving ? "removing" : ""}`}>
      {/* Product Image */}
      <div className="cart-item-image">
        {imageError ? (
          <div className="image-placeholder-cart">
            <span className="placeholder-icon">🖼️</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <div className="cart-item-rating">
          <div className="stars-container">{renderStars()}</div>
          <span className="rating-value">({rating.toFixed(1)})</span>
        </div>
        <div className="cart-item-price">
          <span className="price-label">Unit Price:</span>
          <span className="price-value">₹{(price * 83).toFixed(2)}</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button
            className="quantity-btn decrease"
            onClick={() => dispatch(decreaseCartItemQuantity({ productId }))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <span className="btn-icon">−</span>
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-btn increase"
            onClick={() => dispatch(increaseCartItemQuantity({ productId }))}
            aria-label="Increase quantity"
          >
            <span className="btn-icon">+</span>
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="cart-item-total">
        <span className="total-label">Total</span>
        <span className="total-price">
          ₹{(quantity * price * 83).toFixed(2)}
        </span>
      </div>

      {/* Remove Button */}
      <div className="cart-item-actions">
        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label={`Remove ${title} from cart`}
        >
          {isRemoving ? (
            <span className="loading-spinner-small"></span>
          ) : (
            <>
              <span className="remove-icon">🗑️</span>
              Remove
            </>
          )}
        </button>
      </div>
    </article>
  );
}
