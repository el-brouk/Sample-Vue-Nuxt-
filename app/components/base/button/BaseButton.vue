<script lang="ts" setup>
interface BaseButtonProps {
  to?: string | object;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  emitLinkClick?: boolean;
  size?: 'small' | 'medium' | 'large';
  isFull?: boolean;
  primary?: boolean;
  secondary?: boolean;
  icon?: boolean;
  transparent?: boolean;
  white?: boolean;
  light?: boolean;
  loading?: boolean;
}

// props
const props = withDefaults(defineProps<BaseButtonProps>(), {
  buttonType: 'button',
  disabled: false,
  emitLinkClick: false,
  size: 'large',
  isFull: false,
  primary: true,
  secondary: false,
  icon: false,
  transparent: false,
  white: false,
  light: false,
  loading: false,
});

const emit = defineEmits<{
  (event: 'click'): void;
}>();

// refs and computed
const buttonClasses = computed(() => ({
  [`btn--${props.size}`]: !!props.size,
  'btn--disabled': props.disabled,
  'btn--primary': props.primary,
  'btn--full': props.isFull,
  'btn--icon': props.icon,
  'btn--secondary': props.secondary,
  'btn--transparent': props.transparent,
  'btn--light': props.light,
  'btn--white': props.white,
  'btn--loading': props.loading,
}));

// Вычисляем общее состояние отключения
const isDisabled = computed(() => props.disabled || props.loading);

// functions
const onClick = (event: Event) => {
  // Блокируем клик, если кнопка выключена или идет загрузка
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  // Если это кнопка с type="button", предотвращаем отправку формы
  if (props.buttonType === 'button') {
    event.preventDefault();
  }
};
</script>

<template>
  <button
    v-if="!to"
    class="btn"
    :class="buttonClasses"
    :disabled="disabled"
    :type="buttonType"
    @click="onClick"
  >
    <!-- Показываем лоадер, если loading=true -->
    <span v-if="loading" class="btn__loader">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <slot />
  </button>

  <nuxt-link v-else :to="to" class="btn btn--link" :class="buttonClasses">
    <slot />
  </nuxt-link>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.btn {
  @include button-reset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 11px 20px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  line-height: 24.32px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: $primary;
  background: $accent;
  transition: $base-transition;
  cursor: pointer;

  @include phone {
    width: 100%;
  }

  @include hover {
    background-color: $white;
    border-color: $accent;
  }

  &--disabled {
    opacity: 0.7;
  }

  // Стиль при загрузке (блокируем курсор)
  &--loading {
    cursor: not-allowed;
    pointer-events: none; // Дополнительная защита от кликов
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.6;
    }

    .btn__loader {
      position: absolute;
      margin: 0 auto;
    }
  }

  &--small {
    padding: 11px 20.5px;
  }

  &--medium {
    padding: 14.5px 44.5px;
  }

  &--large {
    padding: 14.5px 46px;
  }

  &--full {
    width: 100%;
  }

  &--icon {
    height: auto;
    padding: 8px;
    font-size: 24px;

    :deep(.nuxt-icon svg) {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  }

  &--primary {
    color: $white;
    background: $main-gradient;
  }

  &--secondary {
    border: 1px solid $accent;

    color: $secondary;
    background: transparent;

    &.btn--white {
      background: rgba($white, 0.1);
    }
  }

  &--white {
    background-color: $white;
    color: $black;
  }

  &--light {
    background-color: $light;
    color: $black;
    border: transparent;

    @include hover {
      background: $light-gray;
    }
  }

  &--transparent {
    border-color: transparent;
    color: $dark;
    background-color: transparent;
  }

  // --- Лоадер (три точки) ---
  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    span {
      width: 6px;
      height: 6px;
      background-color: currentColor; // Берет текущий цвет текста кнопки
      border-radius: 50%;
      display: inline-block;
      animation: bouncedelay 1.4s infinite ease-in-out both;
    }

    span:nth-child(1) {
      animation-delay: -0.32s;
    }

    span:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
