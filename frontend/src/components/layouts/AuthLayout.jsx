import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      <div
        className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          className="w-64 lg:w-[90%]"
          alt="Authentication illustration"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
