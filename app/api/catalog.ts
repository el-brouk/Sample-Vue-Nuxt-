import type { Pagination } from '~/model/pagination';
import type { SelectedFilter } from '~/model/filter';
import type { ProductCard } from '~/model/product';

export interface ProductFilterRequest {
  page?: number;
  count?: number;
  filter?: SelectedFilter;
}

export interface CatalogResponse {
  list: ProductCard[];
  pagination: Pagination;
}
