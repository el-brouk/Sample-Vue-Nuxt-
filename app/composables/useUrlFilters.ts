import type { SelectedFilter } from '~/model/filter';

export function useUrlFilters() {
  const route = useRoute();
  const router = useRouter();

  function getFiltersFromUrl(): SelectedFilter {
    const urlFilters: SelectedFilter = {};

    const queryParams = route.query;

    for (const [key, value] of Object.entries(queryParams)) {
      if (key.startsWith('filter[')) {
        // Match patterns like:
        // filter[KEY][] -> array
        // filter[KEY][min] or filter[KEY][max] -> object with min/max
        // filter[KEY][0] -> array index
        const match = key.match(/filter\[(.*?)\](?:\[(min|max|\d+)\])?/);
        if (!match) continue;

        const filterName = match[1];
        const subKey = match[2]; // 'min', 'max', array index, or undefined

        // Handle object format (min/max for salary filters)
        if (subKey === 'min' || subKey === 'max') {
          if (
            !urlFilters[filterName] ||
            typeof urlFilters[filterName] !== 'object' ||
            Array.isArray(urlFilters[filterName])
          ) {
            urlFilters[filterName] = {} as { min?: number; max?: number };
          }
          const objValue = urlFilters[filterName] as { min?: number; max?: number };
          const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
          if (!isNaN(numValue)) {
            objValue[subKey] = numValue;
          }
        }
        // Handle array format
        else if (subKey !== undefined) {
          // Array index
          const arrayIndex = parseInt(subKey);
          if (!isNaN(arrayIndex)) {
            if (!Array.isArray(urlFilters[filterName])) urlFilters[filterName] = [];
            (urlFilters[filterName] as string[]).push(value as string);
          }
        }
        // Handle filter[KEY][] format (array)
        else {
          if (Array.isArray(value)) {
            urlFilters[filterName] = value;
          } else {
            urlFilters[filterName] = value as string;
          }
        }
      }
    }

    // Normalize non-object filters to arrays (legacy behavior)
    const normalized: SelectedFilter = Object.fromEntries(
      Object.entries(urlFilters).map(([k, v]) => {
        // If it's an object with min/max, keep it as is
        if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
          return [k, v as { min?: number; max?: number }];
        }
        // If it's already an array, ensure it's string[]
        if (Array.isArray(v)) {
          return [k, v as string[]];
        }
        // If it's a string, convert to array
        return [k, [v as string]];
      })
    );
    return normalized;
  }

  function applyFiltersToUrl(filters: SelectedFilter) {
    const query = { ...route.query };

    // const preserveParams = ['page']
    const newQuery: Record<string, any> = {};

    // preserveParams.forEach(param => {
    //   if (query[param]) {
    //     newQuery[param] = query[param]
    //   }
    // })

    Object.keys(filters).forEach((code) => {
      const values = filters[code];

      // Handle salary filters (objects with min/max)
      if (typeof values === 'object' && values !== null && !Array.isArray(values)) {
        const objValue = values as { min?: number; max?: number };
        if (objValue.min !== undefined) {
          newQuery[`filter[${code}][min]`] = objValue.min.toString();
        }
        if (objValue.max !== undefined) {
          newQuery[`filter[${code}][max]`] = objValue.max.toString();
        }
      } else if (Array.isArray(values) && values.length > 0) {
        // Handle array filters
        newQuery[`filter[${code}][]`] = values.map((val) => val.toString());
      } else if (values !== undefined && values !== null) {
        // Handle single values by converting to array
        newQuery[`filter[${code}][]`] = [values.toString()];
      }
    });

    router.replace({ query: newQuery });
  }

  function clearFiltersFromUrl() {
    // const preserveParams = ['page']
    const newQuery: Record<string, any> = {};
    newQuery.page = '1';

    // preserveParams.forEach(param => {
    //   if (route.query[param]) {
    //     newQuery[param] = route.query[param]
    //   }
    // })

    router.replace({ query: newQuery });
  }

  function getPageFromUrl(): number | null {
    const page = route.query.page;
    return page ? parseInt(page as string) : 1;
  }

  function applyPageToUrl(page: number) {
    const query = { ...route.query };
    query.page = page.toString();

    router.replace({ query });
  }

  function hasFiltersInUrl(): boolean {
    const queryParams = route.query;
    const serviceParams = ['page'];

    return Object.keys(queryParams).some((key) => !serviceParams.includes(key));
  }

  return {
    getFiltersFromUrl,
    applyFiltersToUrl,
    clearFiltersFromUrl,
    hasFiltersInUrl,
    getPageFromUrl,
    applyPageToUrl,
  };
}
