<template>
  <div class="assets-card card">
    <div class="assets-card__list">
      <div
        v-for="item in computedAssets"
        :key="item.sym"
        class="assets-card__list-item coin-list-item">
        <div class="coin-list-item__left">
          <div
            class="coin-list-item__logo"
            :style="{ backgroundImage: getCoinImage(item.sym) }"></div>
          <div class="coin-list-item__details">
            <div class="coin-list-item__label">{{ item.sym }}</div>
            <div class="coin-list-item__price">
              {{ item.currentPrice || '--' }} $
            </div>
          </div>
        </div>

        <div class="coin-list-item__right">
          <div>
            <div class="coin-list-item__ammount">{{ item.ammount }}</div>
            <div class="coin-list-item__usd">
              ~
              {{
                item.currentPrice
                  ? (item.currentPrice * item.ammount).toFixed(2)
                  : 'N/A'
              }}$
            </div>
          </div>

          <div class="coin-list-item__buttons">
            <button
              class="btn btn__content_text btn__bg_light-purple coin-list-item__button">
              <i class="fa-solid fa-plus"></i>
              Add
            </button>
            <button
              class="btn btn__content_text btn__bg_purple coin-list-item__button"
              @click="removeAsset(item.sym)">
              <i class="fa-solid fa-trash"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <add-asset-popup
    :isOpened="isAddAssetModal"
    @closePopup="isAddAssetModal = false" />
  <add-asset-btn @click="addAssetBtnHandler" />
</template>

<script>
import AddAssetBtn from '@/components/AddAssetBtn.vue'
import AddAssetPopup from '@/components/AddAssetPopup.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { mapState, mapActions, mapGetters } from 'pinia'
import { getCoinlist } from '@/api/api'

export default {
  components: {
    AddAssetBtn,
    AddAssetPopup,
  },

  data() {
    return {
      isAddAssetModal: false,
    }
  },

  computed: {
    ...mapGetters(usePortfolioStore, ['computedAssets']),
  },

  methods: {
    ...mapActions(usePortfolioStore, [
      'fetchActualPrices',
      'removeAsset',
      'appendAsset',
    ]),

    getCoinImage(sym) {
      if (!this.coinlist) return null

      const coin = this.coinlist[sym]

      if (!coin) return null

      return `url(https://www.cryptocompare.com${coin.ImageUrl})`
    },

    addAssetBtnHandler() {
      this.isAddAssetModal = true
    },
  },

  async mounted() {
    this.coinlist = await getCoinlist()
    this.fetchActualPrices()
  },
}
</script>
