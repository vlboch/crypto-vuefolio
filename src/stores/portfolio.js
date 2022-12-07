import { defineStore } from 'pinia'
import { getCurrentPrices } from '@/api/api'
import { calcAvgPrice } from '@/utils/utils'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => {
    return {
      assets: [
        {
          sym: 'REEF',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          sym: 'SHIB',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          sym: 'LUNC',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          sym: '1INCH',
          ammount: 3000,
          avgPrice: 0.6,
          currentPrice: 0,
        },
        {
          sym: 'TWT',
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

    computedAssets: (state) =>
      state.assets.map((a) => {
        return {
          ...a,
          value: a.currentPrice * a.ammount,
          proffitLoss: (a.currentPrice - a.avgPrice) * a.ammount,
        }
      }),

    totalProfitLoss() {
      return this.computedAssets.reduce(
        (acc, curr) => acc + curr.proffitLoss,
        0
      )
    },
  },

  actions: {
    async fetchActualPrices() {
      const curSyms = this.assets.map((a) => a.sym)

      const fetchedPrices = await getCurrentPrices(curSyms)

      Object.keys(fetchedPrices).forEach((sym) => {
        this.assets.find((item) => {
          if (item.sym === sym) item.currentPrice = fetchedPrices[sym]
        })
      })
    },

    removeAsset(sym) {
      this.assets = this.assets.filter((c) => c.sym !== sym)
    },

    appendAsset(newAsset) {
      let asset = this.assets.find((item) => item.sym === newAsset.sym)

      if (!asset) {
        this.assets.push(newAsset)
        return this.fetchActualPrices()
      }

      asset.avgPrice = calcAvgPrice([
        [asset.ammount, asset.avgPrice],
        [newAsset.ammount, newAsset.avgPrice],
      ])

      asset.ammount += newAsset.ammount
    },
  },
})

