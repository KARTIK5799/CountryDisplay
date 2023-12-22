import React, { useEffect, useState } from 'react';
import styles from './Country.module.css';

const Country = () => {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = apiData
    ? apiData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.flagSection}>
        {filteredCountries.map((country, index) => (
          <div key={index} className={styles.countryContainer}>
            <img
              src={country.flags?.png || ''}
              alt={`flag`}
              className={styles.countryImage}
            />
            <div className={styles.countryName}>
              <h2>{country.name.common}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;
