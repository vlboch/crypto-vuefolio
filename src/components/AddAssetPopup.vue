<template>
  <popup-base :isOpened="isOpened" @outsideClick="closePopup">
    <template v-slot:header>
      <strong>Add new asset to your portfolio</strong>
    </template>

    <template v-slot:content>
      <div class="add-asset-form">
        <select-token-input />

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
      <button class="btn btn__content_text btn__bg_purple">Add</button>
      <button
        class="btn btn__content_text btn__bg_light-purple"
        @click="closePopup">
        Cancel
      </button>
    </template>
  </popup-base>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import PopupBase from '@/components/PopupBase.vue'
import SelectTokenInput from '@/components/SelectTokenInput.vue'
export default {
  components: {
    PopupBase,
    VueAutosuggest,
    SelectTokenInput,
  },
  props: {
    isOpened: Boolean,
  },
  emits: ['closePopup'],

  data() {
    return {
      ammountOfCoins: 0,
      pricePerCoin: 0,
      selectedToken: null,
    }
  },

  computed: {
    totalSpent() {
      return (this.ammountOfCoins * this.pricePerCoin).toFixed(2) + '$'
    },
  },

  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
  },
}
</script>
