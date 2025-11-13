import { FileChartPie, History } from "lucide-react"; // Example icons

export default function LeftSidebar({ onFilterToggle }) {
  return (
    <div className="h-screen w-16 bg-white flex flex-col items-center py-6 space-y-8 shadow-md z-50">
      {/* Filter Icon */}
      <button
        onClick={onFilterToggle}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FileChartPie className="w-6 h-6 text-gray-500 hover:text-[#001147]" />
      </button>

      {/* History Icon */}
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <History className="w-6 h-6 text-gray-500 hover:text-[#001147]" />
      </button>
    </div>
    
  );
}

