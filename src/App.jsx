import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Country Information</h1>
      {apiData ? (
        <ul>
          {apiData.map((country) => (
            <li key={country.cca3}>
              <strong>{country.name.common}</strong>
              <br />
              <span>Capital: {country.capital}</span>
              <br />
              <span>Population: {country.population}</span>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
