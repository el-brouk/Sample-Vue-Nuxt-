<template>
  <div class="base-range">
    <div class="base-range__inputs">
      <div class="base-range__input-wrapper">
        <input
          class="base-range__input"
          id="base-range__input-min"
          :value="displayedMin"
          @focus="onFocus('min')"
          @blur="onBlur('min')"
          @input="onInput($event, 'min')"
          type="text"
          inputmode="numeric"
        />
      </div>
      <div class="base-range__input-wrapper">
        <input
          class="base-range__input"
          id="base-range__input-max"
          :value="displayedMax"
          @focus="onFocus('max')"
          @blur="onBlur('max')"
          @input="onInput($event, 'max')"
          type="text"
          inputmode="numeric"
        />
      </div>
    </div>

    <Slider
      class="base-range__slider"
      :min="list.min"
      :max="list.max"
      :tooltips="false"
      :model-value="value"
      @slide="updateLocalValue"
      @drag="updateLocalValue"
      @change="emitValue"
    />
  </div>
</template>

<script lang="ts" setup>
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';
import type { FilterItemRangeValue } from '~/model/filter';

const emit = defineEmits<{
  (e: 'update:modelValue', value: [number, number]): void;
  (e: 'change', value: [number, number]): void;
}>();

const props = defineProps<{
  modelValue: [number, number];
  list: FilterItemRangeValue;
}>();

const value = ref<[number, number]>([props.list.min, props.list.max]);

watch(
  () => props.modelValue,
  (newVal) => {
    if (Array.isArray(newVal) && (newVal[0] !== value.value[0] || newVal[1] !== value.value[1])) {
      value.value = [...newVal];
    }
  },
  { immediate: true, deep: true }
);

watch(
  value,
  (val) => {
    if (!props.modelValue || val[0] !== props.modelValue[0] || val[1] !== props.modelValue[1]) {
      emit('update:modelValue', [...val]);
    }
  },
  { deep: true }
);

const focused = ref<'min' | 'max' | null>(null);
const tempInputValue = ref<{ min?: string; max?: string }>({});

function formatCurrency(n: number, prefix: string) {
  return `${prefix} ${n.toLocaleString('ru-RU')} ₽`;
}

const displayedMin = computed(() => {
  if (focused.value === 'min') {
    return tempInputValue.value.min !== undefined
      ? tempInputValue.value.min
      : value.value[0].toString();
  }
  return formatCurrency(value.value[0], 'От');
});

const displayedMax = computed(() => {
  if (focused.value === 'max') {
    return tempInputValue.value.max !== undefined
      ? tempInputValue.value.max
      : value.value[1].toString();
  }
  return formatCurrency(value.value[1], 'До');
});

function onFocus(field: 'min' | 'max') {
  focused.value = field;
  tempInputValue.value[field] = value.value[field === 'min' ? 0 : 1].toString();
}

function onBlur(field: 'min' | 'max') {
  focused.value = null;
  tempInputValue.value = {};

  const [min, max] = value.value;
  const clampedMin = Math.max(props.list.min, Math.min(min, props.list.max));
  const clampedMax = Math.max(clampedMin, Math.min(max, props.list.max));

  if (clampedMin !== min || clampedMax !== max) {
    value.value = [clampedMin, clampedMax];
  }
}

function onInput(event: Event, field: 'min' | 'max') {
  const input = event.target as HTMLInputElement;
  const rawValue = input.value.replace(/\D/g, '');
  tempInputValue.value[field] = input.value;

  // Если поле пустое, не пытаемся парсить число
  if (rawValue === '') {
    return;
  }

  const val = parseInt(rawValue, 10);
  if (isNaN(val)) return;

  const minLimit = props.list.min;
  const maxLimit = props.list.max;

  if (field === 'min') {
    const newMin = Math.min(Math.max(val, minLimit), Math.min(value.value[1], maxLimit));
    value.value = [newMin, value.value[1]];
  } else {
    const newMax = Math.max(Math.min(val, maxLimit), Math.max(value.value[0], minLimit));
    value.value = [value.value[0], newMax];
  }
}

function updateLocalValue(val: [number, number]) {
  value.value = [...val];
  // Сбрасываем временные значения при изменении слайдера
  tempInputValue.value = {};
}

function emitValue(val?: [number, number]) {
  emit('change', val ? [...val] : [...value.value]);
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.base-range {
  :deep(.slider-connect) {
    background-color: $dark;
  }

  :deep(.slider-base) {
    position: relative;
    height: 3px;
    width: calc(100% - 1.5rem);
    margin: 0 auto;
    background-color: $light;

    @include tablet-sm {
      height: 0.8px;
    }
  }

  :deep(.slider-connects) {
    position: relative;
  }

  :deep(.slider-handle) {
    top: -8px;
    height: 18px;
    width: 18px;
    box-shadow: none;
    background: $dark;

    &::before {
      content: '';
      @include centered;
      display: block;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: $white;
      pointer-events: none;
    }

    @include tablet-sm {
      height: 14px;
      width: 14px;
    }
  }

  :deep(.slider-horizontal) {
    height: 2.2rem;
    padding-top: 0.6rem;

    @include tablet-sm {
      height: 22px;
      padding-top: 6px;
    }
  }
}

.base-range__tooltip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $secondary;
  font-weight: 450;
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-transform: uppercase;

  @include tablet-sm {
    font-size: 16px;
    line-height: 16px;
  }
}

.base-range__inputs {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.base-range__input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  padding: 11px;
  color: $light;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid $light;
  max-width: 127px;

  @include tablet {
    max-width: 100%;
  }
}

.base-range__input {
  color: $dark;
  background-color: transparent;
  border: unset;
  // max-width: 63px;

  @include tablet {
    max-width: 100%;
  }
}
.base-range__input-postfix {
  margin-left: auto;
}
</style>
