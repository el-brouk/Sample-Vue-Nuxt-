<template>
  <vue-final-modal class="modal" :model-value="modalValue" @update:model-value="updateModalValue">
    <div class="modal__content">
      <slot />
    </div>
  </vue-final-modal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';

const modalValue = ref(false);

const updateModalValue = (value) => {
  modalValue.value = value;
};

const emit = defineEmits(['update:model-value']);
</script>
<style lang="scss">
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(6px);
  z-index: 1000;

  .vfm--overlay {
    background: rgba(0, 36, 69, 0.2);
  }
}
</style>
