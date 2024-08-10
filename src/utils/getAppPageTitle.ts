import { getTranslations } from 'next-intl/server';

import { getAppPageMetadata } from 'utils/getAppPageMetadata';

type TGetAppPageTitle = (args: {
    locale: string;
    pageName: string;
}) => Promise<{
    title: string;
}>;

export const getAppPageTitle: TGetAppPageTitle = async ({
    locale,
    pageName,
}) => {
    const { title: appTitle } = await getAppPageMetadata(locale);
    const t = await getTranslations({ locale, namespace: pageName });
    const title = t('title');

    return { title: `${appTitle}${title ? ` - ${title}` : ''}` };
};
