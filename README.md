# 📈 Stock Price Prediction using XGBoost
Full‑stack stock price forecasting (Vite + React frontend, FastAPI backend, XGBoost ML model).

Live App: https://stock-price-prediction-nitai.vercel.app/

---

## Project Overview
This project is an end-to-end stock price forecasting system that predicts up to 5 days of future prices using an XGBoost regression model trained on 5 years of historical stock data. The system includes:

- A responsive React frontend (Vite + Tailwind) to input tickers and visualize results.
- A FastAPI backend that fetches data, computes features, loads the trained XGBoost model, and serves predictions.
- ML training scripts to build the XGBoost model (saved at `/backend/saved_models/simple_xgb.pkl`).

Users can:
- Enter any stock ticker (AAPL, TSLA, GOOGL, …)
- View ~6 months of historical closing prices
- Get up to 30 days of future price predictions
- Visualize history + predictions on interactive charts

---

## Tech Stack
- Frontend: Vite, React, Tailwind CSS, Axios, Chart.js — Deployed on Vercel
- Backend: FastAPI, yfinance, XGBoost, Pandas, NumPy — Deployed on Render
- ML: Python, XGBoost, Joblib (to save/load models)

---

## Project Structure
stock_price_prediction/
```
├── frontend/            # React + Vite + Tailwind
│   └── src/
├── backend/
│   ├── main.py          # FastAPI routes
│   └── saved_models/
│       └── simple_xgb.pkl
├── ML/
│   └── train_xgb.py     # XGBoost training script
└── README.md
```

---

## API Endpoints
Base URL: https://stock-price-prediction-lcif.onrender.com

1) Get historical data
- GET /historical?ticker=AAPL
- Response: JSON list of ~180 (6 months) recent closing prices and dates

2) Predict future prices
- GET /predict?ticker=AAPL&days=5
- Response: Predicted prices for the next N days (N up to 5)
  - Each entry includes predicted_price and prediction_date

Example curl:
```bash
curl "https://stock-price-prediction-lcif.onrender.com/predict?ticker=AAPL&days=5"
```

---

## How Prediction Works
1. Backend downloads recent data (last 1 year) for the requested ticker (using yfinance).
2. It computes ML features used during training:
   - Moving Averages (5-day, 20-day)
   - Volatility (10-day std)
   - Momentum indicator
   - Daily returns
3. The last feature vector is fed into the saved XGBRegressor to predict the next-day return.
4. The predicted return is converted to a predicted price.
5. For multi-step forecasts, the newly predicted price is appended and features are updated iteratively to predict the next day — repeated until the requested number of days is reached.

---

## Machine Learning Model (details)
- Model: XGBoost Regressor (XGBRegressor)
- Features: 5-day MA, 20-day MA, 10-day volatility, momentum, daily returns, etc.
- Training data: ~5 years of historical data from Yahoo Finance (yfinance)
- Multi-stock training for better generalization (AAPL, MSFT, GOOGL, AMZN, TSLA, NVDA, META, JPM, WMT, NFLX)
- Target: Next-day return; multi-step prediction via iterative forecasting
- Total samples: ~12,000+
- Saved model location: `/backend/saved_models/simple_xgb.pkl`

---

## Local Setup / Quick Start

Prerequisites:
- Node.js (LTS) + npm or yarn
- Python 3.8+
- git

Clone:
```bash
git clone https://github.com/nitaidalal/Stock-Price-Prediction.git
cd Stock-Price-Prediction
```

Frontend:
```bash
cd frontend
# Install
npm install
# Run dev server
npm run dev
# Build for production
npm run build
```

Backend:
```bash
cd backend
# Create & activate venv (optional but recommended)
python -m venv venv
# macOS / Linux:
source venv/bin/activate
# Windows:
venv\Scripts\Activate.ps1

pip install -r requirements.txt
# Start FastAPI (development)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Or use start.sh (used by Render in production)
sh start.sh
```

Notes:
- If `/backend/saved_models/simple_xgb.pkl` is included, the backend will load it automatically.
- If you retrain, place the new model at `/backend/saved_models/simple_xgb.pkl`.

---

## Training the Model
A basic training script is provided at `/ML/train_xgb.py`. Typical steps:

1. Install training dependencies:
```bash
pip install -r ML/requirements.txt
# or
pip install pandas numpy scikit-learn xgboost yfinance joblib
```

2. Run training:
```bash
python ML/train_xgb.py --tickers AAPL MSFT GOOGL AMZN TSLA NVDA META JPM WMT NFLX --start 2019-01-01 --end 2024-01-01 --save-path backend/saved_models/simple_xgb.pkl
```

3. The script should:
- Fetch data via yfinance
- Create features (MAs, volatility, momentum, returns)
- Train XGBRegressor
- Save the fitted model using joblib

Adjust args in the script per its implementation.

---

## Deployment
Frontend (Vercel)
- Connect your GitHub repo to Vercel
- Set project to deploy from the `/frontend` folder
- Vercel auto-deploys on push

Backend (Render)
- Create a new Web Service on Render
- Point to the `/backend` folder
- Set start command: `sh start.sh` (or an equivalent `uvicorn` command)
- Add any required environment variables (if used)
- Render will auto-deploy on push

---

## Features
- Real-time stock history visualization
- Future stock price prediction (up to 30 days)
- FastAPI backend + React frontend
- Model trained from scratch using XGBoost
- Fully responsive UI and cloud-deployed demo

---

## Roadmap / Future Enhancements
- LSTM or Transformer-based time-series models
- Additional feature engineering (news, sentiment, macro indicators)
- Live streaming data for near real-time predictions
- Multi-ticker comparison dashboards
- Model performance & monitoring dashboard

---

## Contributing
Contributions are welcome! Suggested workflow:
1. Fork the repo
2. Create a new branch: `git checkout -b feat/your-change`
3. Make changes and add tests where appropriate
4. Open a Pull Request with a clear description of your changes

Please open issues for feature requests or bugs.

---

## Troubleshooting & Tips
- Large data/model files are often gitignored; if missing, re-run training or download model artifacts.
- Ensure Python dependencies (xgboost, pandas, yfinance) are installed and the correct Python version is active.
- If CORS errors occur when calling the backend from the frontend, confirm backend CORS settings in FastAPI.

---

## License
This project is licensed under the MIT License. See LICENSE file for details.

---

## Author
Nitai Dalal  
B.Tech CSE (AI & ML)

---
