<script lang="ts" setup>
import type { Pagination } from '~/model/pagination';

const emit = defineEmits(['input']);

const props = defineProps<{
  pagination: Pagination;
}>();

function click(page: number) {
  props.pagination.page = page;
  emit('input', props.pagination);
}
</script>

<template>
  <vue-awesome-paginate
    v-if="pagination && pagination.countPages > 1"
    :total-items="pagination.countPages"
    :items-per-page="1"
    :max-pages-shown="10"
    v-model="pagination.page"
    @click="click"
  />
</template>

<style lang="scss">
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  @include button-reset;
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
  background: $main-gradient;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
