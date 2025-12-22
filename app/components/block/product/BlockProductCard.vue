<script lang="ts" setup>
import type { ProductCard } from '~/model/product';
import { formatPriceShort } from '~/composables/usePrice';

const props = defineProps<{
  item: ProductCard;
  onLinkClick?: () => void;
}>();

function toggleFavorite() {}

function toggleComparison() {}
</script>
<template>
  <div class="product-card">
    <div class="product-card__top">
      <nuxt-link class="product-card__name" :to="`/catalog/${item.code}`">
        <div class="product-card__img">
          <img :src="item.picture ?? '/assets/img/empty-product.webp'" alt="" />
        </div>
      </nuxt-link>
      <div class="product-card__comparisons">
        <button
          class="product-card__btn"
          type="button"
          @click="toggleFavorite"
          aria-label="В избранное"
        >
          <BaseIcon icon="heart" :no-fill="true" />
        </button>
        <button
          class="product-card__btn"
          type="button"
          @click="toggleComparison"
          aria-label="В сравнение"
        >
          <BaseIcon icon="comparison" :no-fill="true" />
        </button>
      </div>
      <div class="product-card__controls hidden-sm">
        <BaseButton :size="'large'" isFull> В корзину </BaseButton>
      </div>
      <div class="product-card__controls visible-sm">
        <BaseButton icon aria-label="В корзину">
          <BaseIcon icon="cart" />
        </BaseButton>
      </div>
    </div>

    <div class="product-card__bottom">
      <div class="product-card__content">
        <nuxt-link class="product-card__name" :to="`/catalog/${item.code}`">
          {{ item.name }}
        </nuxt-link>
      </div>
      <div class="product-card__price-section">
        <div class="product-card__price-wrap">
          <p class="product-card__price">{{ formatPriceShort(item.price) }} ₽</p>
          <p class="product-card__price product-card__price--old" v-if="item.oldPrice">
            {{ formatPriceShort(item.oldPrice) }} ₽
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  gap: 20px;

  @include hover {
    .product-card__controls {
      opacity: 1;
      visibility: visible;
    }
  }
}

.product-card__top {
  position: relative;
  background-color: #eaeaea;
  width: 100%;
  aspect-ratio: 1/1;

  // @include tablet {
  //   height: 300px;
  // }
}

.product-card__comparisons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.product-card__btn {
  @include button-reset;

  :deep(.nuxt-icon) {
    @include size(24);
  }
}

.product-card__controls {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  opacity: 0;
  visibility: hidden;
  transition: $base-transition;

  @include tablet {
    opacity: 1;
    visibility: visible;
    bottom: 0;
    left: auto;
    right: 0;
  }
}

.product-card__img {
  overflow: hidden;
  background-color: #f1f1f1;
  object-position: center;

  img {
    @include contain-img;

    @include hover {
      transform: scale(1.1);
      transition: $base-transition;
    }
  }

  // @include tablet {
  //   height: 300px;
  // }
}

.product-card__bottom {
  display: flex;
  padding-right: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;

  @include tablet {
    gap: 16px;
  }
}

.product-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;

  @include tablet {
    gap: 12px;
    height: auto;
  }
}

.product-card__category {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  text-transform: uppercase;
}

.product-card__name {
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  min-height: 62px;

  @include tablet {
    font-size: 18px;
    min-height: 0;
  }
}

.product-card__price-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
}

.product-card__price-wrap {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
}

.product-card__price {
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  &--old {
    text-decoration-line: line-through;
    color: $gold;
  }

  @include tablet {
    font-size: 18px;
  }
}
</style>
