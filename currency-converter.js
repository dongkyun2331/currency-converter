const axios = require("axios");

const getExchangeRate = (fromCurrency, toCurrency) => {
  axios
    .get(
      "http://data.fixer.io/api/latest?access_key=1edd5466135e2c9bc8c3026a21bb5fbe"
    )
    .then((response) => {
      const rate = response.data.rates;

      console.log(rate);
    });
};

getExchangeRate("USD", "EUR");
