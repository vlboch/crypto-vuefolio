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

  data() {
    return {
      test: 'a',
    }
  },

  methods: {
    ...mapActions(usePortfolioStore, ['initStorageAssets']),
  },

  computed: {
    someValue() {
      return this.test
    },
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
