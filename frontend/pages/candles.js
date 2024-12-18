import { useEffect, useState } from "react";
import React from "react";

export default function Candles() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/candle")
      .then((res) => res.json())
      .then((response) => {
        // Extracting the _source field from the hits array
        const extractedData = response.hits?.hits?.map((item) => item._source) || [];
        console.log("Candle-Daten :", extractedData);
        setData(extractedData);
        setFilteredData(extractedData);
      })
      .catch((err) => console.error("Fehler beim Abrufen der Daten:", err));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filtered = data.filter((item) =>
      item.symbol?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6">Candle-Daten</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Nach Symbol suchen..."
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-6"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-yellow-500 text-white">
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Datum</th>
              <th className="px-4 py-2">Startpreis</th>
              <th className="px-4 py-2">Höchster Preis</th>
              <th className="px-4 py-2">Niedrigster Preis</th>
              <th className="px-4 py-2">EndPreis</th>
              <th className="px-4 py-2">Volumen</th>
              <th className="px-4 py-2">Währung</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-yellow-100">
                <td className="px-4 py-2">{item.symbol || "N/A"}</td>
                <td className="px-4 py-2">{item.dateTime || "N/A"}</td>
                <td className="px-4 py-2">{item.startPrice || "N/A"}</td>
                <td className="px-4 py-2">{item.highestPrice || "N/A"}</td>
                <td className="px-4 py-2">{item.lowestPrice || "N/A"}</td>
                <td className="px-4 py-2">{item.endPrice || "N/A"}</td>
                <td className="px-4 py-2">{item.volume || "N/A"}</td>
                <td className="px-4 py-2">{item.currency || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
