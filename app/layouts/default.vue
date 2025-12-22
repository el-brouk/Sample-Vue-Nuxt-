<template>
  <div>
    <div class="page-wrapper">
      <LayoutDefaultHeader />
      <main class="page-main">
        <slot />
      </main>
      <LayoutDefaultFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from '~/store/app'
let appStore = useAppStore()
</script>
