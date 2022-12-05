import axios from 'axios'

const KEY = import.meta.env.VITE_API_KEY
axios.defaults.baseURL = 'https://min-api.cryptocompare.com/data'

export const getCurrentPrices = async (currencyesList) => {
  const fetchedPrices = await axios.get('/pricemulti', {
    params: {
      fsyms: currencyesList.join(','),
      tsyms: 'USD',
      api_key: KEY,
    },
  })

  const pricesData = fetchedPrices.data
  const prices = {}

  currencyesList.forEach((currency) => {
    if (pricesData[currency] && pricesData[currency].USD)
      prices[currency] = pricesData[currency].USD
  })

  return prices
}

export const getCoinlist = async () => {
  const coinlist = await axios.get('/all/coinlist')

  return coinlist.data.Data
}
