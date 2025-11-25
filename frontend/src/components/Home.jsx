import Header from "./Header";
import InputPanel from "./InputPanel";
import ChartComponent from "./Chart";
import PriceCard from "./PriceCard";
import { Link } from "react-router-dom";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Home({ 
  ticker, 
  setTicker, 
  days, 
  setDays, 
  handlePredict, 
  loading, 
  historical, 
  forecast,
  predictionData,
  darkMode 
}) {
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <div
      className={`py-8 ${
        darkMode ? "bg-gray-800" : "bg-gradient-to-br from-gray-50 to-gray-100"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <Header darkMode={darkMode} />

        <InputPanel
          ticker={ticker}
          setTicker={setTicker}
          days={days}
          setDays={setDays}
          onPredict={handlePredict}
          loading={loading}
          darkMode={darkMode}
        />

        {/* Price Overview Cards */}
        {historical.length > 0 && forecast.length > 0 && (
          <PriceCard
            ticker={ticker}
            historical={historical}
            forecast={forecast}
            predictionData={predictionData}
            darkMode={darkMode}
          />
        )}

        {historical.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } rounded-xl shadow-lg p-6 transition-colors duration-300`}
          >
            {/* Chart Heading */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {ticker} Stock Price Chart
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Historical data (6 months) and predicted prices
              </p>
            </div>
            
            <ChartComponent
              historical={historical}
              forecast={forecast}
              darkMode={darkMode}
            />
          </motion.div>
        )}

        {/* Team Preview Section */}
        <motion.div
          ref={teamRef}
          initial={{ opacity: 0, y: 60 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7 }}
          className={`mt-12 ${
            darkMode
              ? "bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900"
              : "bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50"
          } rounded-xl p-8 text-center transition-colors duration-300`}
        >
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-3 bg-linear-to-r from-green-500  to-green-600 bg-clip-text text-transparent">
              ✨ Meet Our Team ✨
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } max-w-2xl mx-auto mb-6`}
            >
              The brilliant minds behind StockVision AI, dedicated to bringing
              you cutting-edge AI predictions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {[
              {
                name: "Nitai Dalal",
                role: "Full Stack Developer",
                image: "nitai.jpg",
              },
              {
                name: "Ayan Biswas",
                role: "Data Analyst",
                image: "ayan2.jpg",
              },
              {
                name: "Subhajit Jana",
                role: "UI/UX Designer",
                image: "subhajit.png",
              },
              {
                name: "Masudur Rahman",
                role: "ML Expert",
                image:
                  "https://ui-avatars.com/api/?name=Masudur+Rahman&background=ec4899&color=fff&size=200",
              },
              {
                name: "Milan Ghosh",
                role: "System Architect",
                image:
                  "https://ui-avatars.com/api/?name=Milan+Ghosh&background=f59e0b&color=fff&size=200",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 , transition: { duration: 0.2 },border: `2px solid ${darkMode ? '#a78bfa' : '#8b5cf6'}` }}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-blue-500"
                />
                <h3
                  className={`font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-xs text-blue-600">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
            to="/about"
            className={`inline-block ${
              darkMode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            } text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
          >
            Learn More About Our Team →
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
