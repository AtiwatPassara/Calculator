import Link from "next/link"
import NavLink from "./navLink/navLink"

const Links : React.FC = () => {

    const links = [{
        title: "Home",
        path:"/",
    },
    {
        title: "About",
        path:"/about",
    },
    {
        title: "Contact",
        path:"/contact",
    },
    {
        title: "Calculator",
        path:"/calculator",
    }]

    return  <div className="flex align-item-center justify-between gap-5 ">
                {links.map((link => (
                    <NavLink item={link} key={link.title} />
                )))}
            </div>
}
export default Links;