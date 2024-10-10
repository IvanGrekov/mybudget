import { EAppRoutes } from 'types/appRoutes';

export const getIsAuthPage = (pathname?: string | null): boolean => {
    if (!pathname) {
        return false;
    }

    return pathname.includes(EAppRoutes.Auth);
};
