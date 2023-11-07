const axios = require("axios");

// 1번 함수 - 환율 가져오기
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    "http://data.fixer.io/api/latest?access_key=1edd5466135e2c9bc8c3026a21bb5fbe"
  );

  const rate = response.data.rates;
  const customCurrencyRate = 1 / rate[fromCurrency];
  const exchangeRate = customCurrencyRate * rate[toCurrency];

  return exchangeRate;
};

// 2번 함수 - 국가 목록 가져오기
const getCountries = async (toCurrency) => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/currency/${toCurrency}`
  );

  const countriesData = response.data;

  // 응답에서 국가 이름 추출
  const countries = countriesData.map((country) => country.name.common);

  return countries;
};

// 3번 함수 - 통화 변환
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(fromCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency}은(는) ${convertedAmount} ${toCurrency}로 가치가 있으며, 다음 국가에서 사용할 수 있습니다: ${countries}`;
};

// 의미 있는 데이터를 얻기 위해 convertCurrency 호출
convertCurrency("KRW", "USD", 100).then((message) => {
  console.log(message);
});
