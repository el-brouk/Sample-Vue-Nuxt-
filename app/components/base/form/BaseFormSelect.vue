<script lang="ts" setup>
import type { SchemaItem, SelectItem } from '~/model/form';

const props = withDefaults(
  defineProps<{
    schema: SchemaItem;
    modelValue: SelectItem | SelectItem[] | null;
    list: SelectItem[];
    multiple: boolean;
    filter: boolean;
    icon: string;
    search: boolean;
    showValue: boolean;
    showCount: boolean;
  }>(),
  {
    list: () => [],
    modelValue: null,
    schema: () => {
      return {
        name: 'name',
      };
    },
    multiple: false,
    filter: false,
    icon: '',
    search: false,
    showValue: false,
    showCount: false,
  }
);

let modelValue = ref(props.modelValue);
let filter = ref(props.filter);
let schema = ref(props.schema);
let multiple = ref(props.multiple);
let list = ref(props.list);
let opened = ref<boolean>(false);
let searchValue = ref<string>('');

const emit = defineEmits(['update:modelValue']);

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

const selectedItemsLabel = () => {
  if (!multiple.value || !modelValue.value) {
    return null;
  }

  /** @ts-ignore */
  let value = modelValue.value as Array<string | number>;
  let labels: string[] = [];

  if (value.length === 0) {
    list.value.forEach((item) => {
      if (item.value === null) {
        labels = [item.title];
      }
    });
  } else {
    list.value.forEach((item) => {
      if (item.value !== null && value.includes(item.value)) {
        labels.push(item.title);
      }
    });
  }

  return labels.join(', ');
};

const selectedItem = (): SelectItem | null => {
  if (multiple) {
    return null;
  }

  let selectedItem = null;
  if (list) {
    list.value.forEach((item) => {
      /** @ts-ignore */
      if (modelValue.value && item.value === modelValue.value.value) {
        selectedItem = item;
      }
    });
  }

  return selectedItem;
};

const selectItems = (): SelectItem[] => {
  if (searchValue.value === '') {
    return list.value;
  }
  return list.value.filter((item) => {
    return item.title.toLocaleLowerCase().match(searchValue.value.toLocaleLowerCase());
  });
};

function itemSelected(item: SelectItem) {
  if (!modelValue.value) {
    return false;
  }

  if (multiple.value) {
    /** @ts-ignore */
    let value = modelValue.value as Array<string | number>;
    if (item.value === null) {
      return value.length === 0;
    }
    return value.includes(item.value);
  }

  /** @ts-ignore */
  return item.value == modelValue.value.value;
}

function selectItem(item: SelectItem) {
  if (multiple.value) {
    if (item.value === null) {
      return emit('update:modelValue', []);
    }
    /** @ts-ignore */
    const value = modelValue.value as Array<string | number>;
    if (value.includes(item.value)) {
      emit(
        'update:modelValue',
        value.filter((i) => item.value !== i)
      );
    } else {
      emit('update:modelValue', [
        /** @ts-ignore */
        ...(modelValue.value as Array<string | number>),
        item.value,
      ]);
    }
  } else {
    close();
    emit('update:modelValue', item.value);
  }
}

function changeValue(event: any) {
  emit('update:modelValue', event.target.value);
}

function toggle() {
  if (schema.value.disabled) {
    return;
  }
  opened.value = !opened.value;
}

function close() {
  opened.value = false;
  searchValue.value = '';
}

function isSelected(item: SelectItem): boolean {
  return itemSelected(item);
}

