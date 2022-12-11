import { defineStore } from 'pinia'
import { getCurrentPrices } from '@/api/api'
import { calcAvgPrice } from '@/utils/utils'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => {
    return {
      assets: [],
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
      this.setLocalStorageAssets()
    },

    appendAsset(newAsset) {
      let asset = this.assets.find((item) => item.sym === newAsset.sym)

      if (!asset) {
        this.assets.push(newAsset)
      }

      if (asset) {
        asset.avgPrice = calcAvgPrice([
          [asset.ammount, asset.avgPrice],
          [newAsset.ammount, newAsset.avgPrice],
        ])

        console.log(asset.ammount, newAsset.ammount)
        asset.ammount += newAsset.ammount
      }

      this.fetchActualPrices()
      this.setLocalStorageAssets()
    },

    setLocalStorageAssets() {
      localStorage.setItem('assetsList', JSON.stringify(this.assets))
    },

    initStorageAssets() {
      this.assets = JSON.parse(localStorage.getItem('assetsList'))
      this.fetchActualPrices()
    },
  },
})
