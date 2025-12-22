import type { ProductCard } from '~/model/product';
import type { Pagination } from '~/model/pagination';
import type { FilterItem } from '~/model/filter';
import Qs from 'qs';
import type { ProductFilterRequest, CatalogResponse } from '~/api/catalog';
import { mockProducts } from '../../mockData/products';
import { mockFilters } from '../../mockData/filters';

export interface CatalogState {
  data: {
    productsList: ProductCard[];
    filters: FilterItem[];
    pagination: Pagination;
  };
}

const useCatalogStore = defineStore('catalog', {
  state: (): CatalogState => ({
    data: {
      productsList: [],
      filters: [],
      pagination: {} as Pagination,
    },
  }),
  getters: {},
  actions: {
    async getCatalogFilters() {
      // API request commented out, using mock data
      // const { data, error, status } = await useApiFetch<{ filters: FilterItem[] }>(
      //   `/api/app/vacancy/filter`
      // );
      // if (error.value) {
      //   console.error('Error fetching filters:', error.value);
      // }

      // if (data.value) {
      //   this.data.filters = data.value?.filters;
      // }

      // Using mock data
      this.data.filters = mockFilters;
    },

    async getProductsList(query?: ProductFilterRequest) {
      // API request commented out, using mock data
      // const normalizedQuery = {
      //   ...query,
      //   filter: Object.fromEntries(
      //     Object.entries(query?.filter || {}).map(([key, val]) => [
      //       key,
      //       // If value is already an object (not array), keep it as is for format like filter[key][min]
      //       // Otherwise, normalize to array for format like filter[key][]
      //       val !== null && typeof val === 'object' && !Array.isArray(val)
      //         ? val
      //         : Array.isArray(val)
      //         ? val
      //         : [val],
      //     ])
      //   ),
      // };

      // let str = Qs.stringify(normalizedQuery, { skipNulls: true, arrayFormat: 'brackets' });

      // const { data, error } = await useApiFetch<CatalogResponse>(
      //   `/api/app/vacancy/listFilter?` + str,
      //   {
      //     method: 'get',
      //   }
      // );

      // if (error.value) {
      //   console.error('Error fetching catalog:', error.value);
      // }
      // if (data.value) {
      //   this.data.productsList = data.value.list;
      //   this.data.pagination = data.value.pagination;
      // }

      // Using mock data with pagination support
      const page = query?.page || 1;
      const count = query?.count || 12;
      const totalProducts = mockProducts.length;
      const countPages = Math.ceil(totalProducts / count);
      const startIndex = (page - 1) * count;
      const endIndex = startIndex + count;
      const paginatedProducts = mockProducts.slice(startIndex, endIndex);

      this.data.productsList = paginatedProducts;
      this.data.pagination = {
        page,
        count,
        countPages,
        countElements: totalProducts,
      };
    },
  },
});

export default useCatalogStore;
