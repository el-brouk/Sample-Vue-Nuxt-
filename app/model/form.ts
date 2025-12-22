export interface CheckboxItem {
  title: string,
  value: string,
  checked: boolean,
  icon?: string,
  tooltip?: string
  iconHover?: string
}

export interface SelectItem {
  id?: string | number | null
  value: string | number | null
  title: string
  text?: string
  description?: string
  count?: number
  icon?: string
  url?: string
}

export interface SchemaItem {
  as?: string,
  type?: string
  ref?: string
  placeholder?: string,
  label?: string,
  showLabel?: boolean,
  name?: string,
  mask?: string,
  icon?: string
  disabled?: boolean
  mark?: string
}
