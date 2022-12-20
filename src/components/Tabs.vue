<template>
  <div class="add-asset-form__tabs tabs">
    <div class="tabs__wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ tabs__wrapper__tab_active: modelValue === tab.value }"
        class="tabs__wrapper__tab"
        @click="clickTabHandler(tab.value)">
        <slot :tab="tab">{{ tab.text }}</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Object.Array,
      default: [],
    },
    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      activeTab: null,
    }
  },

  methods: {
    clickTabHandler(value) {
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
