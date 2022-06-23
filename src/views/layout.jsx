import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
  }