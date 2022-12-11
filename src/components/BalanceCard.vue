<template>
  <div class="dashboard__balance balance-card">
    <div class="balance-card__left">
      <div class="balance-card__title">
        Balance
        <button class="balance-card__hide-btn btn btn_content_icon">
          <i class="fa-solid fa-eye-slash"></i>
        </button>
      </div>
      <div class="balance-card__value">{{ totalValue.toFixed(2) }} $</div>
    </div>
    <div
      class="balance-card__profit"
      :class="{
        'balance-card__profit_success': totalProfitLoss > 0,
        'balance-card__profit_error': totalProfitLoss < 0,
      }">
      {{ totalProfitLoss.toFixed(2) }}$
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
export default {
  computed: {
    ...mapState(usePortfolioStore, ['totalValue', 'totalProfitLoss']),
  },
}
</script>
