<script lang="ts" setup>
import type { SchemaItem, SelectItem } from '~/model/form';
import { OnClickOutside } from '@vueuse/components';

interface Props {
  schema: SchemaItem;
  modelValue: string | string[] | null;
  list: SelectItem[];
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  search?: boolean;
  showValue?: boolean;
  showCount?: boolean;
  border?: boolean;
  orange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  search: false,
  showValue: true,
  showCount: false,
  border: false,
  orange: false,
});

const emit = defineEmits(['update:model-value']);

let modelValue = computed<string | string[] | null>(() => props.modelValue);
let opened = ref<boolean>(false);
let searchValue = ref<string>('');

const schemaFields = {
  search: {
    as: 'Поиск',
    placeholder: 'Поиск',
    label: '',
    name: 'search',
    mask: '',
    validateRules: {},
  },
  checkbox: {
    as: 'Поиск',
    placeholder: 'Поиск',
    label: '',
    name: 'search',
    mask: '',
    validateRules: {},
  },
};

const selectedItemsLabel = computed(() => {
  if (!props.multiple || !modelValue.value) {
    return null;
  }

  const value = modelValue.value as Array<string | number>;
  let labels: Array<string> = [];

  if (value.length === 0) {
    props.list.forEach((item) => {
      if (item.value === null) {
        labels = [item.title];
      }
    });
  } else {
    props.list.forEach((item) => {
      if (item.value !== null && value.includes(item.value)) {
        labels.push(item.title);
      }
    });
  }

  return labels.join(', ');
});

const selectedItem = computed(() => {
  if (props.multiple) {
    return null;
  }

  let selectedItem = null;

  // Get the actual value - handle both string and array cases
  let actualValue: string | number | null = null;
  if (Array.isArray(modelValue.value)) {
    actualValue = modelValue.value.length > 0 ? modelValue.value[0] : null;
  } else {
    actualValue = modelValue.value;
  }

  if (props.list && actualValue !== null) {
    props.list.forEach((item) => {
      if (item.value === actualValue) {
        selectedItem = item;
      }
    });
  }

  return selectedItem;
});

const selectItems = computed(() => {
  if (searchValue.value === '') {
    return props.list;
  }
  return props.list.filter((item) => {
    return item.title.toLocaleLowerCase().match(searchValue.value.toLocaleLowerCase());
  });
});

const itemSelected = (item: SelectItem) => {
  if (!modelValue.value) {
    return false;
  }

  // if (props.multiple) {
  const value = modelValue.value as Array<string | number>;
  if (item.value === null) {
    return value.length === 0;
  }
  return value.includes(item.value);
  // }

  // return item.value == modelValue.value;
};

function selectItem(item: SelectItem) {
  if (props.multiple) {
    if (item.value === null) {
      return emit('update:model-value', []);
    }
    const value = props.modelValue as Array<string | number>;
    if (value.includes(item.value)) {
      emit(
        'update:model-value',
        value.filter((i) => item.value !== i)
      );
    } else {
      emit('update:model-value', [...(props.modelValue as Array<string | number>), item.value]);
    }
  } else {
    close();
    emit('update:model-value', item.value);
  }
}

const changeValue = (event: any) => {
  emit('update:model-value', event.target.value);
};

const toggle = () => {
  if (props.schema.disabled) {
    return;
  }

  opened.value = !opened.value;
};

function close() {
  opened.value = false;
  searchValue.value = '';
}

function isSelected(item: SelectItem): boolean {
  return itemSelected(item);
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <div class="base-select base-form-select">
      <Field
        class="base-select__control"
        :name="schema.name ?? ''"
        :modelValue="modelValue"
        :type="schema.type ?? 'text'"
        @change="changeValue"
        v-slot="{ field, handleChange, handleBlur }"
        @handleChange="changeValue"
      >
        <label class="base-form-select__label" v-if="schema.label" @click="toggle">{{
          schema.label
        }}</label>
        <div class="base-form-select__control-wrap">
          <div
            :class="[
              'base-form-select__control',
              { active: opened },
              { disabled: schema.disabled },
            ]"
            @click="toggle"
          >
            <template v-if="multiple">
              <span class="base-form-select__value">{{ selectedItemsLabel }}</span>
            </template>
            <template v-else-if="selectedItem">
              {{ selectedItem.title }}
            </template>
            <span
              class="base-form-select__placeholder"
              v-if="!selectedItem && !selectedItemsLabel?.length && schema.placeholder"
              >{{ schema.placeholder }}</span
            >
            <base-icon class="base-form-select__toggler" icon="arrow-down" />
          </div>
        </div>
        <!-- <pre>{{ selectItems }}</pre> -->
        <div class="base-form-select__dropdown" v-show="opened">
          <div class="base-form-select__dropdown-search" v-if="search">
            <base-form-input v-model="searchValue" :schema="schemaFields.search" />
          </div>

          <ul class="base-form-select__list">
            <li
              class="base-form-select__item"
              v-for="(item, index) in selectItems"
              :key="index"
              v-bind:class="{ 'base-form-select__item--active': isSelected(item) }"
            >
              <span @click="selectItem(item)" v-if="item">
                {{ item.title }} ({{ item.count }})
              </span>
            </li>
          </ul>
        </div>
      </Field>

      <ErrorMessage class="base-select__error" :name="schema.name ?? ''" />
    </div>
  </OnClickOutside>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;

