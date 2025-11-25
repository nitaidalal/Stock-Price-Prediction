from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import joblib
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

model = joblib.load("saved_models/simple_xgb.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def add_features(df):
    df["return"] = df["Close"].pct_change()
    df["ma_5"] = df["Close"].rolling(5).mean() / df["Close"] - 1
    df["ma_20"] = df["Close"].rolling(20).mean() / df["Close"] - 1
    df["volatility"] = df["return"].rolling(10).std()
    df["momentum"] = df["Close"] / df["Close"].shift(5) - 1
    return df


@app.get("/historical")
def historical(ticker: str = Query(..., description="Stock ticker symbol")):
    try:
        # Use same period as predict endpoint to ensure consistency
        df = yf.download(ticker, period="1y", progress=False, auto_adjust=True)
        if df is None or df.empty:
            return {"error": "No data found for ticker"}
        
        # Take only last 120 trading days (approx 6 months) for chart
        df = df.tail(120)
        
        # Reset index to get Date as a column
        df = df.reset_index()
        
        # Ensure we have the right columns
        if 'Close' not in df.columns:
            return {"error": "Close price data not available"}
        
        # Convert date column to string format
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime("%Y-%m-%d")
        
        # Build prices list
        prices = []
        for i in range(len(df)):
            prices.append({
                "date": str(df['Date'].iloc[i]),
                "close": float(df['Close'].iloc[i])
            })
        
        return {
            "ticker": ticker.upper(),
            "prices": prices,
        }
    except Exception as e:
        return {"error": f"Failed to fetch data: {str(e)}"}


@app.get("/predict")
def predict(ticker: str = Query(...), days: int = Query(30, ge=1, le=30)):
    df = yf.download(ticker, period="1y", progress=False, auto_adjust=True)

    if df is None or df.empty:
        return {"error": "No data found"}

    df = add_features(df).dropna()

    last = df.iloc[-1]
    last_price = float(last["Close"])

    last_date = df.index[-1]
    if not isinstance(last_date, datetime):
        last_date = pd.to_datetime(last_date)

    X = np.array(
        [
            last["ma_5"],
            last["ma_20"],
            last["volatility"],
            last["momentum"],
            last["return"],
        ]
    ).reshape(1, -1)

    predictions = []
    current_price = last_price

    for i in range(days):
        pred_return = float(model.predict(X)[0])

        # ✅ boost realistic movement
        pred_return *= 3

        # ✅ limit extreme moves
        pred_return = np.clip(pred_return, -0.05, 0.05)

        current_price *= 1 + pred_return
        predictions.append(current_price)

        # ✅ stronger feature update
        X[0, 4] = pred_return
        X[0, 3] = X[0, 3] * 0.6 + pred_return * 0.8

    forecast = [
        {
            "day": i + 1,
            "date": (last_date + timedelta(days=i + 1)).strftime("%Y-%m-%d"),
            "predicted_price": round(price, 2),
        }
        for i, price in enumerate(predictions)
    ]

    return {
        "ticker": ticker.upper(),
        "last_known_price": round(last_price, 2),
        "last_known_date": last_date.strftime("%Y-%m-%d"),
        "days": days,
        "forecast": forecast,
    }
