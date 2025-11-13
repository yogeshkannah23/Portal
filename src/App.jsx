import { useState } from 'react'
import TopNavbar from './components/TopNavbar'
import MapView from './components/MapView'
import LeftSidebar from './components/LeftSidebar'
import FilterSidebar from './components/FilterSidebar'

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <TopNavbar />

      <div className="flex flex-1 relative">
        <LeftSidebar onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />
        <div>
        {isFilterOpen && <FilterSidebar isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} /> }
        </div>
        <div className="flex-1 relative">
          <MapView />
        </div>
      </div> 
    </div>
  )
}

export default App
