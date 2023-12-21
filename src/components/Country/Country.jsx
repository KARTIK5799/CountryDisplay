import React, { useEffect, useState } from 'react';

const Country = () => {
  const [apiData, setApiData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = apiData
    ? apiData.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="app p-6 bg-gray-100 flex flex-col items-center"> 
      <h1 className="text-3xl font-bold mb-4">Country Information</h1>

      <input
        type="text"
        placeholder="Search by country name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-200"
      />

      {filteredCountries.length > 0 ? (
        <div className="flex flex-wrap justify-center flex-col"> 
          {filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg mx-2 my-2 flex flex-col items-center w-36 h-40"
            >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-20 object-cover mb-2 rounded-md"
              />
              <h3 className="text-sm font-semibold mb-1">{country.name.common}</h3>
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
