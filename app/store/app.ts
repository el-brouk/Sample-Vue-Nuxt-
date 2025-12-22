import type { BreadcrumbsItem } from '~/model/breadcrumbs';

export interface AppState {
  isDebug: boolean;
  breadcrumbs: BreadcrumbsItem[];
  isSearchActive: boolean;
  searchQuery: string;
}

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isDebug: false,
    breadcrumbs: [],
    isSearchActive: false,
    searchQuery: '',
  }),
  actions: {
    async setIsDebug(debug: boolean) {
      this.isDebug = debug;
    },
    setBreadcrumbs(list: Array<BreadcrumbsItem>) {
      this.breadcrumbs = [...list];
    },
    setIsSearchActive(state: boolean) {
      this.isSearchActive = state;
    },
    setSearchQuery(searchQuery: string) {
      this.searchQuery = searchQuery;
    },
  },
});

export default useAppStore;
