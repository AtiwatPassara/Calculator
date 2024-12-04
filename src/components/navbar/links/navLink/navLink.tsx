'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './navLink.module.css'


interface NavLinkProps {
    item: {
        title: string;
        path: string;
    };
    open: boolean;
    setOpen: (value:boolean) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, open, setOpen }) => {

    const pathName = usePathname()

    return (
        <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`} onClick={() => setOpen(false)}>
            {item.title}
        </Link>
    );
}

export default NavLink;




