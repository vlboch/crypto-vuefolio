<template>
  <div class="assets-card card">
    <div class="assets-card__list">
      <div
        v-for="item in assets"
        :key="item.currencySym"
        class="assets-card__list-item coin-list-item">
        <div class="coin-list-item__left">
          <div class="coin-list-item__logo"></div>
          <div class="coin-list-item__details">
            <div class="coin-list-item__label">{{ item.currencySym }}</div>
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
                item.currentPrice ? (item.currentPrice * item.ammount).toFixed(2) : 'N/A'
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
              class="btn btn__content_text btn__bg_purple coin-list-item__button">
              <i class="fa-solid fa-trash"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <add-asset-btn />
</template>

<script>
import AddAssetBtn from '@/components/AddAssetBtn.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    AddAssetBtn,
  },

  computed: {
    ...mapState(usePortfolioStore, ['assets']),
  },

  methods: {
    ...mapActions(usePortfolioStore, ['fetchActualPrices']),
  },

  mounted() {
    this.fetchActualPrices()
  },
}
</script>
