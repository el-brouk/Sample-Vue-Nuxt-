<template>
  <div v-if="schema" class="base-input">
    <Field
      :name="schema.name"
      :modelValue="modelValue"
      :type="schema.type ?? 'text'"
      @change="changeValue"
      v-slot="{ field, meta, handleChange, handleBlur, resetField }"
      @handleChange="changeValue"
    >
      <div
        class="base-input__wrap"
        v-bind:class="{
          'base-input__wrap--error': !meta.valid && meta.validated,
          'base-input__wrap--disabled': schema.disabled,
          'base-input__wrap--valid': modelValue?.toString().length,
        }"
      >
        <label class="base-input__label" v-if="schema.label" :for="schema.name">
          {{ schema.label }}
        </label>
        <div
          class="base-input__inner"
          v-bind:class="{ 'base-input__inner--mark': schema.mark, 'base-input__inner--focus': focused }"
        >
          <input
            class="base-input__control"
            :id="schema.name"
            :name="schema.name"
            :type="typeChange ? 'text' : schema.type"
            :disabled="schema.disabled"
            :readonly="schema.readonly"
            :value="getFormattedValue(modelValue)"
            :placeholder="schema.placeholder"
            @change="$emit('change')"
            @input="changeValue"
            @focus="focus"
            @blur="blur"
            v-maska
            :data-maska="schema.mask ?? ''"
            :data-maska-tokens="schema.maskToken ?? ''"
            autocomplete="new-password"
            contenteditable="true"
          />
          <div class="base-input__controls" v-if="schema.type === 'password' && !isConfirmPass">
            <button class="base-input__show-pas" type="button" @click="typeChange = !typeChange">
              <base-icon icon="eye-close" v-if="!typeChange" />
              <base-icon icon="eye" v-else />
            </button>
          </div>
          <div
            class="base-input__controls base-input__controls--check"
            v-else-if="schema.type === 'password' && isConfirmPass"
          >
            <!-- <base-icon icon="check-circle" /> -->
          </div>
          <div class="base-input__controls" v-if="schema.search">
            <button class="base-input__show-pas" type="button">
              <!-- <base-icon icon="search" /> -->
            </button>
          </div>
          <slot name="mark">
            <span v-if="schema.mark" class="base-input__mark" v-html="schema.mark"></span>
          </slot>
        </div>
        <slot name="customAction"></slot>
      </div>
      <p class="base-input__hint" v-if="schema.hint" v-html="schema.hint"></p>
    </Field>
    <ErrorMessage class="base-input__error" :name="schema.name" />
    <!-- <BaseFormInputBackError :message="backError" v-if="backError" /> -->
  </div>
</template>

<script setup>
import { useField, ErrorMessage } from 'vee-validate'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
  modelValue: [String, Boolean, Number, Object],
  formatted: {
    type: Boolean,
    default: false,
  },
  backError: {
    type: String,
    default: '',
  },
  isConfirmPass: {
    type: Boolean,
    default: false,
  },
})

const labelShow = ref(false)
const typeChange = ref(false)
const focused = ref(false)

const getFormattedValue = (modifiedValue, placeholder) => {
  if (!modifiedValue || !props.formatted) return modifiedValue

  let newValue = parseFloat(modifiedValue.toString())
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1 ')

  return placeholder ? placeholder + ' ' + newValue : newValue
}

const getValue = (modifiedValue) => normalize(modifiedValue)

const changeValue = (event) => {
  emit('update:modelValue', getValue(event.target.value))
}

const normalize = (modifiedValue) => {
  if (!modifiedValue || !props.formatted) return modifiedValue

  let newValue = parseFloat(modifiedValue.toString().replace(/[^\d\.]/g, ''))

  return isNaN(newValue) ? 0 : newValue
}

const focus = () => {
  labelShow.value = true
  focused.value = true
}

const blur = () => {
  labelShow.value = false
  focused.value = false
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

input:-webkit-autofill {
  transition: all 5000s ease-in-out 0s;
}

.base-input {
  position: relative;

  input:focus ~ .base-input__label {
    font-size: 12px;
    line-height: 140%;
  }
}

.base-input__wrap {
  position: relative;

  @media (hover: hover) {
    &:hover:not(&--error, &--disabled) {
      .base-input__inner {
        border: 1px solid #f0f0f0;
      }
    }
  }

  &--disabled {
    .base-input__control {
      background: #f0f0f0;

      &::placeholder {
        color: $gray;
      }
    }
  }

  &--error {
    border: 0;

    .base-input__inner {
      border: 1px solid $terracotta;
    }

    .base-input__label {
      color: $dark-gray;
    }
  }

  &--valid {
    // .base-input__label {
    //   font-size: 12px;
    // }
  }
}

.base-input__wrap:not(.base-input__wrap--error).base-input__wrap--valid {
  .base-input__controls--check {
    :deep(.nuxt-icon svg) {
      // color: #f26501;
    }
  }
}

.base-input__label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 300;
  line-height: 140%;
}

.base-input__inner {
  position: relative;
  height: 48px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: $white;
  transition: $base-transition;

  &--mark {
    display: flex;
    align-items: flex-end;
  }
}

.base-input__inner--focus {
  border: 1px solid $accent;
}

.base-input__control {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  padding: 15px 16px;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  box-sizing: border-box;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: $base-transition;

  &::placeholder {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #002445;
  }
}

.base-input__controls {
  position: absolute;
  right: 16px;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  transform: translateY(-50%);

  :deep(.nuxt-icon svg) {
    display: block;
    width: 1.5em;
    height: 1.5em;
    color: #888888;
  }
}

.base-input__show-pas {
  padding: 0;
  background: transparent;
  border: 0;

  ::v-deep(svg) {
    display: block;
    width: 1.5em;
    height: 1.5em;
  }
}

.base-input__mark {
  padding: 18px 0 5px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  text-align: right;
  // color: $dark-gray;
  white-space: nowrap;
}

.base-input__hint {
  margin-top: 3px;
  color: #00000099;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.4px;
}

.base-input__error {
  position: absolute;
  display: block;
  text-align: left;
  color: red;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.4px;
}
</style>
