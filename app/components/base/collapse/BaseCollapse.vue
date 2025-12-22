<script setup lang="ts">
interface Props {
  name?: string
  text?: string
  maxHeight?: number
  secondary?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  text: '',
  secondary: false,
  defaultOpen: false,
})

const open = ref(props.defaultOpen)

const classes = computed(() => ({
  'base-collapse--secondary': props.secondary,
  'base-collapse--active': open.value,
}))

const styles = computed(() => ({
  '--max-collapse-height': props.maxHeight ? `${props.maxHeight}px` : undefined,
}))

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="base-collapse" :class="classes" :style="styles">
    <button @click="toggle" class="base-collapse__trigger" type="button" :class="{ active: open }">
      <template v-if="$slots.trigger">
        <slot name="trigger" />
      </template>

      <template v-else>
        <span class="base-collapse__title" v-if="name">{{ name }}</span>
      </template>
      <base-icon icon="chevron-down" class="base-collapse__trigger-icon" />
    </button>
    <div class="base-collapse__content">
      <template v-if="text">
        <div class="base-collapse__text" v-html="text"></div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.base-collapse {
  --max-collapse-height: 100vh;
  padding: 28px;
  border-radius: 24px;
  width: 100%;

  &--secondary {
    background-color: #f0f6ff;
  }

  &:has(.active) {
    background-color: #FFFDF9;
  }

  @include tablet {
    padding: 20px;
  }
}

.base-collapse__trigger {
  @include button-reset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 12px;
  width: 100%;
  transition: $base-transition;

  &.active {
    .base-collapse__trigger-icon {
      transform: rotateX(180deg);
    }

    & + .base-collapse__content {
      max-height: var(--max-collapse-height);
      padding-top: 28px;

      @include tablet {
        padding-top: 20px;
      }
    }
  }

  @include hover {
    &:not(.active) {
      opacity: 0.7;
    }
  }
}

.base-collapse__trigger-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  transition: $base-transition;
  color: #21180A;
}

.base-collapse__title {
  font-size: 28px;
  font-weight: 400;
  line-height: 110%;
  font-family: $second-font-family;
  text-align: left;

  @include tablet {
    font-size: 20px;
  }
}

.base-collapse__content {
  max-height: 0;
  overflow: hidden;
  transition: $base-transition;
}

.base-collapse__text {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #21180ACC;

  @include tablet {
    font-size: 14px;
  }
}
</style>
