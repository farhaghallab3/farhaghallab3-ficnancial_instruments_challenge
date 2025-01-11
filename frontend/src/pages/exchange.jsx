import { useEffect, useState } from "react";
import React from "react";
import FocusLock from "react-focus-lock";
import Head from "next/head";

export default function Exchange() {
  const [data, setData] = useState([]); // Full data
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Filtered data for the table
  const [search, setSearch] = useState(""); // Search term
  const [showModal, setShowModal] = useState(false); // Show modal state
  const [newData, setNewData] = useState({
    _index: "",
    _type: "",
    _id: "",
    _score: 0,
    _source: {
      symbol: "",
      ticker: "",
      code: "",
      isin: "",
      type: "",
      wpkn: "",
      name: "",
      nameLong: "",
      region: "",
      country: "",
      currency: "",
      figi: "",
      cik: "",
      lei: "",
      source: "",
      operatingMIC: "",
      codeExchange: "",
      virtualExchange: "",
      nameExchange: "",
      isArtificialExchange: false,
      segmentExchange: "",
      segmentNameExchange: "",
    },
  });

  useEffect(() => {
    // Fetch exchange data dynamically from the backend
    fetch("${import.meta.env.VITE_BACKEND_URL}/exchange")
      .then((res) => res.json())
      .then((response) => {
        const extractedData =
          response.hits?.hits?.map((item) => ({
            _index: item._index || "N/A",
            _type: item._type || "_doc",
            _id: item._id || "N/A",
            _score: item._score || 0,
            _source: item._source || {}, // Include _source object
          })) || [];
        setData(extractedData);
        setFilteredData(extractedData); // Initialize filtered data
      })
      .catch((err) => console.error("Error fetching exchange data:", err));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  // Handle new data input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("_source.")) {
      const fieldName = name.split(".")[1]; // Get the key inside `_source`
      setNewData((prev) => ({
        ...prev,
        _source: {
          ...prev._source,
          [fieldName]: value,
        },
      }));
    } else {
      setNewData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Filter by country
  const handleCountryFilter = (country) => {
    setSelectedCountry(country);
    if (country === "") {
      setFilteredData(data); // Show all data if no country is selected
    } else {
      const filtered = data.filter(
        (item) => item._source.country?.toLowerCase() === country.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const uniqueCountries = [...new Set(data.map((item) => item._source.country))];

  // Add new data
  const handleAddNewData = () => {
    // Set default values for empty fields
    const sanitizedData = {
      ...newData,
      _id: newData._id || "N/A",
      _source: {
        ...Object.entries(newData._source).reduce((acc, [key, value]) => {
          acc[key] = value || "N/A"; // Default to "N/A" if empty
          return acc;
        }, {}),
      },
    };

    const updatedData = [...data, sanitizedData];
    setData(updatedData);
    setFilteredData(updatedData);

    // Send new data to the backend
    fetch("http://localhost:3001/api/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData),
    })
      .then((res) => res.json())
      .then(() => console.log("New exchange entry added successfully."))
      .catch((err) => console.error("Error adding exchange data:", err));

    setNewData({
      _index: "",
      _type: "",
      _id: "",
      _score: 0,
      _source: {
        symbol: "",
        ticker: "",
        code: "",
        isin: "",
        type: "",
        wpkn: "",
        name: "",
        nameLong: "",
        region: "",
        country: "",
        currency: "",
        figi: "",
        cik: "",
        lei: "",
        source: "",
        operatingMIC: "",
        codeExchange: "",
        virtualExchange: "",
        nameExchange: "",
        isArtificialExchange: false,
        segmentExchange: "",
        segmentNameExchange: "",
      },
    });
    setShowModal(false);
  };

  // Dynamically generate table headers
  const tableHeaders = [
    "_index",
    "_type",
    "_id",
    "_score",
    ...Object.keys(data[0]?._source || {}), // Include keys from the _source object
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Börsen-Daten</h1>
      <link rel="canonical" href="http://localhost:3000/exchange" />

      {/* Header and Button Section */}
      
      <Head>
  <title>Börsen-Daten | Finanzinstrumente Dashboard</title>
  <meta
    name="description"
    content="Sehen Sie Börsendaten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu."
  />
  <meta name="keywords" content="Börsen-Daten, Finanzdaten, Finanzinstrumente, Dashboard" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph (OG) metadata */}
  <meta property="og:title" content="Börsen-Daten | Finanzinstrumente Dashboard" />
  <meta property="og:description" content="Sehen Sie Börsendaten und analysieren Sie Finanzdaten einfach und schnell." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="http://localhost:3000/exchange" />
  <meta property="og:image" content="/path-to-image.png" />

  {/* Twitter Card metadata */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Börsen-Daten | Finanzinstrumente Dashboard" />
  <meta name="twitter:description" content="Sehen Sie Börsendaten und analysieren Sie Finanzdaten einfach und schnell." />
  <meta name="twitter:image" content="/path-to-image.png" />
</Head>




        {/* Button to Add New Entry */} 

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          +
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        
      <label htmlFor="search-input" className="sr-only">Search through exchange data</label>
<input
  id="search-input"
  type="text"
  placeholder="Nach Name suchen..."
  value={search}
  onChange={handleSearch}
  className="border p-2 rounded w-full"
  aria-label="Search through exchange data"
/>

      </div>

      {/* Country Filter */}
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="country-filter" className="font-bold text-gray-700">
          Filtern nach Land:
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryFilter(e.target.value)}
          className="border p-2 rounded bg-white text-gray-600 shadow-sm"
          aria-label="Filter by country"
        >
          <option value="">All Countries</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>
              {country || "Unknown"}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              {tableHeaders.map((header, index) => (
                <th key={index} className="px-4 py-2">
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-100">
                  {tableHeaders.map((header, i) => (
                    <td key={i} className="px-4 py-2">
                      {header in item._source
                        ? item._source[header] || "N/A"
                        : item[header] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center text-gray-500 py-4"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding New Entry */}
      {showModal && (
  <FocusLock>
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Neue Börsen-Daten hinzufügen</h2>
            <div className="space-y-4">
              {Object.entries(newData).map(([key, value]) => {
                if (key === "_source") {
                  // For nested "_source" fields
                  return Object.entries(newData._source).map(
                    ([nestedKey, nestedValue]) => (
                      <div key={nestedKey}>
                        <label className="block font-medium text-gray-700 mb-2">
                          {nestedKey.toUpperCase()}
                        </label>
                        <input
                          type="text"
                          name={`_source.${nestedKey}`}
                          placeholder={`Enter ${nestedKey}`}
                          value={nestedValue}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded"
                          aria-label={`Input for ${nestedKey}`}
                        />
                      </div>
                    )
                  );
                } else {
                  // For top-level fields
                  return (
                    <div key={key}>
                      <label className="block font-medium text-gray-700 mb-2">
                        {key.toUpperCase()}
                      </label>
                      <input
                        type="text"
                        name={key}
                        placeholder={`Enter ${key}`}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        aria-label={`Input for ${key}`}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transform hover:scale-105 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewData}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transform hover:scale-105 transition-all"
              >
                Done
              </button>
            </div>
          </div>
          
        </div>
        </FocusLock>
      )}
    </div>
  );
}
