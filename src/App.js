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

   // Fetch exchange rates every 5 seconds
   const intervalId = setInterval(fetchExchangeRates, 5000);

   // Clean up the interval when the component unmounts to avoid memory leaks
   return () => clearInterval(intervalId);

  }, []);
  return (
    <div className="App">
     <h1>CoinAPI Cryptocurrency Portfolio Tracker App</h1>
     <div className="portfolio">
        {Object.entries(portfolio).map(([asset, exchangeRate]) => (
          <li key={asset} className="portfolio-item">
            <span className="asset-name">{asset}/USD:</span> 
            <span className="asset-rate">{exchangeRate}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
export default App;