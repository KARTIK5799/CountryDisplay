import React, { useEffect, useState } from 'react';
import styles from './Country.module.css'

const Country = () => {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
 


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
            placeholder="Search for a countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
   
        <div>
          {filteredCountries.length > 0 ? (
            <div className={styles.flagSection}>
              {filteredCountries.map((country) => (
                <div key={country.flags.png}className={styles.countryContainer}>
                 
                  <img
                    src={country.flags.png}
                    alt={`flag`}
                    className={styles.countryImage}
                  />
                  <div className={styles.countryName}><h4>{country.name.common}</h4></div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  
};

export default Country;
