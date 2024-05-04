import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <div className="">
        <Header />
      </div>

      <div className="relative min-h-screen  ">
        <div className="pb-40  ">{children}</div>

        <div className="absolute bottom-0 w-full  ">
          <Footer />
        </div>
      </div>
    </div>
  );
}
