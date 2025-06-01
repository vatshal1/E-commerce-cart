import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import "../app.css";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
