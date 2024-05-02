import React from "react";
import Link from "next/link";
import { stack as Menu } from "react-burger-menu";
import { useState } from "react";

export default function Header() {
 const [isOpen, setOpen] = useState(false);

 const handleIsOpen = () => {
   setOpen(!isOpen);
 };

 const closeSideBar = () => {
   setOpen(false);
 };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Melo In The Cloud</h1>
        </div>
        <div className="xl:hidden">
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
        </div>

        <div className="hidden xl:flex">
          <nav>
            <Link href={"/"} >
              Home
            </Link>
            <Link href={"/about"}>
              About
            </Link>
            <Link href={"/blogs"} >
              All Blogs
            </Link>
            <Link href={"/contact"}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
