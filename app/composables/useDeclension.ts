export function declension(forms: Array<string>, val: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = val % 100 > 4 && val % 100 < 20 ? 2 : cases[val % 10 < 5 ? val % 10 : 5];
  return forms[index];
}

export function declensionMonths(count: number) {
  return count + ' ' + declension(['месяц', 'месяца', 'месяцев'], count);
}

export function declensionProducts(count: number) {
  return count + ' ' + declension(['товар', 'товара', 'товаров'], count);
}
