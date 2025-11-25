import { motion } from 'framer-motion';

export default function PriceCard({ ticker, historical, forecast, predictionData, darkMode }) {
  // Get last known price from prediction response or fallback to historical
  const lastKnownPrice = predictionData?.last_known_price 
    || (historical.length > 0 ? historical[historical.length - 1].close : null);
  const lastKnownDate = predictionData?.last_known_date 
    || (historical.length > 0 ? historical[historical.length - 1].date : null);
  
  // Helper to extract date
  const extractDate = (dateString) => {
    const match = dateString?.match(/\d{4}-\d{2}-\d{2}/);
    return match ? match[0] : dateString;
  };
  
  // Get next 5 days predictions
  const next5Days = forecast.slice(0, Math.min(5, forecast.length));

  // Calculate price change for each day
  const getPriceChange = (currentPrice, previousPrice) => {
    if (!previousPrice) return { value: 0, percentage: 0 };
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    return { value: change, percentage };
  };

  if (!lastKnownPrice || next5Days.length === 0) {
    return null;
  }
  
  const totalDays = forecast.length;
  const lastPrediction = forecast[forecast.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        darkMode ? 'bg-gray-900' : 'bg-white'
      } rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {ticker} Price Overview
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Last known price and {totalDays}-day forecast
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Last Known Price Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          className={`${
            darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'
          } rounded-lg p-5 text-white shadow-md`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Last Known Price</span>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-3xl font-bold mb-1">${lastKnownPrice.toFixed(2)}</div>
          <div className="text-sm opacity-80">{extractDate(lastKnownDate)}</div>
          <div className="text-xs opacity-70 mt-1">Closed Market Price</div>
        </motion.div>

        {/* Next 5 Days Predictions */}
        {next5Days.map((day, index) => {
          const previousPrice = index === 0 ? lastKnownPrice : next5Days[index - 1].predicted_price;
          const change = getPriceChange(day.predicted_price, previousPrice);
          const isPositive = change.value >= 0;

          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } rounded-lg p-5 shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Day {day.day}
                </span>
                <span className="text-xl">{isPositive ? '📈' : '📉'}</span>
              </div>
              <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${day.predicted_price.toFixed(2)}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {isPositive ? '+' : ''}{change.value.toFixed(2)} ({isPositive ? '+' : ''}{change.percentage.toFixed(2)}%)
                </span>
              </div>
              <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {day.date}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Section */}
      {next5Days.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`mt-6 p-4 rounded-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {totalDays}-Day Price Range: 
              </span>
              <span className={`ml-2 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${Math.min(...forecast.map(d => d.predicted_price)).toFixed(2)} - ${Math.max(...forecast.map(d => d.predicted_price)).toFixed(2)}
              </span>
            </div>
            <div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Expected Change: 
              </span>
              <span className={`ml-2 font-bold ${
                lastPrediction.predicted_price >= lastKnownPrice ? 'text-green-500' : 'text-red-500'
              }`}>
                {((lastPrediction.predicted_price - lastKnownPrice) / lastKnownPrice * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
