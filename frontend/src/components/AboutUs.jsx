import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutUs({ darkMode }) {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Nitai Dalal",
      role: "Full Stack Developer",
      image: "nitai.jpg",
      description: "Backend API and frontend development",
    },
    {
      name: "Ayan Biswas",
      role: "Data analyst",
      image: "ayan2.jpg",
      description: "Financial data analysis and feature engineering",
    },
    {
      name: " Subhajit Jana",
      role: "UI/UX Designer",
      image: "subhajit.png",
      description: "Making the app beautiful and user-friendly",
    },
    {
      name: "Masudur  Rahman",
      role: "ML Expert",
      image:
        "https://ui-avatars.com/api/?name=Masudur+Rahman&background=ec4899&color=fff&size=200",
      description: "XGBoost model training and feature engineering",
    },
    {
      name: "Milan Ghosh",
      role: "System Architect",
      image:
        "https://ui-avatars.com/api/?name=Milan+Ghosh&background=f59e0b&color=fff&size=200",
      description: "Infrastructure and deployment",
    },
  ];

  return (
    <div className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <motion.div 
          ref={aboutRef}
          initial={{ opacity: 0, y: 50 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-xl p-8 mb-12 transition-colors duration-300`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About StockVision AI
          </h2>
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            StockVision AI is an advanced stock price prediction platform powered by XGBoost (Extreme Gradient Boosting) machine learning. 
            Our AI model analyzes historical stock data, technical indicators, and market patterns to provide accurate price forecasts.
          </p>
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Built with cutting-edge machine learning technologies, our platform helps investors and traders make informed decisions 
            by visualizing both historical trends and future predictions with realistic volatility modeling.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-300`}
            >
              <div className="text-3xl mb-2">🤖</div>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI-Powered</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Advanced XGBoost model trained on multiple stocks with engineered features
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-300`}
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Real-Time Data</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Live stock market data integration with Yahoo Finance
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-300`}
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accurate Forecasts</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Volatility-adjusted predictions for realistic market scenarios
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          ref={teamRef}
          initial={{ opacity: 0, y: 60 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7 }}
          className={`${darkMode ? 'bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50'} rounded-xl p-8 mb-8 transition-colors duration-300`}
        >
          <div className="text-center mb-8">
            <h2 className={`text-2xl md:text-4xl font-bold mb-3 bg-linear-to-r from-green-500  to-green-600 bg-clip-text text-transparent`}>
              ✨ Meet Our Team ✨
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
              The brilliant minds behind StockVision AI, dedicated to bringing you cutting-edge AI predictions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={teamInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
                  whileHover={{ scale: 1, y: -8,  border: `2px solid ${darkMode ? '#a78bfa' : '#8b5cf6'}` }}
                className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 overflow-visible group`}
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                
                {/* Sparkle effect */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-3xl animate-pulse">✨</span>
                </div>
                
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-105 shadow-lg"
                />
                <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-all duration-300`}>
                  {member.name}
                </h3>
                <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-blue-400 group-hover:text-pink-400' : 'text-blue-600 group-hover:text-pink-600'} transition-colors duration-300`}>
                  {member.role}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-700'} transition-colors duration-300`}>
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
