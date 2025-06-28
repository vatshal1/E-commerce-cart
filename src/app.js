import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import RootLayout from "./layout/rootLayout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Wishlist from "./pages/wishlist";
import Error from "./Components/Error";
import { getProductError } from "./store/slices/productSlice";

export default function App() {
  const error = useSelector(getProductError);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error error={error} />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}
