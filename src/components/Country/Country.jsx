import React, { useEffect, useState } from 'react';

const Country = () => {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="p-6 flex flex-col items-center">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 border w-72"
      />
      {filteredCountries.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="bg-white p-6 rounded-lg border mx-2 my-4 flex flex-col items-center"
            >
              <img
                src={country.flags.png}
                alt={`flag`}
                className="w-24 h-24 m-1 object-cover rounded-sm"
              />
              <h2 alt={`name`}className="text-base overflow-hidden whitespace-nowrap overflow-ellipsis">{country.name.common}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p>No matching countries found.</p>
      )}
    </div>
  );
};

export default Country;
