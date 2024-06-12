"use client"
import NavLink from "./navLink/navLink"
import { useState } from "react"

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
          <NavLink item={link} key={link.title} />
        ))}
      </div>
      <button className="flex md:hidden" onClick={() => setOpen((prev) => !prev)}>
        Menu
      </button>
      {open && (
        <div className="flex flex-col items-center justify-center fixed top-0 right-0 w-[50%] min-h-screen gap-[10px] bg-black md:hidden">
          <button className="flex md:hidden" onClick={() => setOpen((prev) => !prev)}>
        Menu
      </button>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Links;

