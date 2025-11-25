import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { getHistorical, getPrediction } from "./api";

export default function App() {
  const [ticker, setTicker] = useState("");
  const [days, setDays] = useState(5);
  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handlePredict = async () => {
    // Validation
    if (!ticker || ticker.trim() === "") {
      toast.error("Please enter a stock symbol");
      return;
    }

    if (days < 1 || days > 5) {
      toast.error("Days must be between 1 and 5");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading(`Fetching data for ${ticker}...`);
    
    try {
      const hist = await getHistorical(ticker);
      const pred = await getPrediction(ticker, days);

      if (!hist || !hist.prices || hist.prices.length === 0) {
        toast.error("Please enter a valid stock symbol", { id: loadingToast });
        setHistorical([]);
        setForecast([]);
        setPredictionData(null);
        return;
      }

      if (!pred || !pred.forecast || pred.forecast.length === 0) {
        toast.error("Failed to generate predictions", { id: loadingToast });
        setHistorical([]);
        setForecast([]);
        setPredictionData(null);
        return;
      }

      setHistorical(hist.prices);
      setForecast(pred.forecast);
      setPredictionData(pred);
      toast.success(`Successfully loaded predictions for ${ticker}!`, { id: loadingToast });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Please enter a valid stock symbol", { id: loadingToast });
      setHistorical([]);
      setForecast([]);
      setPredictionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 80,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#1f2937',
            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: darkMode 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '500px',
          },
          success: {
            duration: 3000,
            style: {
              background: darkMode ? '#065f46' : '#d1fae5',
              color: darkMode ? '#d1fae5' : '#065f46',
              border: darkMode ? '1px solid #10b981' : '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: darkMode ? '#065f46' : '#ffffff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: darkMode ? '#7f1d1d' : '#fee2e2',
              color: darkMode ? '#fecaca' : '#7f1d1d',
              border: darkMode ? '1px solid #ef4444' : '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: darkMode ? '#7f1d1d' : '#ffffff',
            },
          },
          loading: {
            style: {
              background: darkMode ? '#1e3a8a' : '#dbeafe',
              color: darkMode ? '#bfdbfe' : '#1e3a8a',
              border: darkMode ? '1px solid #3b82f6' : '1px solid #3b82f6',
            },
            iconTheme: {
              primary: '#3b82f6',
              secondary: darkMode ? '#1e3a8a' : '#ffffff',
            },
          },
        }}
      />
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  ticker={ticker}
                  setTicker={setTicker}
                  days={days}
                  setDays={setDays}
                  handlePredict={handlePredict}
                  loading={loading}
                  historical={historical}
                  forecast={forecast}
                  predictionData={predictionData}
                  darkMode={darkMode}
                />
              } 
            />
            <Route path="/about" element={<AboutUs darkMode={darkMode} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}
