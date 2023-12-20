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
    <div className="app p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Country Information</h1>
      {apiData ? (
        <div className="flex flex-wrap justify-center">
          {apiData.map((country) => (
            <div
              key={country.cca3}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg mx-4 my-4 flex flex-col items-center w-72 h-72"
            >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
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
