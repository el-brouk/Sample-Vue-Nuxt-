export interface FilterItem {
  code: string;
  iblockId: number;
  name: string;
  hint?: string;
  displayType: 'F' | 'P' | 'R';
  // F - checkboxes, P - dropdown list, R - range
  values: Array<FilterItemValue>;
  min?: number;
  max?: number;
}

export interface FilterItemValue {
  htmlValue: string;
  value: string;
  urlId: string;
  facetValue: string;
  count?: number;
  label?: string;
}

export interface SelectedFilter {
  [key: string]: string | string[] | { min?: number; max?: number };
}

export interface FilterItemRangeValue {
  min: number;
  max: number;
}
