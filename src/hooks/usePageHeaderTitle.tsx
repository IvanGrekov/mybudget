import { useTranslations } from 'next-intl';

export const usePageHeaderTitle = (pageName: string): string => {
    const t = useTranslations(pageName);

    return t('title');
};
