<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <balance-card />
    </div>

    <div class="dashboard__content">
      <div class="dashboard__left">
        <assets-card />
      </div>

      <div class="dashboard__right">
        <charts-card />
      </div>
    </div>
  </div>
</template>

<script>
import BalanceCard from "@/components/BalanceCard.vue";
import AssetsCard from "@/components/AssetsCard.vue";
import ChartsCard from "@/components/ChartsCard.vue";
export default {
  components: {
    BalanceCard,
    AssetsCard,
    ChartsCard
  },
};
</script>
