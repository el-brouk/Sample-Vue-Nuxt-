<script lang="ts" setup>
import type { Tab } from '~/model/tabs';

const props = defineProps<{
  list: Tab[];
  activeItem?: Tab;
}>();

const emit = defineEmits(['setActive']);

function setActive(item: Tab) {
  emit('setActive', item);
}
</script>

<template>
  <div class="base-tabs">
    <div class="base-tabs__wrap">
      <button
        :class="['base-tabs__btn', { 'base-tabs__btn--active': activeItem?.id === item.id }]"
        type="button"
        v-for="item in list"
        :key="item.id"
        @click="setActive(item)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

.base-tabs {
  display: flex;
  justify-content: flex-start;

  @include phone {
    width: 100%;
    overflow: hidden;
  }
}

.base-tabs__wrap {
  display: flex;
  padding: 4px;
  background: #f0f0f0;
  border-radius: 4px;
  flex-wrap: wrap;
  row-gap: 16px;
  width: fit-content;
  max-width: 100%;

  @include tablet {
    flex-wrap: nowrap;
    overflow-x: auto;
    @include no-scrollbar;
  }

  @include phone {
    width: 100%;
    margin-right: 16px;
  }
}

.base-tabs__btn {
  @include button-reset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  gap: 8px;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  color: #888888;
  transition: $base-transition;
  flex-shrink: 0;

  @include tablet {
    padding: 8px 16px;
    font-size: 12px;
  }

  @include phone {
    flex-grow: 1;
  }

  @include hover {
    color: $brand-color;
  }

  &--active {
    background: $white;
    color: $brand-color;
  }
}
</style>
