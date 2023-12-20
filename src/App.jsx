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
        <div >
          {apiData.map((country) => (
            <div key={country.cca3} >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
               
              />
              <h3>{country.name.common}</h3>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

