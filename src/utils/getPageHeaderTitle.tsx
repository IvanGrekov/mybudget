import { getTranslations } from 'next-intl/server';

type TGetPageHeaderTitle = (args: {
    locale: string;
    pageName: string;
}) => Promise<string>;

export const getPageHeaderTitle: TGetPageHeaderTitle = async ({
    locale,
    pageName,
}) => {
    const t = await getTranslations({ locale, namespace: pageName });

    return t('title');
};
