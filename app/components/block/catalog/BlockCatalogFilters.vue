<script setup lang="ts">
import type { FilterItem, SelectedFilter } from '~/model/filter';
import type { SelectItem } from '~/model/form';

const { t } = useI18n();
const props = defineProps<{
  filters: FilterItem[];
  initialFilters?: SelectedFilter;
}>();

const emit = defineEmits(['close', 'updateCatalog']);

const urlFilters = useUrlFilters();

const catalogFilter = ref({
  filter: {} as SelectedFilter,
});

const prevCatalogFilter = ref({
  filter: {} as SelectedFilter,
});

const isSalaryValid = computed(() => {
  return true;
  //   const from = catalogFilter.value?.filter?.SALARY_FROM as
  //     | { min?: number; max?: number }
  //     | undefined;
  //   const to = catalogFilter.value?.filter?.SALARY_TO as { min?: number; max?: number } | undefined;

  //   if (!from?.min || !to?.max) return true;
  //   return from.min <= to.max;
});

const query = computed(() => ({
  page: 1,
  filter: { ...catalogFilter.value.filter },
}));

const applyFiltersIsVisible = computed(
  () =>
    JSON.stringify(catalogFilter.value.filter) !== JSON.stringify(prevCatalogFilter.value.filter) &&
    !!Object.keys(catalogFilter.value.filter).length &&
    isSalaryValid.value
);

const resetFiltersIsVisible = computed(() => !!Object.keys(catalogFilter.value.filter).length);

function closeFilters() {
  emit('close');
}

function resetFilters() {
  catalogFilter.value.filter = {};
  urlFilters.clearFiltersFromUrl();

  closeFilters();
  updateProducts();
}

function applyFilters() {
  console.log('apply filters', catalogFilter.value.filter);
  urlFilters.applyFiltersToUrl(catalogFilter.value.filter);
  closeFilters();
  updateProducts();
  prevCatalogFilter.value = JSON.parse(JSON.stringify(catalogFilter.value));
}

async function updateProducts() {
  emit('updateCatalog', query.value);
}

// Helper function to get filter item by code
function getFilterByCode(code: string): FilterItem | undefined {
  return props.filters.find((f) => f.code === code);
}

// Base function to normalize filter value to string array
function normalizeFilterValueToArray(filterCode: string): string[] {
  const value = catalogFilter.value.filter[filterCode];

  // If value is already an array, convert to string array
  if (Array.isArray(value)) {
    return value.map((v) => String(v));
  }

  // If value is undefined, null, or object (range filters), return empty array
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && !Array.isArray(value))
  ) {
    return [];
  }

  // If it's a single string or number, convert to array
  return [String(value)];
}

// Base function to set filter value from string array
function setFilterValueFromArray(filterCode: string, valueArray: string[]) {
  if (valueArray.length === 0) {
    delete catalogFilter.value.filter[filterCode];
  } else {
    console.log('setFilterValueFromArray', valueArray);
    catalogFilter.value.filter[filterCode] = valueArray;
  }
}

// Helper function to set filter value
function setFilterValue(filterCode: string, value: (string | number)[]) {
  setFilterValueFromArray(
    filterCode,
    value.map((v) => String(v))
  );
}

// Helper function to set dropdown filter value
function setDropdownFilterValue(filterCode: string, value: string | string[] | null) {
  const stringArray = value === null ? [] : Array.isArray(value) ? value : [value];
  setFilterValueFromArray(filterCode, stringArray);
}

// Helper function to get dropdown filter options as SelectItem[]
function getDropdownFilterOptions(filterCode: string): SelectItem[] {
  const filter = getFilterByCode(filterCode);
  if (!filter) return [];

  return filter.values.map((item) => ({
    value: item.urlId,
    title: item.value,
    count: item.count,
  }));
}

