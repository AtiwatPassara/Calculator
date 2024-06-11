import Link from "next/link"

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

    return  <div>
                {links.map((link => (
                    <Link href={link.path} key={link.title}>{link.title}</Link>
                )))}
            </div>
}
export default Links;