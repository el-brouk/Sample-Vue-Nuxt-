<script lang="ts" setup>
const props = withDefaults(defineProps<{
      message: string,
      icon: string,
      big: string,
      right: string,
    }>(), {
      message: ''
    }
)

let tooltipHover = ref<boolean>(false)

const classes = reactive([
  {'base-tooltip--big': props.big},
  {'base-tooltip--right': props.right},
])
</script>

<template>
  <span class="base-tooltip" :class="classes">
    <span class="base-tooltip__btn"
          @mouseover="tooltipHover = true"
          @mouseleave="tooltipHover = false"
    >
      <base-icon v-if="icon" :icon="icon" :no-fill="true"/>
      <base-icon v-else icon="question" :no-fill="true"/>
    </span>
    <span class="base-tooltip__content" v-if="tooltipHover" v-html="message"></span>
  </span>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/helpers/_variables" as *;
@use "@/assets/scss/helpers/_mixins" as *;

.base-tooltip {
  position: relative;
  z-index: 6;

  @media (hover: hover) {
    &:hover {
      .base-tooltip__btn {
        color: $text-primary;
      }
    }
  }

  &--right {
    .base-tooltip__content {
      left: auto;
      transform: none;

      &:before {
        left: auto;
        transform: translateX(20%);
      }
    }
  }

  &--big {
    .base-tooltip__btn {
      width: 32px;
      height: 32px;

      ::v-deep(svg) {
        width: 32px;
        height: 32px;
      }
    }

    .base-tooltip__content {
      top: 36px;
    }
  }

  &--dark-grey {
    .base-tooltip__btn {
      color: $text-secondary;
    }

    @media (hover: hover) {
      &:hover {
        .base-tooltip__btn {
          color: rgba(0, 0, 0, 0.56);
        }
      }
    }
  }

  &--orange {
    .base-tooltip__btn {
      color: $primary-main;
    }

    @media (hover: hover) {
      &:hover {
        .base-tooltip__btn {
          color: $primary-dark;
        }
      }
    }
  }
}

.base-tooltip__btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: $text-disabled;
  transition: $base-transition;

  ::v-deep(svg) {
    display: block;
    width: 24px;
    height: 24px;
  }
}

.base-tooltip__content {
  position: absolute;
  top: 30px;
  left: 50%;
  z-index: 100;
  display: block !important;
  background: rgba(97, 97, 97, 0.9);
  border-radius: 4px;
  width: max-content;
  max-width: 210px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: 0.4px;
  color: $white;
  transform: translateX(-50%);
  text-align: left;
  text-transform: none;

  &:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    border-color: rgba(97, 97, 97, 0.9);
    z-index: 1;
    border-width: 0 6px 6px 6px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
