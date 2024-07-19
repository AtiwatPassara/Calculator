'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BikeModal from "@/components/modal/bikeModal";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => { setShowModal(false); };
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const handleBikeSelection = (bikeType: string) => { setSelectedBike(bikeType); };
  const handleBikeSubmit = () => { handleCloseModal(); };
  const [selectedPower, setSelectedPower] = useState<string>("-");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("-");
  const handleMaterialSelection = (material: string) => { setSelectedMaterial(material); };
  const handlePowerSelection = (power: string) => { setSelectedPower(power); };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          <BikeModal
            showModal={showModal}
            handleClose={handleCloseModal}
            selectedBike={selectedBike}
            handleBikeSelection={handleBikeSelection}
            handleBikeSubmit={handleBikeSubmit}
            handleMaterialSelection={handleMaterialSelection}
            handlePowerSelection={handlePowerSelection}
            selectedMaterial={selectedMaterial}
            selectedPower={selectedPower}
          />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
