"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { button } from "@nextui-org/theme";

const InputModal: React.FC = () => {
    const searchParams = useSearchParams();
    const modal = searchParams.get("bikemodal");
    const pathname = usePathname();
    
    return (
        <>
            {modal && (
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
                    open
                >
                    <div className="bg-white m-auto p-8 w-[900px] h-600px] rounded-md shadow-lg">
                        <div className="flex justify-end">
                            <Link href={pathname}>
                                <button type="button" className="bg-red-500 text-white p-2 rounded" aria-label="Close Modal">
                                    Close Modal
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center mt-5">
                            <p className="text-center text-xl border-b-2 pb-2">Select your bike</p>
                            <div className="h-full flex justify-center items-center border-2 mt-5 p-5 gap-5 rounded-md">
                                <button>
                                    <div className="relative w-64 h-64 border-2 p-5 rounded-md">
                                        <Image src="/asset/bike.png" alt="bike" layout="fill" objectFit="contain"/>
                                        <div>Mechanical</div>
                                    </div>
                                </button>
                                <button>
                                    <div className="relative w-64 h-64 border-2 p-5 rounded-md">
                                        <Image src="/asset/bike.png" alt="bike" layout="fill" objectFit="contain"/>
                                        <div>Electrical</div>
                                    </div>
                                </button>
                                <button>
                                    <div className="relative w-64 h-64 border-2 p-5 rounded-md">
                                        <Image src="/asset/bike.png" alt="bike" layout="fill" objectFit="contain"/>
                                        <div>Container</div>
                                    </div>
                                </button>
                            </div>
                            <button className="mt-6 bg-blue-500 p-2 rounded text-white">
                                <Link href={pathname}>
                                    Choose the bike
                                </Link>
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default InputModal;
