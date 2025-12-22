<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <footer class="footer">
    <div class="base-container">футер</div>
  </footer>
  <!-- TODO: пока нет этого -->
  <!-- <base-cookie /> -->
  <ModalsContainer />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

.footer {
  padding: 64px 0 40px;
  background-color: #1a1a1a;
  color: $white;

  @include tablet {
    padding: 48px 0 40px;
  }
}

.footer__inner {
  display: flex;
  flex-direction: column;
}
</style>
