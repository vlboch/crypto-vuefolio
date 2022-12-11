<template>
  <popup-base :isOpened="isOpened" @outsideClick="closePopup">
    <template v-slot:header>
      <strong>Add new asset to your portfolio</strong>
    </template>

    <template v-slot:content>
      <div class="add-asset-form">
        <select-token-input v-model="selectedToken" />

        <div class="add-asset-form__wrapper">
          <div class="input-box">
            <label for="ammount" class="input-box__label">Quantity</label>
            <input
              v-model="ammountOfCoins"
              type="number"
              name="ammount"
              placeholder=""
              class="input-box__input" />
          </div>

          <div class="input-box">
            <label for="price" class="input-box__label">Price per coin</label>
            <input
              v-model="pricePerCoin"
              type="number"
              name="price"
              class="input-box__input" />
          </div>
        </div>

        <div class="input-box">
          <label for="spent" class="input-box__label">Total spent</label>
          <input
            readonly
            :value="totalSpent"
            type="text"
            name="spent"
            class="input-box__input input-box__input" />
        </div>
      </div>
    </template>

    <template v-slot:controls>
      <button
        class="btn btn__content_text btn__bg_purple"
        @click="addAssetClickHandler">
        Add
      </button>
      <button
        class="btn btn__content_text btn__bg_light-purple"
        @click="closePopup">
        Cancel
      </button>
    </template>
  </popup-base>
</template>

<script>
import PopupBase from '@/components/PopupBase.vue'
import SelectTokenInput from '@/components/SelectTokenInput.vue'
import { getCoinlist } from '@/api/api'
import { mapActions } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
export default {
  components: {
    PopupBase,
    SelectTokenInput,
  },
  props: {
    isOpened: Boolean,
  },
  emits: ['closePopup'],

  data() {
    return {
      selectedToken: 'ETH',
      ammountOfCoins: 0,
      pricePerCoin: 0,
    }
  },

  computed: {
    totalSpent() {
      return (this.ammountOfCoins * this.pricePerCoin).toFixed(2) + '$'
    },
  },

  methods: {
    ...mapActions(usePortfolioStore, ['appendAsset']),

    closePopup() {
      this.$emit('closePopup')
    },

    async addAssetClickHandler() {
      if (this.selectedToken.length === 0) return

      this.coinlist = await getCoinlist()

      let tokenObj = this.coinlist[this.selectedToken]

      if (!tokenObj) return

      this.appendAsset({
        sym: this.selectedToken,
        avgPrice: this.pricePerCoin,
        ammount: this.ammountOfCoins,
      })

      this.closePopup()
    },
  },
}
</script>
