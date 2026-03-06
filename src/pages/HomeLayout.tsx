import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="w-full grid grid-cols-1">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
