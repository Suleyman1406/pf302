"use client";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>
        <Link href="/">Go back to home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
