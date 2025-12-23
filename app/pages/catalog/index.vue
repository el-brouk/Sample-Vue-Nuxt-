<script lang="ts" setup>
import type { Pagination } from '~/model/pagination';
import type { ProductFilterRequest } from '~/api/catalog';
import useCatalogStore from '~/store/catalog';

const { t } = useI18n();
definePageMeta({
  auth: false,
  layout: 'default',
});

const { isMobile } = useDevice();
const route = useRoute();
const urlFiltersHelper = useUrlFilters();
const pageStore = useCatalogStore();

const initialFilters = ref(urlFiltersHelper.getFiltersFromUrl());
const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const isMobileFiltersOpen = ref(false);

const products = computed(() => pageStore.data.productsList || []);
const filters = computed(() => pageStore.data.filters || []);
const pagination = computed(() => ({
  ...pageStore.data.pagination,
  page: currentPage.value,
}));

const query = computed(() => ({
  page: currentPage.value,
  count: pagination.value.count,
  ...(Object.keys(initialFilters.value).length > 0 && { filter: initialFilters.value }),
}));

function handlePaginationPageChange(page: Pagination) {
  currentPage.value = page.page;
  urlFiltersHelper.applyPageToUrl(Number(currentPage.value));
  updateCatalog(query.value);
}

function openFilters() {
  isMobileFiltersOpen.value = true;
  document.body.classList.add('menu-opened');
}

function closeFilters() {
  isMobileFiltersOpen.value = false;
  document.body.classList.remove('menu-opened');
}

async function updateCatalog(q: ProductFilterRequest) {
  if (q.page) {
    currentPage.value = q.page;
  } else {
    currentPage.value = 1;
  }
  await pageStore.getProductsList(q);
}

function checkIfMobile() {
  if (isMobile) isMobileFiltersOpen.value = false;
}

onBeforeMount(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIfMobile);
});

// 1️⃣ SSR + CSR-safe fetch
onServerPrefetch(async () => {
  await fetchProducts();
});

// 2️⃣ Client fallback (if SSR skipped or payload empty)
onMounted(async () => {
  if (!pageStore.data.productsList?.length) {
    await fetchProducts();
  }
});

// 3️⃣ Shared logic
async function fetchProducts() {
  try {
    if (Object.keys(initialFilters.value || {}).length > 0 || currentPage.value) {
      await pageStore.getCatalogFilters();
      await pageStore.getProductsList({
        page: currentPage.value,
        filter: initialFilters.value,
      });
    } else {
      await Promise.all([pageStore.getCatalogFilters(), pageStore.getProductsList()]);
    }
  } catch (err) {
    console.error('Products fetch failed:', err);
  }
}
</script>
<template>
  <div class="catalog-page">
    <div class="base-container">
      <h1 class="page__title">{{ t('catalog.title') }}</h1>
      <div class="catalog-page__inner" v-if="products?.length">
        <aside class="catalog-page__filters hidden-tablet">
          <BlockCatalogFilters
            :filters="filters"
            :initialFilters="initialFilters"
            @updateCatalog="updateCatalog"
          />
        </aside>
        <aside class="catalog-page__filters visible-tablet" v-show="isMobileFiltersOpen">
          <BlockCatalogFilters
            :filters="filters"
            @close="closeFilters"
            @updateCatalog="updateCatalog"
          />
        </aside>
        <main class="catalog-page__content">
          <ul class="catalog-page__list">
            <li class="catalog-page__item" v-for="item in products" :key="item.id">
              <BlockProductCard :item="item" />
            </li>
          </ul>

          <BasePagination
            v-if="pagination && pagination?.countPages > 1"
            class="catalog-page__pagination"
            :pagination="pagination"
            @input="handlePaginationPageChange($event)"
          />
        </main>
      </div>
      <p v-else class="catalog-page__empty">{{ t('catalog.empty') }}</p>
    </div>
    <base-button class="catalog-page__filters-btn" type="button" @click="openFilters">
      {{ t('catalog.filters') }}
    </base-button>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.catalog-page {
  padding-bottom: 40px;
  padding-top: 24px;

  @include tablet-sm {
    padding-bottom: 96px;
  }
}

.catalog-page__inner {
  display: grid;
  grid-template-columns: 354px 1fr;
  gap: 32px;
  width: 100%;

  @include tablet-sm {
    grid-template-columns: 1fr;
  }
}

.catalog-page__filters {
  width: 100%;
  min-width: 0;

  @include tablet-sm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $white;
    z-index: 5;
    overflow-y: scroll;
    height: 100%;
  }
}

.catalog-page__content {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.catalog-page__list {
  @include list-reset;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;

  @include phone {
    grid-template-columns: 1fr;
  }
}

.catalog-page__filters-btn {
  display: none !important;
  // box-shadow: $base-box-shadow;
  color: $white;

  @include tablet-sm {
    @include centered('x');
    display: block !important;
    position: fixed;
    bottom: 24px;
  }
}

.catalog-page__empty {
  padding-block: 40px;
  text-align: center;
}
</style>
