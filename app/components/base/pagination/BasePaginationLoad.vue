<script lang="ts" setup>
import type { Pagination } from '~/model/pagination';

const props = withDefaults(
  defineProps<{
    modelValue: Pagination;
  }>(),
  {
    modelValue: () => {
      return {
        page: 0,
        count: 0,
        countPages: 0,
        countElements: 0,
      };
    },
  }
);

// Emitter
const emit = defineEmits(['update:model-value']);

const updatePage = (page: number) => {
  props.modelValue.page = page;
  emit('update:model-value', props.modelValue);
};
</script>

<template>
  <div class="pagination" v-if="modelValue && modelValue.page < modelValue.countPages">
    <div class="pagination__btn">
      <div class="pagination__link" @click="updatePage(modelValue.page + 1)">
        <base-icon icon="arrow-down"></base-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  cursor: pointer;
}

.pagination__link {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 14px 39px;
  background: $dark-green;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid transparent;
  text-align: center;
  font-family: $alethianext-font-family;
  font-size: 24px;
  font-weight: 350;
  line-height: 35.04px;
  transition: $base-transition;
  color: $white;

  @include phone {
    padding: 9px 19px;
    font-size: 16px;
    line-height: 23.36px;
  }

  @media (hover: hover) {
    &:hover {
      background: $beige;
      color: $dark;
    }
  }

  &:active {
    background: $beige;
    color: $dark;
  }

  ::v-deep(svg) {
    display: block;
    width: 42px;
    height: 23px;

    @include phone {
      width: 20px;
      height: 11px;
    }
  }
}
</style>
