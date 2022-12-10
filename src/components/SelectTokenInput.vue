<template>
  <div class="input-box">
    <label class="input-box__label" for="token">Select token</label>
    <input
      class="input-box__input"
      name="token"
      type="text"
      placeholder="Token"
      :value="modelValue"
      :class="{
        'input-box__input_pre-image': !!selectedPreImage,
      }"
      :style="{
        backgroundImage: `url(${selectedPreImage})`,
      }"
      @input="updateValue($event.target.value)"
      @focus="inputFocused"
      @blur="inputBlured" />

    <div v-if="isOptionsVisible" class="input-box__suggestion-list">
      <div
        v-for="item in suggestionsList"
        :key="item['Symbol']"
        class="input-box__suggestion-list-item suggestion-item"
        @click="selectItemHandler(item)">
        <div
          class="suggestion-item__img"
          :style="{
            backgroundImage: `url(${getCoinLogoImageUrl(item['ImageUrl'])})`,
          }"></div>
        <strong class="suggestion-item__title"> {{ item['Symbol'] }} </strong>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinlist, getCoinLogoImageUrl } from '@/api/api'
export default {
  props: {
    modelValue: {
      type: String,
    },
  },

  data() {
    return {
      isInputFocused: false,
      isOptionsVisible: false,
      isCoinListLoaded: false,
    }
  },

  computed: {
    suggestionsList() {
      if (!this.isCoinListLoaded || this.modelValue.length === 0) return

      return Object.keys(this.coinlist)
        .filter((key) =>
          key.toLowerCase().includes(this.modelValue.toLowerCase())
        )
        .sort((a) => a.length > this.modelValue.length)
        .slice(0, 4)
        .map((key) => this.coinlist[key])
    },

    selectedPreImage() {
      if (
        !this.isCoinListLoaded ||
        this.isInputFocused ||
        this.modelValue.length === 0 ||
        !this.coinlist[this.modelValue] ||
        !this.coinlist[this.modelValue].ImageUrl
      )
        return false

      return getCoinLogoImageUrl(this.coinlist[this.modelValue].ImageUrl)
    },
  },

  methods: {
    getCoinLogoImageUrl,

    inputFocused() {
      this.isInputFocused = true
      this.isOptionsVisible = true
    },

    inputBlured() {
      this.isInputFocused = false

      setTimeout(() => {
        this.isOptionsVisible = false
      }, 100)
    },

    updateValue(newValue) {
      this.$emit('update:modelValue', newValue)
    },

    selectItemHandler(item) {
      this.$emit('update:modelValue', item['Symbol'])
    },
  },

  async mounted() {
    this.coinlist = await getCoinlist()
    this.isCoinListLoaded = true
  },
}
</script>
