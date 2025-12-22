<script setup lang="ts">
import type { SchemaItem } from '~/model/schema';
import type { SelectItem } from '~/model/form';

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
  },
  schema: {
    type: Object as PropType<SchemaItem>,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  list: {
    type: Array as PropType<SelectItem[]>,
    required: true,
  },
  search: {
    type: Boolean,
    required: false,
  },
  full: {
    type: Boolean,
    required: false,
  },
});

const modelValue = computed<string[]>(() => props.modelValue);
const emit = defineEmits(['update:model-value']);

function changeValue(value: string | number | boolean | null) {
  const values = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
  value = value || typeof value === 'boolean' ? value.toString() : '';

  if (!isChecked(value, values)) {
    values.push(value);
  } else {
    const index = values.indexOf(value);
    if (index > -1) {
      values.splice(index, 1);
    }
  }

  const uniqueValues = [...new Set(values)];
  emit('update:model-value', uniqueValues);
}

function isChecked(value: string | number | boolean | null, list: any[]) {
  return (
    (value || typeof value === 'boolean') && Array.isArray(list) && list.includes(value.toString())
  );
}
</script>

<template>
  <div class="filter-checkbox-group">
    <BaseCollapse :name="name" defaultOpen>
      <ul class="filter-checkbox-group__list">
        <li class="filter-checkbox-group__item" v-for="item in list">
          <label class="filter-checkbox-group__item-label">
            <input
              :checked="isChecked(item.value, modelValue)"
              @change="changeValue(item.value)"
              :placeholder="schema.placeholder"
              :name="schema.name"
              type="checkbox"
            />
            <span class="filter-checkbox-group__item-text"></span>
            <span class="filter-checkbox-group__item-option">{{ item.title }}</span>
          </label>
        </li>
      </ul>
    </BaseCollapse>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;
</style>
