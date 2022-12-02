<template>
  <div class="dashboard__balance balance-card">
    <div class="balance-card__title">
      Balance
      <button class="balance-card__hide-btn btn btn_content_icon">
        <i class="fa-solid fa-eye-slash"></i>
      </button>
    </div>
    <div class="balance-card__value">250,34 USD</div>
  </div>
</template>

<script>
export default {
  props: {
    balanceValue: Number,
  },
};
</script>