// Helper function to get range filter value
function getRangeFilterValue(filterCode: string, filter: FilterItem): [number, number] {
  const val = catalogFilter.value.filter[filterCode];
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    const obj = val as { min?: number; max?: number };
    return [obj.min ?? filter.min ?? 0, obj.max ?? filter.max ?? 0] as [number, number];
  }
  return [filter.min || 0, filter.max || 0] as [number, number];
}

// Helper function to set range filter value
function setRangeFilterValue(filterCode: string, value: [number, number]) {
  catalogFilter.value.filter[filterCode] = { min: value[0], max: value[1] };
}

// Initialize filters on page load
function initializeFiltersFromRoute() {
  if (props.initialFilters) {
    catalogFilter.value.filter = props.initialFilters;
  }
}

initializeFiltersFromRoute();
</script>
<template>
  <div class="catalog-filters">
    <div class="catalog-filters__top">
      <p class="catalog-filters__title">{{ t('catalog.filters') }}</p>
      <button class="catalog-filters__close visible-tablet" type="button" @click="closeFilters">
        <BaseIcon icon="close" />
      </button>
    </div>

    <ul class="catalog-filters__list">
      <li class="catalog-filters__item" v-for="filter in filters" :key="filter.code">
        <BaseFormSelect
          v-if="filter.displayType === 'P'"
          :model-value="normalizeFilterValueToArray(filter.code)"
          @update:model-value="setDropdownFilterValue(filter.code, $event)"
          :list="getDropdownFilterOptions(filter.code)"
          :schema="{ name: filter.code, placeholder: filter.hint || 'Выбрать', label: filter.name }"
          :multiple="false"
          class="catalog-form__group"
        />

        <BaseFormCheckboxGroup
          v-if="filter.displayType === 'F'"
          :model-value="normalizeFilterValueToArray(filter.code)"
          @update:model-value="setFilterValue(filter.code, $event)"
          :list="
            filter.values.map((item) => ({
              value: item.urlId,
              title: item.value,
            }))
          "
          type="multiple"
          :schema="{ name: filter.name, placeholder: 'Выбрать' }"
          class="catalog-form__group"
        >
          <template #item="{ item }">
            {{ item.title }}
          </template>
        </BaseFormCheckboxGroup>

        <BaseFilterRange
          v-if="filter.displayType === 'R'"
          :model-value="getRangeFilterValue(filter.code, filter)"
          @update:model-value="setRangeFilterValue(filter.code, $event)"
          :list="{ min: filter.min, max: filter.max }"
        />
      </li>
    </ul>
    <div class="catalog-form__controls">
      <p class="catalog-filters__error" v-if="!isSalaryValid">
        {{ t('catalog.priceRangeError') }}
      </p>
      <BaseButton :disabled="!applyFiltersIsVisible" small is-full @click="applyFilters">{{
        t('catalog.apply')
      }}</BaseButton>
      <BaseButton
        :disabled="!resetFiltersIsVisible"
        secondary
        small
        is-full
        @click="resetFilters"
        >{{ t('catalog.reset') }}</BaseButton
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.catalog-filters {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  background: rgba(39, 37, 35, 0.04);
  border-radius: 6px;
  gap: 16px;
  align-items: flex-start;
}

.catalog-filters__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.catalog-filters__title {
  font-size: 24px;
  font-weight: 500;
  line-height: 120%;

  @include tablet {
    font-size: 20px;
  }
}

.catalog-filters__close {
  @include button-reset;
}

.catalog-filters__list {
  @include list-reset;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  @include tablet-sm {
    padding-bottom: 90px;
  }
}

.catalog-form__controls {
  width: 100%;
  display: flex;
  gap: 24px;
  overflow: hidden;

  @include tablet-sm {
    background-color: $white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    width: 100%;
    padding: 16px;
  }
}

.catalog-form__range-input {
  :deep(.base-input-currency__control) {
    padding-block: 10px 8px;
    min-block-size: 0;
  }
}

.catalog-filters__error {
  color: red;
  padding-block: 8px;
  background-color: $white;
}
</style>
