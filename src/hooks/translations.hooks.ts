import { useTranslations } from 'next-intl';

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

export const useGetEntityNameTranslations = (): ReturnType<
    typeof useTranslations
> => {
    return useTranslations('EntityNames');
};
