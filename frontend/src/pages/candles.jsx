import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Head from "next/head";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Candles() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState("");

  useEffect(() => {
    // Fetch data
    fetch("http://localhost:3001/api/candle")
      .then((res) => res.json())
      .then((response) => {
        const extractedData =
          response.hits?.hits?.map((item) => ({
            id: item._id,
            ...item._source,
          })) || [];
        setData(extractedData);
        if (extractedData.length > 0) {
          updateChartData(extractedData, extractedData[0].symbol); // Default chart
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const updateChartData = (data, symbol) => {
    const filtered = data.filter((item) => item.symbol === symbol);
    const labels = filtered.map((item) => item.dateTime.split("T")[0]);
    const prices = filtered.map((item) => item.endPrice);

    setChartData({
      labels,
      datasets: [
        {
          label: `End Prices for ${symbol}`,
          data: prices,
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderWidth: 2,
        },
      ],
    });
    setSelectedSymbol(symbol);
  };

  return (

    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-3xl font-bold text-yellow-600 mb-6">Candle-Daten</h1>
      <link rel="canonical" href="http://localhost:3000/candles" />


      <Head>
  <title>Candle Data | Financial Dashboard</title>
  <meta
    name="description"
    content="View and analyze candlestick data for financial symbols over time."
  />
  <meta property="og:title" content="Candle Data | Financial Dashboard" />
  <meta property="og:description" content="View candlestick data for financial analysis." />
  <meta property="og:image" content="/images/chart-preview.png" />
  <meta property="og:url" content="http://localhost:3000/candles" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Candle Data | Financial Dashboard" />
  <meta name="twitter:description" content="View candlestick data for financial analysis." />
  <meta name="twitter:image" content="/images/chart-preview.png" />
</Head>


      {/* Symbol Selector */}
     <select
  value={selectedSymbol}
  onChange={(e) => updateChartData(data, e.target.value)}
  className="border p-2 rounded mb-4"
  aria-label="Select a financial symbol to display chart data"
>

        {Array.from(new Set(data.map((item) => item.symbol))).map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>

      {/* Line Chart */}
      {chartData.labels && chartData.datasets && (
        <div role="img" aria-labelledby="chart-title" aria-describedby="chart-desc">
  <h2 id="chart-title" className="sr-only">End Prices Chart</h2>
  <p id="chart-desc" className="sr-only">
    A line chart displaying the end prices of selected financial symbols over time.
  </p>
  <Line data={chartData} />
</div>


      )}
    </div>
  );
}
