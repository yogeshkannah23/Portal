import React from "react";
import { Search, User } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="flex items-center justify-between bg-[#0B204A] text-white px-4 py-2 shadow-md w-full">
      {/* Left section: Logo + title */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center px-2 py-1 rounded">
            <span className="text-[#FFA500] font-bold text-lg">RE</span>
            <span className="text-white font-bold text-lg">P</span>
            <span className="text-[#00FF00] font-bold text-lg">AE</span>
        </div>
    </div>


      {/* Center: Search bar */}
      <div className="flex items-center bg-white rounded-md px-2 py-1 w-1/3">
        <input
          type="text"
          placeholder="Recherche"
          className="flex-grow outline-none text-gray-700 px-2"
          disabled = {true}
        />
        <Search className="text-gray-500" size={18} />
      </div>

      {/* Right section: Support + user avatar */}
      <div className="flex items-center space-x-4">

        <div className="bg-orange-400 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
