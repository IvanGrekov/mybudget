import { EAppRoutes } from 'types/appRoutes';

type TGetIsNavItemActive = (args: {
    pathName: string;
    itemHref: string;
}) => boolean;

export const getIsNavItemActive: TGetIsNavItemActive = ({
    pathName,
    itemHref,
}) => {
    if (itemHref === EAppRoutes.Root) {
        return pathName === EAppRoutes.Root;
    }

    return pathName.startsWith(itemHref);
};
