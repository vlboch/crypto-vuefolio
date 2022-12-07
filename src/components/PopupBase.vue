<template>
  <div v-if="isOpened" class="popup">
    <div class="popup__backdrop" @click="outsideClickHandler"></div>

    <div class="popup__content">
      <div class="popup__card popup-modal card">
        <div class="popup-modal__content">
          <div class="popup-modal__header">
            <slot name="header"></slot>
          </div>

          <div class="popup-modal__main-content">
            <slot name="content"></slot>
          </div>

          <div class="popup-modal__controls">
            <slot name="controls"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['outsideClick'],
  props: {
    isOpened: Boolean,
  },

  methods: {
    outsideClickHandler() {
      this.$emit('outsideClick')
    },
  },
}
</script>
