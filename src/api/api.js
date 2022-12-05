import axios from 'axios'

const KEY = import.meta.env.VITE_API_KEY
const REST_API_URL = 'https://min-api.cryptocompare.com/data/pricemulti'

export const getCurrentPrices = async (currencyesList) => {
  const fetchedPrices = await axios.get(REST_API_URL, {
    params: {
      fsyms: currencyesList.join(','),
      tsyms: 'USD',
      api_key: KEY,
    },
  })

  const pricesData = await fetchedPrices.data

  const prices = {}

  currencyesList.forEach((currency) => {
    if (pricesData[currency] && pricesData[currency].USD)
      prices[currency] = pricesData[currency].USD
  })

  return prices
}


