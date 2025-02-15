import { enGB, uk } from 'date-fns/locale';

export const PRIMARY_LOCALE = 'en';
export const SECONDARY_LOCALE = 'ua';
export const LOCALES: [string, string] = [PRIMARY_LOCALE, SECONDARY_LOCALE];
export const DATE_FNS_LOCALES = new Map<string, Locale>([
    [PRIMARY_LOCALE, enGB],
    [SECONDARY_LOCALE, uk],
]);
