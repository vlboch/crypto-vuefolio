<template>
  <div class="assets-card card">
    <div class="assets-card__list">
      <div v-for="i in 5" class="assets-card__list-item coin-list-item">
        <div class="coin-list-item__left">
          <div class="coin-list-item__logo"></div>
          <div class="coin-list-item__label">TWT</div>
        </div>

        <div class="coin-list-item__right">
          <div class="coin-list-item__ammount">234</div>
          <div class="coin-list-item__usd">~483$</div>
        </div>
      </div>
    </div>
  </div>

  <add-asset-btn />
</template>

<script>
import AddAssetBtn from "@/components/AddAssetBtn.vue"
export default {
    components: {
        AddAssetBtn
    }
};
</script>


