import React, { useEffect, useState } from 'react';

const Country = () => {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [keyValue, setKeyValue] = useState(1); 

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

  const filteredCountries = apiData
    ? apiData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 flex flex-col items-center w-screen">
      <div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border"
        />
      </div>
      <div>
        {filteredCountries.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {filteredCountries.map((country, index) => (
              <div key={keyValue + index} className="bg-white p-6 border mx-2 my-4 flex flex-col items-center ">
               {/* { console.log(keyValue + index)} */}
                <img
                  src={country.flags.png}
                  alt={`flag`}
                  className="h-24 w-48"
                />
                <h2>{country.name.common}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default Country;
