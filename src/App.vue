<template>
  <div class="content">
    <dashboard />
  </div>
</template>
<script>
import Dashboard from '@/components/Dashboard.vue'
import { mapActions } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
import { getCoinlist } from './api/api'

export default {
  components: {
    Dashboard,
  },

  methods: {
    ...mapActions(usePortfolioStore, ['initStorageAssets']),
  },

  async mounted() {
    await getCoinlist()
    this.initStorageAssets()
  },
}
</script>

<style lang="scss">
@import '@/sass/main.scss';
</style>
