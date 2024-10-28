import getCurrentUser from "@/lib/current-user";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { CartButton } from "./CartButton";

export const Navbar = async () => {
  const user = await getCurrentUser();
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <section className="relative mx-auto">
      {/* Navbar */}
      <nav className="flex justify-between bg-blue-900 text-white w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <Link href="/" className="text-3xl font-bold font-heading">
            {/* <img className="h-9" src="logo.png" alt="logo" /> */}
            PF302
          </Link>
          {/* Nav Links */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            {isAdmin && (
              <li>
                <Link className="hover:text-gray-200" href="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Header Icons */}
          <div className="hidden xl:flex items-center space-x-5">
            <Link className="hover:text-gray-200" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>
            <CartButton />

            <ClerkLoading>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              <UserButton />
            </ClerkLoaded>
          </div>
        </div>
        {/* Responsive Navbar */}
        <div className="block xl:hidden self-center">
          <CartButton />
        </div>
        <a className="navbar-burger self-center mr-12 xl:hidden ml-4" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </a>
      </nav>
    </section>
  );
};
