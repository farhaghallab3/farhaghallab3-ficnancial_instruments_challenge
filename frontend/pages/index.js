import React from "react"; // Add this import at the top
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-gray-100 flex flex-col items-center justify-center">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
        Dashboard für Finanzinstrumente
      </h1>
      <p className="text-black-700 text-lg mb-12">
        Erkunden und analysieren Sie Finanzdaten mit Leichtigkeit
      </p>

      {/* Button Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/exchange"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          Börsen-Daten anzeigen
        </Link>
        <Link
          href="/metadata"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition-all"
        >
          Metadaten-Daten anzeigen
        </Link>
        <Link
          href="/candles"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-yellow-600 transform hover:scale-105 transition-all"
        >
          Candle-Daten anzeigen
        </Link>
      </div>
    </div>
  );
}
