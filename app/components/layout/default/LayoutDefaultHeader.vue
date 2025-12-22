<script lang="ts" setup></script>

<template>
  <header class="header">
    <div class="base-container">
      <div class="header__inner">шапка</div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

.header {
  padding: 16px 0 20px;
  background-color: $dark-blue;
  color: $white;

  @include tablet {
    padding: 16px 0;
  }
}
</style>
