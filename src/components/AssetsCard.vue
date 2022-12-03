<template>
  <div class="assets-card card">
    <div class="assets-card__list">
      <div
        v-for="i in 5"
        :key="i"
        class="assets-card__list-item coin-list-item"
      >
        <div class="coin-list-item__left">
          <div class="coin-list-item__logo"></div>
          <div class="coin-list-item__details">
            <div class="coin-list-item__label">TWT</div>
            <div class="coin-list-item__price">$2,46</div>
          </div>
        </div>

        <div class="coin-list-item__right">
          <div>
            <div class="coin-list-item__ammount">234</div>
            <div class="coin-list-item__usd">~483$</div>
          </div>

          <div class="coin-list-item__buttons">
            <button
              class="btn btn__content_text btn__bg_light-purple coin-list-item__button"
            >
              <i class="fa-solid fa-plus"></i>
              Add
            </button>
            <button
              class="btn btn__content_text btn__bg_purple coin-list-item__button"
            >
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
import AddAssetBtn from "@/components/AddAssetBtn.vue";
export default {
  components: {
    AddAssetBtn,
  },

  data() {
    return {
      tokenList: [
        {
          name: "TWT",
          ammount: 100,
        }
      ]
    }
  }
};
</script>
