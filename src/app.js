import RootLayout from "./layout/rootLayout";
import Home from "./pages/home";
import Cart from "./pages/cart";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wishlist from "./pages/wishlist";

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
