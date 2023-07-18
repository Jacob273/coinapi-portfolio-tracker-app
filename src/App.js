import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    async function fetchExchangeRates() {
      const assets = ['BTC', 'ETH', 'XRP'];
      const promises = assets.map(asset =>
        axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=YOUR_API_KEY`)
      );
      const responses = await Promise.all(promises);
      const exchangeRates = responses.reduce((acc, response, index) => {
        acc[assets[index]] = response.data.rate;
        return acc;
      }, {});
      setPortfolio(exchangeRates);
    }
    fetchExchangeRates();
  }, []);
  return (
    <div className="App">
     <h1>CoinAPI Cryptocurrency Portfolio Tracker App</h1>
     <ul>
        {Object.entries(portfolio).map(([asset, exchangeRate]) => (
          <li key={asset}>{asset}: {exchangeRate}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;