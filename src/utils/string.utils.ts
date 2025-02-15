import { useTranslations } from 'next-intl';

type TGetCapitalizedString = (string: string, separator?: string) => string;

export const getCapitalizedString: TGetCapitalizedString = (
    string,
    separator = ' ',
) => {
    const stringParts = string.split(separator);

    const capitalizedParts = stringParts.map((part) => {
        const firstChar = part.charAt(0);

        if ([',', '.', '-', "'", '"'].includes(firstChar)) {
            return (
                firstChar +
                part.charAt(1).toUpperCase() +
                part.slice(2).toLowerCase()
            );
        }

        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });

    return capitalizedParts.join(' ');
};

export const getCapitalizedEnumValue = (
    value: string,
    translations?: ReturnType<typeof useTranslations>,
): string => {
    if (translations) {
        return translations(value.toLowerCase());
    }

    return getCapitalizedString(value, '_');
};
