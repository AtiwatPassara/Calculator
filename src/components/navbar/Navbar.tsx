import Image from "next/image";
import Links from "./links/Links";

const Navbar : React.FC = () => {
    return (
        <div className="flex items-center justify-between mt-4 px-4 py-4 border-b-2 bg-black" >
                <div >
                    <Image src='/asset/CIRAIG_NVID_logo_Renv_RGB_no-tagline.png' alt={""} width={200} height={500}></Image>
                </div>
                <div >
                    <Links/>
                </div>
            </div>)
}

export default Navbar;


