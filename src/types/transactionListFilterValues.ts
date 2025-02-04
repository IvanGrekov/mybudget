import { TTransactionTypesInput } from 'types/availableTransactionTypes';

export interface ITransactionListFilterValues {
    types: TTransactionTypesInput;
    isDefaultTypesSelected?: boolean;
    accountId?: number;
    categoryId?: number;
    from?: string;
    to?: string;
}