function click(item: SelectItem) {
  emit('update:modelValue', item);
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <div class="base-select" :class="['base-form-select', { 'base-form-select--filter': filter }]">
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
              {{ selectedItem }}
              <!--              <span class="base-form-select__icon" v-if="selectedItem && selectedItem.icon">-->
              <!--                <base-icon :icon="selectedItem.icon"/>-->
              <!--              </span>-->
              <!--              <span class="base-form-select__icon" v-else-if="selectedItem && icon">-->
              <!--                <base-icon :icon="icon"/>-->
              <!--              </span>-->
              <!--              <span class="base-form-select__placeholder" v-if="selectedItem && showValue">-->
              <!--                {{ selectedItem.title }}-->
              <!--              </span>-->
            </template>
            <span
              class="base-form-select__placeholder"
              v-if="!selectedItem && !selectedItemsLabel?.length && schema.placeholder"
              >{{ schema.placeholder }}</span
            >
            <base-icon class="base-form-select__toggler" icon="arrow-down" />
          </div>
        </div>
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
              <span @click="selectItem(item)" style="width: 100%" v-if="item">
                {{ item }}
                <!--                <span class="base-form-select__option" v-if="item.title">{{ item.title }}</span>-->
                <!--                <span class="base-form-select__desc" v-if="item.description">{{ item.description }}</span>-->
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

  &--border {
    .base-form-select__control {
      padding: 7px 12px;
      border: 1px solid #0000003b;
      border-radius: 4px;

      @media (hover: hover) {
        &:hover:not(&.disabled) {
          border: 1px solid $dark-gray;

          .base-form-select__label {
            color: $dark-gray;
          }

          .base-form-select__toggler {
            color: $dark-gray;
          }
        }
      }

      &.active {
        border: 1px solid $dark-gray;

        .base-form-select__label {
          color: $dark-gray;
        }

        .base-form-select__toggler {
          color: $dark-gray;
          transform: rotate(180deg);
        }
      }

      &.disabled {
        border: 1px dashed #0000003b;

        .base-form-select__label {
          color: $dark-gray;
        }

        .base-form-select__value {
          color: $dark-gray;
        }

        .base-form-select__placeholder {
          color: $dark-gray;
        }

        .base-form-select__toggler {
          color: $dark-gray;
        }
      }
    }

    .base-form-select__label {
      top: -5px;
      left: 12px;
      padding: 0 5px;
      color: rgba(0, 0, 0, 0.6);
      background: $white;
    }
  }

  &--orange {
    .base-form-select__control {
      padding: 0;
      border-bottom: 0;
      color: $dark-gray;

      @media (hover: hover) {
        &:hover:not(&.disabled) {
          border-bottom: 0;

          .base-form-select__label {
            color: $dark-gray;
          }

          .base-form-select__toggler {
            color: $dark-gray;
          }
        }
      }

      &.active {
        border-bottom: 0;

        .base-form-select__label {
          color: $dark-gray;
        }

        .base-form-select__toggler {
          color: $dark-gray;
        }
      }
    }

    .base-form-select__placeholder {
      color: $dark-gray;
    }

    .base-form-select__toggler {
      color: $dark-gray;
    }

    .base-form-select__dropdown {
      padding: 8px 0;
      min-width: auto;
    }

    .base-form-select__item {
      padding: 6px 16px;
    }

    .base-form-select__list {
      max-height: 216px;
    }
  }
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
  border-bottom: 1px solid $dark-gray;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  transition: $base-transition;

  @media (hover: hover) {
    &:hover:not(&.disabled) {
      border-bottom: 1px solid $dark-gray;

      .base-form-select__label {
        color: $dark-gray;
      }

      .base-form-select__toggler {
        color: $dark-gray;
      }
    }
  }

  &.active {
    border-bottom: 1px solid $dark-gray;

    .base-form-select__label {
      color: $dark-gray;
    }

    .base-form-select__toggler {
      color: $dark-gray;
      transform: rotate(180deg);
    }
  }

  &.disabled {
    border-bottom: 1px dashed #0000003b;

    .base-form-select__label {
      color: $dark-gray;
    }

    .base-form-select__value {
      color: $dark-gray;
    }

    .base-form-select__placeholder {
      color: $dark-gray;
    }

    .base-form-select__toggler {
      color: $dark-gray;
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
  color: $dark-gray;

  @media (hover: hover) {
    &:hover {
      input:not(:checked) + .base-form-select__checkbox-text {
        &::before {
          border: 2px solid $dark-gray;
        }
      }

      input:checked + .base-form-select__checkbox-text::before {
        border-color: $dark-gray;
        background-color: $dark-gray;
      }
    }
  }

  &:active {
    input:not(:checked) + .base-form-select__checkbox-text {
      &::before {
        border: 2px solid $dark-gray;
      }

      input:checked + .base-form-select__checkbox-text::before {
        border-color: $dark-gray;
        background-color: $dark-gray;
      }
    }
  }

  &:disabled {
    .base-form-select__checkbox-text {
      &::before {
        border: 2px solid $dark-gray;
      }
    }

    input:checked + .base-form-select__checkbox-text::before {
      border-color: $dark-gray;
      background-color: $dark-gray;
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
  color: $dark-gray;
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
  background-color: $dark-gray;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0002 21.5598L6.44021 15.9998L4.54688 17.8798L12.0002 25.3331L28.0002 9.33312L26.1202 7.45312L12.0002 21.5598Z' fill='white'/%3E%3C/svg%3E%0A");
  background-size: 18px 18px;
  background-repeat: no-repeat;
  border-color: $dark-gray;
}
</style>
