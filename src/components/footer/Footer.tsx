import Image from "next/image";

const Footer : React.FC = () => {
    return <div className="flex items-center justify-between mt-4 px-4 py-4 border-t-2 bg-black">
                <div className="flex-col border-2 border-white relative">
                        <Image src="/asset/CIRAIG_NVID_logo_Horiz_White_EN.png" alt="footerLogo" width={300} height={200}/>
                       
                </div>
                <div className="border-2 border-white">
                        product
                </div>
                <div className="border-2 border-white">
                        website
                        <div>
                            ok
                        </div>
                </div>
                <div className="flex-col border-2 border-white">
                        contact
                </div>
           </div>
}

export default Footer;