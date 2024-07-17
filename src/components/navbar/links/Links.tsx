"use client"
import NavLink from "./navLink/navLink"
import { useState } from "react"
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Links: React.FC = () => {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Calculator",
      path: "/calculator",
    },
  ]
  
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="hidden md:flex items-center justify-between gap-5">
        {links.map((link) => (
          <NavLink item={link} key={link.title} open={open} setOpen={setOpen} />
        ))}
      </div>
      <button className="flex md:hidden" onClick={() => setOpen((prev) => !prev)}>
        <RxHamburgerMenu size={35} />
      </button>
      {open && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full min-h-screen gap-2 bg-black z-50 md:hidden">
          {links.map((link) => (
            <NavLink item={link} key={link.title} open={open} setOpen={setOpen}/>
          ))}
          <button className="flex md:hidden p-2" onClick={() => setOpen((prev) => !prev)}>
            <IoCloseCircleOutline size={35}/>
          </button>
        </div>
      )}
    </div>
  )
}
export default Links;

