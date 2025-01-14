import { EAppRoutes } from 'types/appRoutes';

type TGetFromToItemHref = (args: {
    id?: number;
    isCategory: boolean;
}) => string;

export const getFromToItemHref: TGetFromToItemHref = ({ id, isCategory }) => {
    return isCategory
        ? `${EAppRoutes.TransactionCategories}/${id}`
        : `${EAppRoutes.Accounts}/${id}`;
};
