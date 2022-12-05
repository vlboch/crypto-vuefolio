import { defineStore } from 'pinia'
import { getCurrentPrices } from '@/api/api'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => {
    return {
      assets: [
        {
          currencySym: 'REEF',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          currencySym: 'SHIB',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          currencySym: 'LUNC',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          currencySym: '1INCH',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          currencySym: 'TWT',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
      ],
    }
  },

  getters: {
    totalValue: (state) =>
      state.assets.reduce(
        (acc, curr) => acc + curr.ammount * curr.currentPrice,
        0
      ),
  },

  actions: {
    async fetchActualPrices() {
      const curSyms = this.assets.map((a) => a.currencySym)

      const fetchedPrices = await getCurrentPrices(curSyms)

      Object.keys(fetchedPrices).forEach((sym) => {
        this.assets.find((item) => {
          if (item.currencySym === sym) item.currentPrice = fetchedPrices[sym]
        })
      })
    },
  },
})
