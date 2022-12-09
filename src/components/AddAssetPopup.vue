<template>
  <popup-base :isOpened="isOpened" @outsideClick="closePopup">
    <template v-slot:header>
      <strong>Add new asset to your portfolio</strong>
    </template>

    <template v-slot:content>
      <div class="add-asset-form">
        <select-token-input />
      </div>
    </template>

    <template v-slot:controls>
      <button class="btn btn__content_text btn__bg_light-purple">Add</button>
      <button class="btn btn__content_text btn__bg_purple" @click="closePopup">
        Cancel
      </button>
    </template>
  </popup-base>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'
import PopupBase from '@/components/PopupBase.vue'
import SelectTokenInput from '@/components/SelectTokenInput.vue'
export default {
  components: {
    PopupBase,
    VueAutosuggest,
    SelectTokenInput
  },
  props: {
    isOpened: Boolean,
  },

  emits: ['closePopup'],

  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
  },
}
</script>
