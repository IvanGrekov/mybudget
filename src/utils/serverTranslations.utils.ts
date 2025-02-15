import { getTranslations } from 'next-intl/server';

import { TTranslations } from 'types/translations';

type TGetAppPageMetadata = (locale: string) => Promise<{
    title: string;
    description: string;
}>;

export const getAppPageMetadata: TGetAppPageMetadata = async (locale) => {
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
};

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

type TGetPageTranslations = (args: {
    locale: string;
    pageName: string;
    keys?: string[];
}) => Promise<string[]>;

export const getPageTranslations: TGetPageTranslations = async ({
    locale,
    pageName,
    keys,
}) => {
    const t = await getTranslations({ locale, namespace: pageName });

    return keys ? keys.map((key) => t(key)) : [t('title')];
};

export const getEntityNameTranslations = (
    locale: string,
): Promise<TTranslations> => {
    return getTranslations({ locale, namespace: 'EntityNames' });
};

export const getEmptyStateTranslations = (
    locale: string,
): Promise<TTranslations> => {
    return getTranslations({ locale, namespace: 'EmptyState' });
};
