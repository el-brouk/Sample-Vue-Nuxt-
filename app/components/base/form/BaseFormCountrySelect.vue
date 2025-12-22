<template>
  <div class="base-country-select" :class="{ 'base-country-select--disabled': disabled }">
    <div class="base-country-select__wrap">
      <div :class="['base-country-select__control', { 'base-country-select__control--selected': modelValue }, { active: opened }, { disabled: disabled }]" @click="toggle">
        <div class="base-country-select__left-part">
          <span class="base-country-select__value" v-if="modelValue">
            <img :src="getFlagUrl(modelValue.code)" alt="" class="base-country-select__flag" />
          </span>
        </div>
        <div class="base-country-select__right-part">
          <base-icon class="base-country-select__toggler" icon="chevron-right" :no-fill="true" />
        </div>
      </div>
      <div class="base-country-select__dropdown" v-show="opened">
        <ul class="base-country-select__list">
          <li
              v-for="item in list"
              :key="item.code"
              class="base-country-select__item"
              :class="{ selected: isSelected(item) }"
              @click="click(item)"
          >
            <span class="base-country-select__option">
              <img :src="getFlagUrl(item.code)" alt="" class="base-country-select__flag" />
              <span>{{ item.name }} <span class="base-country-select__code">{{ item.phoneCode }}</span></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { Country } from "~/model/country";
import type { SchemaItem } from "~/model/schema";

const props = defineProps({
  schema: {
    type: Object as PropType<SchemaItem>,
    required: true,
  },
  modelValue: {
    type: Object as PropType<Country | null>,
    required: true,
  },
  list: {
    type: Array as PropType<Country[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const opened = ref(false);

const toggle = () => {
  if (props.disabled) return;
  opened.value = !opened.value;
};

const close = () => {
  opened.value = false;
};

function getFlagUrl(code: string): string {
  return `/assets/img/countries/${code.toLowerCase()}.svg`;
};

function isSelected(item: Country): boolean {
  return item.code === props.modelValue?.code;
};

const click = (item: Country) => {
  emit("update:modelValue", item);
  close();
};
</script>


<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/mixins' as *;

.base-country-select {
  display: block;
  cursor: pointer;
}

.base-country-select__wrap {
  &--error {
    .base-country-select__control {
      border-bottom: 1px solid red;

      @include phone {
        border-bottom: 0.6px solid red;
      }

      &::placeholder {
        color: red;
      }
    }

    .base-country-select__label {
      color: red;
    }
  }
}

.base-country-select__control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: 4px;
  gap: 10px;
  border: 0;

  @include phone {
    padding: 0;
  }

  &--selected {
    padding: 0;
    gap: 10px;

    .base-country-select__placeholder {
      font-size: 12px;
      line-height: 140%;
    }
  }

  &.active {
    .base-country-select__toggler {
      transform: rotate(180deg);
    }
  }

  &.disabled {
    opacity: 0.6;
  }
}

.base-country-select__value {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;

  @include tablet {

  }

  @include phone {

  }
}


.base-country-select__left-part {
  display: grid;
}

.base-country-select__toggler {
  :deep(svg) {
    display: block;
    width: 10px;
    height: 12px;
    transition: $base-transition;

    @include tablet {

    }

    @include phone {

    }
  }
}

.base-country-select__placeholder {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #353E51;
  opacity: 0.6;
}

.base-country-select__error {
  color: red;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: normal;

  @include tablet {
    font-size: 12px;
  }
}

.base-country-select__dropdown {
  position: absolute;
  z-index: 8;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
  padding: 8px 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  background: $white;
  border: 1px solid #EDEDEE;
  box-sizing: border-box;

  @include tablet {

  }
}

.base-country-select__list {
  padding: 0;
  margin: 0;
  max-height: 28.5rem;
  list-style: none;
  overflow-y: auto;

  @include tablet {
    max-height: 285px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.base-country-select__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 12px 20px;
  gap: 10px;

  &.selected {
    background: #F4F4F9;
  }

  @include tablet {

  }
}

.base-country-select__option {
  display: flex;
  align-items: center;
  gap: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;

  @include tablet {

  }
}

.base-country-select__flag {
  width: 27px;
  height: 18px;
  vertical-align: middle;
}

.base-country-select__code {
  color: #85878C;
}

.base-country-select__item {
  display: flex;
  align-items: center;
  gap: 4px;
}

</style>
