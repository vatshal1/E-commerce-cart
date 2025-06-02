import RootLayout from "./layout/rootLayout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Wishlist from "./pages/wishlist";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
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
