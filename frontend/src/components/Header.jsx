import { motion } from 'framer-motion';

export default function Header({ darkMode }) {
  return (
    <header className="text-center mb-12 mt-4 relative min-h-[500px] flex flex-col justify-center">
      {/* Animated background effect */}
      <div className="absolute inset-0 w-full">
        <div
          className={`absolute bottom-0  w-full h-full ${
            darkMode ? "" : "bg-pink-300"
          } rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse`}
          style={{ animationDelay: "1400ms" }}
        ></div>
      </div>

      {/* Content - with relative positioning to be above background */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Title */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h1
              className={`text-5xl mb-6 md:text-7xl font-extrabold  ${
                darkMode ? "drop-shadow-2xl" : ""
              }`}
            >
              📈
              <span className="bg-linear-to-r from-blue-600 via-purple-600 bg-clip-text to-pink-600 text-transparent">
                StockVision AI
              </span>
            </h1>
          

          <div
            className={`inline-block px-6 py-2 rounded-full ${
              darkMode ? "bg-blue-900/50" : "bg-blue-100"
            } backdrop-blur-sm border ${
              darkMode ? "border-blue-700" : "border-blue-300"
            } mb-4`}
          >
            <span
              className={`text-sm font-semibold ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              ⚡ Powered by XGBoost Machine Learning
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-xl md:text-2xl font-medium animate-slide-up ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } mb-3`}
        >
          Predict the Future of Stock Markets with AI Precision
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-base md:text-lg animate-slide-up ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } max-w-3xl mx-auto mb-4`}
        >
          Harness the power of artificial intelligence to forecast stock prices
          with our cutting-edge XGBoost (Extreme Gradient Boosting) model. Get
          real-time predictions based on historical data, technical indicators,
          and advanced volatility analysis.
        </motion.p>

        {/* Feature badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-green-900/30 text-green-300 border border-green-700"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            ✓ Real-Time Data
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-purple-900/30 text-purple-300 border border-purple-700"
                : "bg-purple-100 text-purple-700 border border-purple-300"
            }`}
          >
            ✓ Gradient Boosting
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-pink-900/30 text-pink-300 border border-pink-700"
                : "bg-pink-100 text-pink-700 border border-pink-300"
            }`}
          >
            ✓ Volatility Analysis
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode
                ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
          >
            ✓ Accurate Forecasts
          </motion.span>
        </motion.div>
      </motion.div>
    </header>
  );
}
