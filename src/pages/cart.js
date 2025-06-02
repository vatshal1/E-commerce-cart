import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItem from "../Components/CartItem";
import { getAllCartItems } from "../store/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector(getAllCartItems);
  console.log("cartItems2", cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Cart</h2>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some products to get started!
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

  const totalAmount = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity * 83,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Your Cart ({cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"})
        </h2>

        {/* Header Stripe - Desktop only */}
        <div className="hidden md:block bg-gray-100 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Product
              </span>
            </div>
            <div className="col-span-2 text-left">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Details
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Quantity
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Total
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
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
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold text-gray-800">Total Amount:</span>
            <span className="font-bold text-2xl text-green-600">
              ₹{totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
            <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
