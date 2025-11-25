import yfinance as yf
import pandas as pd
import numpy as np
from xgboost import XGBRegressor
import joblib
import os

STOCKS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "JPM", "WMT", "NFLX"]
PERIOD = "5y"

os.makedirs("saved_models", exist_ok=True)


def add_features(df):
    df["return"] = df["Close"].pct_change()

    df["ma_5"] = df["Close"].rolling(5).mean() / df["Close"] - 1
    df["ma_20"] = df["Close"].rolling(20).mean() / df["Close"] - 1

    df["volatility"] = df["return"].rolling(10).std()

    df["momentum"] = df["Close"] / df["Close"].shift(5) - 1

    return df


X = []
y = []

for ticker in STOCKS:
    df = yf.download(ticker, period=PERIOD)
    df = add_features(df).dropna()

    features = df[["ma_5", "ma_20", "volatility", "momentum", "return"]].values
    target = df["return"].shift(-1).dropna().values

    features = features[:-1]  # align sizes

    X.append(features)
    y.append(target)

X = np.vstack(X)
y = np.concatenate(y)

print("Training samples:", X.shape)

model = XGBRegressor(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
)

model.fit(X, y)

joblib.dump(model, "saved_models/simple_xgb.pkl")
print("✅ Model saved: simple_xgb.pkl")
