import Image from "next/legacy/image";

const Footer : React.FC = () => {
    return <div className="flex items-center justify-between mt-4 px-4 py-4 border-t-2 bg-black">
                <div className="flex-col relative">
                        <Image src="/asset/CIRAIG_NVID_logo_Horiz_White_EN.png" alt="footerLogo" width={300} height={110} priority={true}/>    
                </div>
                <div className="">
                        social media
                </div>
                <div className="">
                        website
                </div>
                <div className="flex-col ">
                        contact
                </div>
           </div>
}

export default Footer;