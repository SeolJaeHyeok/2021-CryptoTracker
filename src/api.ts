const BASE_URL = `https://api.coinpaprika.com/v1`;

// React Query의 fetcher function은 반드시 json의 Promise를 반환해야 한다.
export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const fetchCoinInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchCoinTicker = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const fetchCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 14;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
};

export const fetchTodayPrice = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today/`).then((res) =>
    res.json()
  );
};
