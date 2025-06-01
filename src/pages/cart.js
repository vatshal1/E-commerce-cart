import { useSelector } from "react-redux";

import CartItem from "../Components/CartItem";
import { getAllCartItems } from "../store/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector(getAllCartItems);
  console.log("cartItems2", cartItems);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header ">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>

        {cartItems.map(
          ({ productId, title, rating, price, imageUrl, quantity }) => (
            <CartItem
              key={productId}
              productId={productId}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={imageUrl}
              rating={rating}
            />
          )
        )}

        <div className="cart-total">
          <div className="total">
            ₹
            {cartItems
              .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
