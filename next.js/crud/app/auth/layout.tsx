import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-purple-600">
      <h1 className="text-white text-4xl font-bold tracking-wider">
        Welcome To Our Application
      </h1>
      {children}
    </div>
  );
};

export default AuthLayout;
