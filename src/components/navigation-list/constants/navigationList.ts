import { INavigationItem } from 'components/navigation-list/types/navigationItem';
import { EAppRoutes } from 'types/appRoutes';

export const NAVIGATION_LIST: INavigationItem[] = [
    {
        id: '0',
        href: EAppRoutes.Root,
    },
    {
        id: '1',
        href: EAppRoutes.Accounts,
    },
    {
        id: '2',
        href: EAppRoutes.TransactionCategories,
    },
    {
        id: '3',
        href: EAppRoutes.Settings,
    },
];
