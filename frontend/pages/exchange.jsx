import { useEffect, useState } from "react";
import React from "react";

export default function Exchange() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/exchange")
      .then((res) => res.json())
      .then((response) => {
        // Extract data from response: hits.hits, including _id
        const extractedData =
          response.hits?.hits?.map((item) => ({
            id: item._id, // Add _id
            ...item._source,
          })) || [];
        console.log("Börsen-Daten:", extractedData);
        setData(extractedData);
        setFilteredData(extractedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = data.filter((item) =>
      item.name?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handleCountryFilter = (country) => {
    setSelectedCountry(country);
    if (country === "") {
      setFilteredData(data); // Show all data if no country is selected
    } else {
      const filtered = data.filter(
        (item) => item.country?.toLowerCase() === country.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const uniqueCountries = [...new Set(data.map((item) => item.country))];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Börsen-Daten</h1>

        {/* Country Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryFilter(e.target.value)}
            className="border p-2 rounded bg-white text-gray-600 shadow-sm"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>
                {country || "UnKnown"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Nach Name suchen..."
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-6"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Typ</th>
              <th className="px-4 py-2">Währung</th>
              <th className="px-4 py-2">Land</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-100">
                  <td className="px-4 py-2">{item.id || "N/A"}</td>
                  <td className="px-4 py-2">{item.symbol || "N/A"}</td>
                  <td className="px-4 py-2">{item.name || "N/A"}</td>
                  <td className="px-4 py-2">{item.type || "N/A"}</td>
                  <td className="px-4 py-2">{item.currency || "N/A"}</td>
                  <td className="px-4 py-2">{item.country || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  Keine Daten gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

