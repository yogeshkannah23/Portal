import { FileChartPie, History } from "lucide-react"; // Example icons

export default function LeftSidebar({ isFilterOpen, setIsFilterOpen, isFilterApplied, setFilterApplied }) {

  const handleChange = () => {
    setFilterApplied(!isFilterApplied)
    setIsFilterOpen(!isFilterOpen)
  };

  return (
    <div className="h-screen w-16 bg-white flex flex-col items-center py-6 space-y-8 shadow-md z-99999">
      {/* Filter Icon */}
      <button
        onClick={handleChange}
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

