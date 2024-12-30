import React, { useState } from "react";
import Link from "next/link";
import FocusLock from "react-focus-lock";
import Head from "next/head";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-500 to-gray-100 flex flex-col items-center justify-center"
      role="main"
      aria-labelledby="dashboard-title"
    >
      <Head>
        <title>Dashboard für Finanzinstrumente</title>
        <meta
          name="description"
          content="Ein Dashboard zum Erkunden von Börsen-, Metadaten- und Candle-Daten."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header Section */}
      <h1
        id="dashboard-title"
        className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md"
      >
        Dashboard für Finanzinstrumente
      </h1>
      <p className="text-gray-700 text-lg mb-12 text-center">
        Erkunden und analysieren Sie Finanzdaten mit Leichtigkeit
      </p>

      {/* Button Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/exchange"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all"
          aria-label="View Exchange Data"
        >
          Börsen-Daten anzeigen
        </Link>
        <Link
          href="/metadata"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition-all"
          aria-label="View Metadata"
        >
          Metadaten-Daten anzeigen
        </Link>
        <Link
          href="/candles"
          className="bg-gray-600 text-white px-10 py-10 rounded-lg shadow-md hover:bg-yellow-600 transform hover:scale-105 transition-all"
          aria-label="View Candle Data"
        >
          Candle-Daten anzeigen
        </Link>
      </div>

      {/* Menu Button */}
      <button
        onClick={toggleModal}
        aria-label="Open Information Modal"
        className="absolute top-4 left-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        ☰
      </button>

      {/* Modal */}
      {isModalOpen && (
        <FocusLock>
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Modal Content */}
            <div className="bg-gradient-to-br from-gray-500 to-gray-100 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
              <h2
                id="modal-title"
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Über diese Website
              </h2>
              <p id="modal-description" className="text-gray-800 mb-6">
                Diese Website bietet ein intuitives Dashboard zum Erkunden und
                Analysieren von Finanzdaten wie Börsendaten, Metadaten und
                Candle-Daten.
              </p>
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                aria-label="Close Modal"
              >
                schließen
              </button>
            </div>
          </div>
        </FocusLock>
      )}
    </div>
  );
}
