<template>
  <popup-base :isOpened="isOpened" @outsideClick="closePopup">
    <template v-slot:header>
      <strong>Add new asset to your portfolio</strong>
    </template>

    <template v-slot:content>
      <div class="add-asset-form">

        <vue-autosuggest
          :suggestions="[
            {
              data: [
                'Frodo',
                'Samwise',
                'Gandalf',
                'Galadriel',
                'Faramir',
                'Éowyn',
              ],
            },
          ]"
          :input-props="{
            id: 'autosuggest__input',
            placeholder: 'Do you feel lucky, punk?',
          }"
          @input="onInputChange"
          @selected="selectHandler"
          @click="clickHandler">
        </vue-autosuggest>

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
export default {
  components: {
    PopupBase,
    VueAutosuggest,
  },
  props: {
    isOpened: Boolean,
  },

  data() {
    return {
      coins: ['hi', 'lol', 'loh'],
    }
  },

  emits: ['closePopup'],

  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
  },
}
</script>
