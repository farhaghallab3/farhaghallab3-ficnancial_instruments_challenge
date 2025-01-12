import { useEffect, useState } from "react";
import React from "react";
import Head from "next/head";

export default function Metadata() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/metadata`)
      .then((res) => res.json())
      .then((response) => {
        // Extract data from response: hits.hits
        const extractedData =
          response.hits?.hits?.map((item) => ({
            id: item._id, // Add _id
            ...item._source,
          })) || [];
        console.log("Metadaten-Daten.:", extractedData);
        setData(extractedData);
        setFilteredData(extractedData);
      })
      .catch((err) => console.error("Fehler beim Abrufen der Daten.:", err));
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
        (item) => item.countryName?.toLowerCase() === country.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const uniqueCountries = [...new Set(data.map((item) => item.countryName))]; // Extract unique countries

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Metadaten-Daten</h1>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
      <Head>
  <title>Metadaten-Daten | Finanzinstrumente Dashboard</title>
  <meta
    name="description"
    content="Sehen Sie Metadatendaten, analysieren Sie Finanzinformationen und fügen Sie neue Daten hinzu."
  />
  <meta name="keywords" content="Metadaten-Daten, Finanzdaten, Finanzinstrumente, Dashboard" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph (OG) metadata */}
  <meta property="og:title" content="Metadaten-Daten | Finanzinstrumente Dashboard" />
  <meta property="og:description" content="Sehen Sie Börsendaten und analysieren Sie Finanzdaten einfach und schnell." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="http://localhost:3000/metadata" />
  <meta property="og:image" content="/path-to-image.png" />

  {/* Twitter Card metadata */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Metadaten-Daten | Finanzinstrumente Dashboard" />
  <meta name="twitter:description" content="Sehen Sie Metadatenedaten und analysieren Sie Finanzdaten einfach und schnell." />
  <meta name="twitter:image" content="/path-to-image.png" />
</Head>


        {/* Country Filter Dropdown */}
        <div className="flex items-center justify-between mb-6">
          <label htmlFor="country-filter" className="font-bold text-gray-700">
            Filter nach Land:
          </label>
        </div>
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryFilter(e.target.value)}
            className="border p-2 rounded bg-white text-gray-600 shadow-sm"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>
                {country || "Unbekannt"}
              </option>
            ))}
          </select>
        </div>
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-500 text-white">
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
                <tr key={index} className="border-b hover:bg-green-100">
                  <td className="px-4 py-2">{item.id || "N/A"}</td>
                  <td className="px-4 py-2">{item.symbol || "N/A"}</td>
                  <td className="px-4 py-2">{item.name || "N/A"}</td>
                  <td className="px-4 py-2">{item.type || "N/A"}</td>
                  <td className="px-4 py-2">{item.currency || "N/A"}</td>
                  <td className="px-4 py-2">{item.countryName || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
