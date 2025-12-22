<script setup lang="ts">
interface BaseIconProps {
  icon: string;
  noFill?: boolean; 
}
const props = withDefaults(defineProps<BaseIconProps>(), {
  noFill: false
})
</script>

<template>
  <nuxt-icon
      :key="icon + '-' + noFill"
      class="nuxt-icon nuxt-icon-current"
      :filled="noFill"
      :name="icon"
  />
</template>

<style lang="scss">
@use "@/assets/scss/helpers/_variables" as *;
@use "@/assets/scss/helpers/_mixins" as *;

.nuxt-icon.nuxt-icon-current {
  display: block;
  width: 24px;
  height: 24px;

  svg {
    @include size(100%);
    margin-bottom: 0;
  }
}
</style>ы