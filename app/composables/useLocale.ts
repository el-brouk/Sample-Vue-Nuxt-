export function pickByLocale<T extends Record<string, any>>(map: T): T[keyof T] {
  const { locale } = useI18n();
  return map[locale.value] ?? Object.values(map)[0];
}
