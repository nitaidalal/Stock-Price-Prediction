import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function ChartComponent({ historical, forecast, darkMode }) {
  // Helper function to extract date from the pandas string format
  const extractDate = (dateString) => {
    // Extract date from format: "Ticker\n   2024-11-22\nName: 0, dtype: datetime64[ns]"
    const match = dateString.match(/\d{4}-\d{2}-\d{2}/); //
    return match ? match[0] : dateString;
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Separate today's data from historical
  const todayData = historical.find((d) => extractDate(d.date) === today);
  const pastHistorical = historical.filter((d) => extractDate(d.date) !== today);

  const labels = [
    ...pastHistorical.map((d) => extractDate(d.date)),
    ...(todayData ? [extractDate(todayData.date)] : []),
    ...forecast.map((d) => extractDate(d.date)),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Historical Price",
        // dont show historical data when hovering over today's price point

        data: [
          ...pastHistorical.map((d) => d.close),
          ...(todayData ? [todayData.close] : []),
          
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2.5,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
      },
      {
        label: "Today's Price",
        data: [
          ...Array(pastHistorical.length).fill(null),
          todayData ? todayData.close : null,
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderWidth: 0,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointStyle: "circle",
        showLine: false,
      },
      {
        label: "Predicted Price",
        data: [
          ...Array(pastHistorical.length + (todayData ? 1 : 0)).fill(null),
          ...forecast.map((d) => d.predicted_price),
        ],
        borderColor: "rgb(251, 146, 60)",
        backgroundColor: "rgba(251, 146, 60, 0.1)",
        borderWidth: 3,
        borderDash: [8, 4],
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window.innerWidth < 768 ? 1.2 : 2.5,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: window.innerWidth < 768 ? 10 : 20,
          font: {
            size: window.innerWidth < 768 ? 11 : 13,
            weight: '500',
          },
          color: darkMode ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        padding: window.innerWidth < 768 ? 8 : 12,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14,
          weight: 'bold',
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13,
        },
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: window.innerWidth < 768 ? 6 : 15,
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
          color: darkMode ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        grid: {
          display: true,
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
          color: darkMode ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return '$' + value.toFixed(2);
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
