import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Pages/SideBar";
import NavBar from "./Pages/NavBar";


const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar with High z-index */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
        <NavBar />
      </div>

      {/* Sidebar + Content + AddTransaction Wrapper */}
      <div className="flex flex-1 pt-[60px]">
        {/* Sidebar (Left) */}
        <div className="z-40">
          <SideBar />
        </div>

        {/* Main Content Area (Middle) */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          <Outlet />
        </main>


      </div>
    </div>
  );
};

export default Layout;
