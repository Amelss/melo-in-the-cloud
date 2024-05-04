import React from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import Search from "./Search";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between px-3 pt-3 pb-14 xl:px-10 bg-white ">
        <Link href={"/"}>
          <div>
            <h1 className="text-xl xl:text-3xl text-blue-300 font-bold">
              Melo In The Cloud
            </h1>
          </div>
        </Link>
        <div className="lg:hidden ">
          <Menu
            right
            isOpen={isOpen}
            onOpen={handleIsOpen}
            onClose={handleIsOpen}
          >
            <Link href={"/"} onClick={closeSideBar}>
              Home
            </Link>
            <Link href={"/about"} onClick={closeSideBar}>
              About
            </Link>
            <Link href={"/blogs"} onClick={closeSideBar}>
              All Blogs
            </Link>
            <Link href={"/contact"} onClick={closeSideBar}>
              Contact
            </Link>
          </Menu>
          {/* <div>
             <Search />
          </div> */}
        </div>
        {/* <div className="hidden lg:flex">
          <Search />
        </div> */}
        <div className="hidden lg:flex">
          <nav>
            <Link href={"/"} className="">
              Home
            </Link>
            <Link href={"/about"} className="ml-3">
              About
            </Link>
            <Link href={"/blogs"} className="ml-3">
              All Blogs
            </Link>
            <Link href={"/contact"} className="ml-3">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
