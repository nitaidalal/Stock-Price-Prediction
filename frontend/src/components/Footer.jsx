
import { Link } from "react-router-dom";

export default function Footer({ darkMode }) {


  return (
    <footer
      className={`mt-16 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-xl font-bold  mb-3">
              📈{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockVision AI
              </span>
            </Link>
            <p
              className={`text-sm mt-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Advanced AI-powered stock price prediction using LSTM neural
              networks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Email: dalalnitai7@gmail.com
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mt-1`}
            >
              Support: support@stockvision.ai
            </p>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } text-center`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} StockVision AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}