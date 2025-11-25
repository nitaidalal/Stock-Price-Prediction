const BASE_URL = "http://localhost:8000";

export async function getHistorical(ticker) {
  const res = await fetch(`${BASE_URL}/historical?ticker=${ticker}`);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export async function getPrediction(ticker, days) {
  const res = await fetch(`${BASE_URL}/predict?ticker=${ticker}&days=${days}`);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
