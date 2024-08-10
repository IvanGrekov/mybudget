import { getTranslations } from 'next-intl/server';

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
