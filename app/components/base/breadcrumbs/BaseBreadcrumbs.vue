<template>
  <div class="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">
    <ul class="breadcrumbs__list">
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="http://schema.org/ListItem"
        class="breadcrumbs__list-item"
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
      >
        <nuxt-link v-if="breadcrumb.path" :to="breadcrumb.path" itemprop="item">
          <span itemprop="name">{{ breadcrumb.name }}</span>
          <meta itemprop="position" :content="(index + 1).toString()" />
        </nuxt-link>

        <span v-else itemprop="name">{{ breadcrumb.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '~/store/app'

let appStore = useAppStore()
const breadcrumbs = computed(() => appStore.breadcrumbs)
</script>

<style lang="scss" scoped>
@use "@/assets/scss/helpers/_variables" as *;
@use "@/assets/scss/helpers/_mixins" as *;

.breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 40px;

  @include tablet {
    margin-bottom: 24px;
  }

  @include phone {
    margin-bottom: 16px;
  }
}

.breadcrumbs__list-item {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  white-space: nowrap;
  transition: $base-transition;

  @include hover {
    color: $accent;
  }

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    margin: 0 12px;
    background-image: url("/assets/icons/chevron-right.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &:first-of-type {
    &:before {
      display: none;
    }
  }

  &:last-of-type {
    color: $accent;
  }
}
</style>
