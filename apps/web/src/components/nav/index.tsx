import React from "react";
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "../../assets/logo.svg";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full fixed items-center justify-between flex px-4 py-5 z-[100] bg-[#242424]">
      {/* Logo */}
      <div className="flex z-[11]" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-8"/>
      </div>

      <nav className="flex items-center justify-center space-x-8">
        <span className="text-xl font-bold text-[#FFF] hover:text-[#0E76FD] cursor-pointer" onClick={() => navigate("/")}>White paper</span>
        <span className="text-xl font-bold text-[#FFF] hover:text-[#0E76FD] cursor-pointer" onClick={() => navigate("/deposit")}>Deposit</span>
        <span className="text-xl font-bold text-[#FFF] hover:text-[#0E76FD] cursor-pointer" onClick={() => navigate("/withdraw")}>Withdraw</span>
      </nav>

      {/* Navigation - PC */}
      <div className="flex items-center justify-center">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Nav;
