import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { LOCALES } from 'constants/locales';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!LOCALES.includes(locale)) {
        notFound();
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
