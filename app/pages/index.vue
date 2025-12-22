<script lang="ts" setup>
import useMainStore from '~/store/main';
definePageMeta({
  auth: false,
});

const mainStore = useMainStore();
</script>

<template>
  <main class="main-page">
    <div class="base-container">главная страница</div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.main-page {
  overflow: hidden;
  flex-grow: 1;
}
</style>
