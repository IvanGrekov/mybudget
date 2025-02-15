import { useTranslations } from 'next-intl';

import { TTranslations } from 'types/translations';

type TUseGetFeatureTranslations = (args: {
    featureName: string;
    keys?: string[];
}) => string[];

export const useGetFeatureTranslations: TUseGetFeatureTranslations = ({
    featureName,
    keys,
}) => {
    const t = useTranslations(featureName);

    return keys ? keys.map((key) => t(key)) : [t('title')];
};

export const useGetEntityNameTranslations = (): TTranslations => {
    return useTranslations('EntityNames');
};

export const useGetEmptyStateTranslations = (): TTranslations => {
    return useTranslations('EmptyState');
};

export const useGetSettingsTranslations = (): TTranslations => {
    return useTranslations('SettingsPage');
};

export const useGetActionButtonsTranslations = (): TTranslations => {
    return useTranslations('ActionButtons');
};
