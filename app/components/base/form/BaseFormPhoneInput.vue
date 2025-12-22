<template>
  <div class="base-phone-input" v-bind:class="[{ 'base-phone-input--disabled': schema.disabled }, classes]">
    <Field
        :name="schema.name ?? ''"
        :modelValue="modelValue"
        :type="schema.type ?? 'text'"
        @change="changeValue"
        v-slot="{ field, meta }"
        @handleChange="changeValue"
    >
    <div class="base-phone-input__wrap" v-bind:class="{ 'base-phone-input__wrap--error': !meta.valid && meta.validated }">
      <base-form-country-select
          v-if="selectedCountry"
          v-model="selectedCountry"
          :list="countries"
          :schema="{ name: 'country' }"
          @update:modelValue="onCountryChange"
      />

      <label class="base-phone-input__label">
        <input
            class="base-phone-input__control"
            :id="schema.name"
            :placeholder="selectedCountry && selectedCountry.placeholder"
            :name="schema.name"
            :type="schema.type ? schema.type : 'text'"
            :disabled="schema.disabled"
            v-maska
            v-model.trim="field.value"
            @input="changeValue"
            @focus="handleFocus"
            @blur="handleBlur"
            :data-maska="selectedCountry ? selectedCountry.mask : ''"
        />
      </label>
    </div>
    </Field>
    <ErrorMessage class="base-phone-input__error" as="div" :name="schema.name" v-slot="{ message }">
      <span>{{ message }}</span>
    </ErrorMessage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import countriesData from "~/assets/js/countries";
import { ErrorMessage, Field } from 'vee-validate'

import type { SchemaItem } from '~/model/schema'
import type {Country} from "~/model/country";
import BaseFormCountrySelect from "~/components/base/form/BaseFormCountrySelect.vue";

const props = defineProps<{
  schema: SchemaItem
  modelValue: string | boolean | number | null
  button?: boolean
  secondary?: boolean
  white?: boolean
  bordered?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | boolean | number | null): void
  (e: 'submit'): void
  (e: 'update:mask', value: string): void;
}>()

const countries = ref(countriesData);
let selectedCountry = ref(countries.value[0]);
const isFocus = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isEmpty = computed(() => !inputValue.value)

const classes = computed(() => ({
  'base-phone-input--focus': isFocus.value || (!isEmpty.value && props.schema.label),
  'base-phone-input--base': !props.schema.label,
  'base-phone-input--secondary': props.secondary,
  'base-phone-input--button': props.button,
  'base-phone-input--bordered': props.bordered,
  'base-phone-input--white': props.white,
}))

function changeValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

function handleFocus() {
  isFocus.value = true
}

function handleBlur() {
  if (isEmpty.value) {
    isFocus.value = false
  }
}

function onCountryChange(newCountry: Country) {
  const newMask = newCountry.mask;
  emit('update:mask', newMask);
}

</script>

<style lang="scss" scoped>
@use "@/assets/scss/helpers/_variables" as *;
@use "@/assets/scss/helpers/_mixins" as *;

input:-webkit-autofill {
  transition: all 5000s ease-in-out 0s;
}

.base-phone-input {
  flex-grow: 1;
  position: relative;
  width: 100%;

  &--focus {
    .base-phone-input__label {
      top: 20px;
      font-size: 12px;
      line-height: 140%;

      @include phone {
        top: 8px;
      }
    }
  }

}

.base-phone-input__wrap {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 30px 20px;
  border: 1px solid #ededee;

  @include phone {
    padding: 22px 16px;
  }

  &--error {
    border: 1px solid red;

    .base-phone-input__label,
    .base-phone-input__control {
      color: red;
    }
  }
}

.base-phone-input__label {
  display: block;
}

.base-phone-input__control {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #353e51;

  &::placeholder {
    color: grey;
  }

  &:disabled {
    opacity: 0.6;
  }
}

.base-phone-input__error {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  color: red;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  :deep(svg) {
    width: 16px;
    height: 16px;
  }

  @include tablet {
    font-size: 12px;
  }
}

.base-phone-input__submit {
  @include button-reset;
  @include centered("y");
  right: 4px;
  // font-weight: 600;
  // font-size: 16px;
  // line-height: 24px;
  // padding: 0;
  // border: none;
  transition: $base-transition;
}

.base-phone-input--bordered {
  .base-phone-input__control {
    border: 1px solid grey;
  }
}

.base-phone-input--secondary {
  .base-phone-input__wrap {
    border: 1px solid #0000001f;

    &--error {
      border: 1px solid red;
    }
  }

  .base-phone-input__control {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    color: #353e51;

    &::placeholder {
      color: #353e51;
      opacity: 0.6;
    }
  }
}

.base-phone-input--white {
  .base-phone-input__control {
    border: 1px solid rgba(237, 237, 238, 0.8);
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
    color: #ededee;

    &::placeholder {
      color: #ededee;
      opacity: 0.6;
    }
  }

  .base-phone-input__label {
    color: #ededee;
    opacity: 0.6;
  }
}
</style>
