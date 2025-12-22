<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate';
import type { SchemaItem } from '~/model/schema';
import type { SelectItem } from '~/model/form';

const props = withDefaults(
  defineProps<{
    schema?: SchemaItem;
    modelValue: (string | number)[];
    list: SelectItem[];
    type?: 'single' | 'multiple';
  }>(),
  {
    type: 'multiple',
    modelValue: () => [],
    list: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void;
}>();

const currentValue = computed(() => {
  return Array.isArray(props.modelValue) ? props.modelValue : [];
});

function isChecked(value: string | number | null): boolean {
  if (value === null || value === undefined) return false;
  return currentValue.value.includes(value);
}

function changeValue(value: string | number | null) {
  if (value === null || value === undefined) return;

  const values: (string | number)[] = [...currentValue.value];

  if (isChecked(value)) {
    // Remove value
    const index = values.indexOf(value);
    if (index > -1) {
      values.splice(index, 1);
    }
  } else {
    // Add value
    values.push(value);
  }

  // Remove duplicates
  const uniqueValues = [...new Set(values)];
  emit('update:modelValue', uniqueValues);
}
</script>

<template>
  <div class="base-checkbox-group">
    <label class="base-checkbox-group__label" v-if="schema && schema.name">
      {{ schema.name }}
    </label>

    <Field v-if="schema" :name="schema.name!" :modelValue="modelValue" v-slot="{ field, errors }">
      <ul class="base-checkbox-group__list">
        <li class="base-checkbox-group__item" v-for="item in list" :key="item.value">
          <label class="base-checkbox-group__item-label">
            <input
              type="checkbox"
              :checked="isChecked(item.value)"
              @change="changeValue(item.value)"
              :name="schema.name"
              class="base-checkbox-group__control visually-hidden"
              :class="{ error: errors && errors.length }"
            />
            <span class="base-checkbox-group__text">
              <slot name="item" :item="item">
                {{ item.title }}
              </slot>
            </span>
          </label>
        </li>
      </ul>
    </Field>

    <template v-else>
      <ul class="base-checkbox-group__list">
        <li class="base-checkbox-group__item" v-for="item in list" :key="item.value">
          <label class="base-checkbox-group__item-label">
            <input
              type="checkbox"
              :checked="isChecked(item.value)"
              @change="changeValue(item.value)"
              class="base-checkbox-group__control visually-hidden"
            />
            <span class="base-checkbox-group__text">
              <slot name="item" :item="item">
                {{ item.title }}
              </slot>
            </span>
          </label>
        </li>
      </ul>
    </template>

    <ErrorMessage
      v-if="schema"
      class="base-checkbox-group__error"
      :name="schema.name!"
      v-slot="{ message }"
    >
      <span>{{ message }}</span>
    </ErrorMessage>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

.base-checkbox-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.base-checkbox-group__label {
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: rgba(173, 173, 184, 1);

  @include tablet {
    margin-bottom: 10px;
    font-size: 14px;
  }
}

.base-checkbox-group__list {
  @include list-reset;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.base-checkbox-group__item {
  display: block;
}

.base-checkbox-group__item-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.base-checkbox-group__control {
  &:checked + .base-checkbox-group__text::before {
    background-image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="3" fill="%230359A8"/><rect x="1" y="1" width="22" height="22" rx="3" stroke="%230359A8" stroke-width="2"/><path d="M5.33301 12L10.333 17L18.6663 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  }

  &.error + .base-checkbox-group__text::before {
    border-color: red;
  }
}

.base-checkbox-group__text {
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  transition: $base-transition;
  width: 100%;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-right: 12px;
    background-image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="3" stroke="%230359A8" stroke-width="2"/></svg>');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: $base-transition;
  }

  :deep(a) {
    font-weight: 500;
    transition: $base-transition;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    @include hover {
      color: $gold;
    }
  }
}

.base-checkbox-group__error {
  display: block;
  text-align: left;
  color: red;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.4px;
  margin-top: 8px;

  @include tablet {
    font-size: 12px;
  }
}
</style>
