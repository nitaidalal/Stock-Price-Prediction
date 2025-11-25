import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function InputPanel({ ticker, setTicker, days, setDays, onPredict, loading, darkMode }) {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-100px" });
  const popularStocks = [
    { symbol: "TSLA", name: "Tesla", icon: "🚗" },
    { symbol: "AAPL", name: "Apple", icon: "📱" }, // iPhone icon
    { symbol: "GOOGL", name: "Google", icon: "🔍" },
    { symbol: "MSFT", name: "Microsoft", icon: "💻" },
    { symbol: "AMZN", name: "Amazon", icon: "📦" }
  ];

  return (
    <motion.div 
      ref={panelRef}
      initial={{ opacity: 0, y: 30 }}
      animate={panelInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}
    >
      {/* Popular Stocks */}
      <div className="mb-6 ">
        <p className={`text-xl  font-semibold text-center   mb-3  ${darkMode ? 'bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent' : 'text-gray-700'}`}>
          Popular Stocks
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {popularStocks.map((stock, index) => (
            <motion.button
              key={stock.symbol}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={panelInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTicker(stock.symbol)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                ticker === stock.symbol
                  ? 'bg-blue-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <span className="mr-2">{stock.icon}</span>
              {stock.symbol}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={panelInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex flex-col">
          <label className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Ticker Symbol
          </label>
          <input
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter Ticker (e.g., AAPL)"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Days to Predict (Max 5)
          </label>
          <input
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            type="number"
            value={days}
            onChange={(e) => setDays( e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col justify-end">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onPredict}
            disabled={loading || !ticker.trim() || !days}
          >
            {loading  ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Predict"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
