"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick() {
    // router.replace("/favorites");
    router.back();
  }

  function handleClick2() {
    // router.replace("/favorites");
    router.forward();
  }

  return (
    <div className="bg-gray-800 h-screen w-64">
      <nav className="text-white text-base font-semibold pt-3">
        <Link
          href="/"
          className={`flex items-center text-white py-4 pl-6 border-r-4 border-white ${
            pathname === "/" ? "bg-gray-900" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className="flex items-center text-white py-4 pl-6 border-r-4 border-white"
        >
          Products
        </Link>
        <Link
          href="/favorites"
          className={`flex items-center text-white py-4 pl-6 border-r-4 border-white ${
            pathname === "/favorites" ? "bg-gray-900" : ""
          }`}
        >
          Favorites
        </Link>
        <Link
          href="/about"
          className="flex items-center text-white py-4 pl-6 border-r-4 border-white"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="flex items-center text-white py-4 pl-6 border-r-4 border-white"
        >
          Contact
        </Link>

        <button onClick={handleClick}> Navigate With Func</button>
        <button onClick={handleClick2}> Forward With Func</button>
      </nav>
    </div>
  );
};

export default Sidebar;
