const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

const monthsNominative = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export function getMonthByNumber(month: number) {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month number: ${month}. Month must be between 1 and 12.`);
  }
  return months[month - 1];
}

export function getMonthNominativeByNumber(month: number) {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month number: ${month}. Month must be between 1 and 12.`);
  }
  return monthsNominative[month - 1];
}

export function formatUnderstandableDateWithYear(dateObj: Date | string) {
  dateObj = dateByString(dateObj);

  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();

  if (month < 0 || month > 11) {
    throw new Error(`Invalid month index: ${month}. Month index must be between 0 and 11.`);
  }

  return date + ' ' + months[month] + ' ' + year + 'г';
}

export function formatUnderstandableDateTime(dateObj: Date | string) {
  dateObj = dateByString(dateObj);

  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes().toString().padStart(2, '0');

  if (month < 0 || month > 11) {
    throw new Error(`Invalid month index: ${month}. Month index must be between 0 and 11.`);
  }

  return date + ' ' + months[month] + ' ' + year + 'г' + ' . ' + hours + ':' + minutes;
}

export function formatDateWithYear(dateObj: Date | string) {
  dateObj = dateByString(dateObj);

  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();

  return (
    date.toString().padStart(2, '0') + '.' + (month + 1).toString().padStart(2, '0') + '.' + year
  );
}

export function dateByString(dateObj: Date | string) {
  return convertTZ(dateObj);
}

function normalizeDateString(dateStr: string): string {
  return dateStr.replace(/\./g, '-').replace(' ', 'T');
}

export function convertTZ(date: Date | string, tzString = 'Europe/Moscow') {
  if (typeof date === 'string') {
    date = normalizeDateString(date);
  }
  // Note: for real timezone conversion, use a library like date-fns-tz
  // Currently the function just normalizes the string and creates a Date object
  // The tzString parameter is kept for backward compatibility but not used
  return new Date(date);
}
