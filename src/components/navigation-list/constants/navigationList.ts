import { INavigationItem } from 'components/navigation-list/types/navigationItem';
import { EAppRoutes } from 'types/appRoutes';
import { EAppTitles } from 'types/appTitles';

export const NAVIGATION_LIST: INavigationItem[] = [
    {
        id: '0',
        text: 'Home',
        href: EAppRoutes.Root,
    },
    {
        id: '1',
        text: EAppTitles.Accounts,
        href: EAppRoutes.Accounts,
    },
    {
        id: '2',
        text: EAppTitles.TransactionCategories,
        href: EAppRoutes.TransactionCategories,
    },
];
