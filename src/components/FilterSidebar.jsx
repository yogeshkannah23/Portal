import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

import.meta.env.VITE_API_KEY
import.meta.env.VITE_SECRET_KEY

export default function FilterSidebar({ isOpen, setIsOpen, isFilterApplied, setFilterApplied}) {

  // Filter data states
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
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
    commune: "",
    section: "",
    lot: "",
    ilot: "",
    parcel: "",
  });

  // Fetch regions on load
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(`${ENDPOINT_URL}strategy_custom_app.strategy_custom_app.api.portal_api.get_regions`, {
          headers: {
            "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });
  
        const text = await res.text();
        const data = JSON.parse(text);

        setRegions(data.message.data);

      } catch (err) {
        console.error("Error fetching regions:", err);
      }
    };
  
    fetchRegions();
  }, []);

  // Fetch communes when region changes
  useEffect(() => {
    if (!filters.region) return;
    fetch(`/api/communes?region=${filters.region}`)
      .then((res) => res.json())
      .then((data) => setCommunes(data))
      .catch((err) => console.error("Error fetching communes:", err));
  }, [filters.region]);

  // Fetch sections when commune changes
  useEffect(() => {
    if (!filters.commune) return;
    fetch(`/api/sections?commune=${filters.commune}`)
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, [filters.commune]);

  // Fetch lots when section changes
  useEffect(() => {
    if (!filters.section) return;
    fetch(`/api/lots?section=${filters.section}`)
      .then((res) => res.json())
      .then((data) => setLots(data))
      .catch((err) => console.error("Error fetching lots:", err));
  }, [filters.section]);

  // Fetch ilots when lot changes
  useEffect(() => {
    if (!filters.lot) return;
    fetch(`/api/ilots?lot=${filters.lot}`)
      .then((res) => res.json())
      .then((data) => setIlots(data))
      .catch((err) => console.error("Error fetching ilots:", err));
  }, [filters.lot]);

  // Fetch parcels when ilot changes
  useEffect(() => {
    if (!filters.ilot) return;
    fetch(`/api/parcels?ilot=${filters.ilot}`)
      .then((res) => res.json())
      .then((data) => setParcels(data))
      .catch((err) => console.error("Error fetching parcels:", err));
  }, [filters.ilot]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Send filters to backend
  const handleApplyFilters = () => {
    setFilterApplied(!isFilterApplied)
    fetch("/api/filter-parcels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Filtered data:", data);
        // You can send this to parent component (MapView) later
      });
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
            label="Commune"
            name="commune"
            value={filters.commune}
            onChange={handleChange}
            options={communes}
          />
          <SelectField
            label="Section"
            name="section"
            value={filters.section}
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
