// 이벤트 핸들러 등록
document
  .getElementById("conversion-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 이벤트의 기본 동작을 중지

    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    // 사용자로부터 입력을 받아 convertCurrency 함수 호출
    convertCurrency(fromCurrency, toCurrency, amount);
  });

// 1번 함수 - 환율 가져오기
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
  );

  const rate = response.data.rates;
  const exchangeRate = rate[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(
      `통화 정보를 가져올 수 없습니다: ${fromCurrency} 및 ${toCurrency}`
    );
  }

  return exchangeRate;
};

// 2번 함수 - 국가 목록 가져오기
const getCountries = async (toCurrency) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${toCurrency}`
    );

    // 응답에서 국가 이름 추출
    return response.data.map((country) => country.name.common);
  } catch (error) {
    throw new Error(`${toCurrency}를 사용하는 국가를 얻을 수 없습니다.`);
  }
};

// 3번 함수 - 통화 변환
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(fromCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  const result = `${amount} ${fromCurrency}은(는) ${convertedAmount} ${toCurrency}로 가치가 있으며, 다음 국가에서 사용할 수 있습니다: ${countries}`;

  // 결과를 화면에 표시하는 함수
  document.getElementById("result").innerText = result;
};

// 페이지 로딩 시 통화 변환 함수 호출
convertCurrency("USD", "KRW", 1);
