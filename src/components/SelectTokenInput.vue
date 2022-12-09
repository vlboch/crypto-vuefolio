<template>
  <div class="input-box">
    <label for="token" class="input-box__label">Select token</label>
    <input
      name="token"
      type="text"
      placeholder="Token"
      class="input-box__input"
      v-model="selectedItemName"
      :class="{
        'input-box__input_pre-image': selectedItemImage,
      }"
      :style="{
        backgroundImage: `url(${selectedItemImage})`,
      }"
      @input="valueChanged"
      @focus="inputFocused"
      @blur="inputBlured" />

    <div v-if="isOptionsVisible" class="input-box__suggestion-list">
      <div
        v-for="item in suggestionsList"
        :key="item.Id"
        class="input-box__suggestion-list-item suggestion-item"
        @click="selectItemHandler(item)">
        <img
          class="suggestion-item__img"
          :src="`https://www.cryptocompare.com/${item['ImageUrl']}`" />
        <strong class="suggestion-item__title"> {{ item['Symbol'] }} </strong>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinlist } from '@/api/api'
export default {
  data() {
    return {
      isInputFocused: false,
      isOptionsVisible: false,
      selectedItemName: 'BTC',
      selectedItemImage: 'https://www.cryptocompare.com/media/37746251/btc.png',
    }
  },

  computed: {
    suggestionsList() {
      if (!this.coinlist || this.selectedItemName.length === 0) return

      return Object.keys(this.coinlist)
        .filter((key) =>
          key.toLowerCase().includes(this.selectedItemName.toLowerCase())
        )
        .sort((a, b) => a.length > this.selectedItemName.length)
        .slice(0, 4)
        .map((key) => this.coinlist[key])
    },
  },

  methods: {
    inputFocused() {
      this.isInputFocused = true
      this.isOptionsVisible = true

      this.selectedItemName = ''
      this.selectedItemImage = null
    },

    inputBlured() {
      this.isInputFocused = false

      setTimeout(() => {
        this.isOptionsVisible = false
      }, 100)
    },

    valueChanged(e) {},

    selectItemHandler(item) {
      this.selectedItemName = item['Symbol']
      this.selectedItemImage =
        'https://www.cryptocompare.com' + item['ImageUrl']
    },
  },

  async mounted() {
    this.coinlist = await getCoinlist()
  },
}
</script>
