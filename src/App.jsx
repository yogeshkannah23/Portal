import { useState } from 'react'
import TopNavbar from './components/TopNavbar'
import MapView from './components/MapView'
import LeftSidebar from './components/LeftSidebar'
import FilterSidebar from './components/FilterSidebar'
import ReportTable from './components/ReportTable'


function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [reportData, setReportData] = useState([])

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <TopNavbar />

      <div className="flex flex-1 relative">
        <FilterSidebar 
        isOpen={isFilterOpen} 
        setIsOpen={setIsFilterOpen} 
        isFilterApplied={isFilterApplied} 
        setFilterApplied={setFilterApplied}
        setReportData={setReportData}
        />


        { isFilterOpen && isFilterApplied && 
        <ReportTable 
        isOpen={isFilterOpen} 
        isFilterApplied={isFilterApplied} 
        reportData={reportData}
        />}

        <LeftSidebar 
        isFilterOpen={isFilterOpen}  
        setIsFilterOpen={setIsFilterOpen } 
        isFilterApplied= {isFilterApplied} 
        setFilterApplied={setFilterApplied}
        />
        
        <div className="flex-1 relative">
          <MapView />
        </div>
      </div> 
    </div>
  )
}

export default App
