import { EAppRoutes } from 'types/appRoutes';

type TGetIsNavItemActive = (args: {
    pathName: string;
    locale?: string;
    itemHref: string;
}) => boolean;

export const getIsNavItemActive: TGetIsNavItemActive = ({
    pathName,
    locale,
    itemHref,
}) => {
    const pathNameWithoutLocale = locale
        ? pathName.replace(`/${locale}`, '')
        : pathName;

    if (itemHref === EAppRoutes.Root) {
        return (pathNameWithoutLocale || '/') === EAppRoutes.Root;
    }

    return pathNameWithoutLocale.startsWith(itemHref);
};
