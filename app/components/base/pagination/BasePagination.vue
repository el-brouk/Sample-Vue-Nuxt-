<script lang="ts" setup>
import type { Pagination } from '~/model/pagination';
// Props
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
const modelValue = ref(props.modelValue);

const updatePage = (page: number) => {
  props.modelValue.page = page;
  emit('update:model-value', props.modelValue);
};
</script>

<template>
  <vue-awesome-paginate
    v-if="modelValue && modelValue.countPages > 1"
    :total-items="modelValue.countPages"
    :items-per-page="1"
    :max-pages-shown="10"
    v-model="modelValue.page"
    @update:modelValue="updatePage"
  />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
