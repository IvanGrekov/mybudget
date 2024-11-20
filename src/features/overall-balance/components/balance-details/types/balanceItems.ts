import { AccountCurrencyEnum } from 'types/generated.types';

export type TBalanceItems = Array<{
    balance: number;
    currency: AccountCurrencyEnum;
}>;

export interface IBalanceItemsCollection {
    [key: string]: TBalanceItems | undefined;
}
