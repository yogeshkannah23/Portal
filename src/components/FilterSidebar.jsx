import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";


export default function FilterSidebar({ isOpen, setIsOpen, isFilterApplied, setFilterApplied, setReportData}) {

  // Filter data states
  const [regions, setRegions] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [sections, setSections] = useState([]);
  const [lots, setLots] = useState([]);
  const [ilots, setIlots] = useState([]);
  const [parcels, setParcels] = useState([]);

  const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  // Selected values
  const [filters, setFilters] = useState({
    region: "",
    municipalities: "",
    sections: "",
    lot: "",
    ilot: "",
    parcel: "",
  });

  // Fetch regions on load
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}resource/Region`, {
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setRegions(response.data.map(r => r.name));

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchRegions();
  }, []);

  // Fetch Municipalities when region changes
  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}resource/Municipality?filters=[["region","=","${filters.region}"]]&limit_page_length=0
`, {
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setMunicipalities(response.data.map(r => r.name));

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchMunicipalities();
  }, [filters.region]);

  // Fetch sections when municipality changes
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.portal_api.get_sections_by_region`, {
          method: "POST", 
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            region: filters.region,
            municipality: filters.municipalities
          })
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setSections(response.message.data);

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchSections();
  }, [filters.municipalities]);

  // Fetch lots when section changes
  useEffect(() => {
    const fetchLots = async () => {
      try {
        if (!filters.sections) return 
        const res = await fetch(`${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.portal_api.get_lots_by_region`, {
          method:"POST",
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            region: filters.region,
            municipality: filters.municipalities,
            sections: filters.sections
          })
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setLots(response.message.data);

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchLots();
  }, [filters.sections]);

  // Fetch ilots when lot changes
  useEffect(() => {
    const fetchIlots = async () => {
      try {
        if (!filters.sections) return 
        const res = await fetch(`${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.portal_api.get_ilots_by_region`, {
          method:"POST",
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            region: filters.region,
            municipality: filters.municipalities,
            sections: filters.sections,
            lots:filters.lot
          })
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setIlots(response.message.data);

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchIlots();
  }, [filters.lot]);

  // Fetch parcels when ilot changes
  useEffect(() => {
    const fetchCadastralParcel = async () => {
      try {
        if (!filters.lot || !filters.ilot) return 
        const res = await fetch(`${ENDPOINT_URL}resource/Cadastral Parcel?fields=["name"]&filters=[["region","=","${filters.region}"],["municipality","=","${filters.municipalities}"],["section","=","${filters.sections}"],["lots","=","${filters.lot}"],["ilots","=","${filters.ilot}"]]`, {
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });
  
        const text = await res.text();
        const response = JSON.parse(text);

        setParcels(response.data.map(r => r.name));

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchCadastralParcel();
  }, [filters.ilot, filters.lot]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Send filters to backend
  const handleApplyFilters = async () => {
    try {
      setFilterApplied((prev) => !prev);
  
      const res = await fetch(`${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.portal_api.get_cadastral_parcels`, {
        method: "POST",
        headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({'filters':filters})
      });
  
      const text = await res.text();   // Read raw text
      const data = JSON.parse(text);   // Parse manually (same as your pattern)
  
      console.log("Filtered data:", data);
      setReportData(data.message)
  
      // TODO: send this data to MapView or parent later
      // setFilteredParcels(data.message || data);
  
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  return (
    <>

    <div
      className={`absolute top-0 left-16 h-full bg-white shadow-lg border-r z-[9999]
      w-64 sm:w-72 md:w-80 lg:w-96 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            Cadastral Filters
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Filter dropdowns */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-6rem)]">
          <SelectField
            label="Region"
            name="region"
            value={filters.region}
            onChange={handleChange}
            options={regions}
          />
          <SelectField
            label="Municipalities"
            name="municipalities"
            value={filters.municipalities}
            onChange={handleChange}
            options={municipalities}
          />
          <SelectField
            label="Sections"
            name="sections"
            value={filters.sections}
            onChange={handleChange}
            options={sections}
          />
          <SelectField
            label="LOTS"
            name="lot"
            value={filters.lot}
            onChange={handleChange}
            options={lots}
          />
          <SelectField
            label="ILOTS"
            name="ilot"
            value={filters.ilot}
            onChange={handleChange}
            options={ilots}
          />
          <SelectField
            label="Cadastral Parcel"
            name="parcel"
            value={filters.parcel}
            onChange={handleChange}
            options={parcels}
          />
          <SelectField
            label="Cadastral Parcel Number"
            name="parcel_number"
            value={filters.parcel}
            onChange={handleChange}
            options={parcels}
          />
          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#001147] text-white py-2 rounded-lg hover:bg-[#001147]/90"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </>
  );
}

/* Helper component */
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="animate-fadeIn">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-gray-400"
      >
        <option value="">Select {label}</option>
        {options?.map((opt, idx) => {
          // Handle both string and object formats
          const optionValue = typeof opt === 'string' ? opt : (opt.value || opt.name || opt.id || opt);
          const optionLabel = typeof opt === 'string' ? opt : (opt.label || opt.name || opt.value || opt);

          return (
            <option key={idx} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}
