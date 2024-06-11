import Links from "./links/Links";

const Navbar : React.FC = () => {
    return (
        <div className="flex items-center justify-between mt-4 px-4" >
                <div className="font-bold text-[24px]">
                    LOGO
                </div>
                <div >
                    <Links/>
                </div>
            </div>)
}

export default Navbar;


