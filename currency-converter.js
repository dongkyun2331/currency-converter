const axios = require("axios");

// 1st function - getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    "http://data.fixer.io/api/latest?access_key=1edd5466135e2c9bc8c3026a21bb5fbe"
  );

  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  return exchangeRate;
};

// 2nd function - getCountries
const getCountries = async (toCurrency) => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/currency/${toCurrency}`
  );

  response.data.map((country) => console.log(country.name));
};

getCountries("USD");