.base-form-select {
  position: relative;
  display: block;
  text-align: left;
}

.base-form-select__label {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.15px;
  color: #00000099;
}

.base-form-select__control-wrap {
  position: relative;
  display: block;
}

.base-form-select__control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 0 6px;
  border-radius: 0;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid $dark;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  transition: $base-transition;

  @media (hover: hover) {
    &:hover:not(&.disabled) {
      border-bottom: 1px solid $dark;

      .base-form-select__label {
        color: $dark;
      }

      .base-form-select__toggler {
        color: $dark;
      }
    }
  }

  &.active {
    border-bottom: 1px solid $dark;

    .base-form-select__label {
      color: $dark;
    }

    .base-form-select__toggler {
      color: $dark;
      transform: rotate(180deg);
    }
  }

  &.disabled {
    border-bottom: 1px dashed #0000003b;

    .base-form-select__label {
      color: $dark;
    }

    .base-form-select__value {
      color: $dark;
    }

    .base-form-select__placeholder {
      color: $dark;
    }

    .base-form-select__toggler {
      color: $dark;
    }
  }
}

.base-form-select__icon {
  display: block;
  margin-right: 4px;

  ::v-deep(svg) {
    display: block;
    width: 24px;
    height: 24px;
  }
}

.base-form-select__placeholder {
  color: rgba(0, 0, 0, 0.6);
}

.base-form-select__value {
  display: block;
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-form-select__toggler {
  flex-shrink: 0;
  margin-left: auto;
  color: rgba(0, 0, 0, 0.56);
  transition: $base-transition;

  ::v-deep(svg) {
    display: block;
    width: 24px;
    height: 24px;
  }
}

.base-form-select__dropdown {
  position: absolute;
  z-index: 8;
  top: calc(100% + 4px);
  right: 0;
  width: 100%;
  min-width: 220px;
  box-sizing: border-box;
  border-radius: 4px;
  background: $white;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.base-form-select__dropdown-search {
  padding: 18px 12px 6px;
  border: 1px solid rgba(0, 0, 0, 0.23);
}

.base-form-select__list {
  padding: 0;
  margin: 0;
  max-height: 285px;
  list-style: none;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.base-form-select__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 9px 12px;
  cursor: pointer;
  color: $dark;

  @media (hover: hover) {
    &:hover {
      input:not(:checked) + .base-form-select__checkbox-text {
        &::before {
          border: 2px solid $dark;
        }
      }

      input:checked + .base-form-select__checkbox-text::before {
        border-color: $dark;
        background-color: $dark;
      }
    }
  }

  &:active {
    input:not(:checked) + .base-form-select__checkbox-text {
      &::before {
        border: 2px solid $dark;
      }

      input:checked + .base-form-select__checkbox-text::before {
        border-color: $dark;
        background-color: $dark;
      }
    }
  }

  &:disabled {
    .base-form-select__checkbox-text {
      &::before {
        border: 2px solid $dark;
      }
    }

    input:checked + .base-form-select__checkbox-text::before {
      border-color: $dark;
      background-color: $dark;
    }
  }
}

.base-form-select__option {
  font-size: 16px;
  line-height: 24px;
}

.base-form-select__desc {
  flex-grow: 1;
}

.base-select__error {
  margin-top: 3px;
  display: block;
  color: $dark;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: 0.4px;
}

input[type='checkbox'] {
  display: none;
}

.base-form-select__checkbox-text {
  display: flex;
  align-items: center;
  padding: 3px;
  margin-right: 9px;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.6);
    background-color: transparent;
    background-position: center;
  }
}

input:checked + .base-form-select__checkbox-text::before {
  background-color: $dark;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0002 21.5598L6.44021 15.9998L4.54688 17.8798L12.0002 25.3331L28.0002 9.33312L26.1202 7.45312L12.0002 21.5598Z' fill='white'/%3E%3C/svg%3E%0A");
  background-size: 18px 18px;
  background-repeat: no-repeat;
  border-color: $dark;
}
</style>
