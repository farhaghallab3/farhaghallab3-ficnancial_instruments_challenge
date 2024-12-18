import { useEffect, useState } from "react";
import React from "react";

export default function Exchange() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/exchange")
      .then((res) => res.json())
      .then((response) => {
        // Extract data from response: hits.hits
        const extractedData = response.hits?.hits?.map((item) => item._source) || [];
        console.log("Börsen-Daten.:", extractedData);
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Börsen-Daten</h1>

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
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Typ</th>
              <th className="px-4 py-2">Währung</th>
              <th className="px-4 py-2">Land</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-blue-100">
                <td className="px-4 py-2">{item.symbol || "N/A"}</td>
                <td className="px-4 py-2">{item.name || "N/A"}</td>
                <td className="px-4 py-2">{item.type || "N/A"}</td>
                <td className="px-4 py-2">{item.currency || "N/A"}</td>
                <td className="px-4 py-2">{item.country || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
