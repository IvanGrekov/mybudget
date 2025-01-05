import {
    CreateTransactionDto,
    CreateTransactionDtoTypeEnum,
    Account,
    TransactionCategory,
} from 'types/generated.types';
import { Maybe } from 'types/utility.types';

export type ICreateTransactionAccount = Pick<
    Account,
    'id' | 'name' | 'iconName' | 'iconColor' | 'balance' | 'currency'
>;

export type ICreateTransactionCategory = Pick<
    TransactionCategory,
    'id' | 'name' | 'iconName' | 'iconColor' | 'currency'
>;

export type TCreateTransactionFormValues = Omit<
    CreateTransactionDto,
    | 'userId'
    | 'type'
    | 'fromAccountId'
    | 'toAccountId'
    | 'fromCategoryId'
    | 'toCategoryId'
    | 'fee'
    | 'currencyRate'
    | 'description'
> & {
    type: CreateTransactionDtoTypeEnum | null;
    fromAccount?: Maybe<ICreateTransactionAccount>;
    toAccount?: Maybe<ICreateTransactionAccount>;
    fromCategory?: Maybe<ICreateTransactionCategory>;
    toCategory?: Maybe<ICreateTransactionCategory>;
    fee?: Maybe<number>;
    currencyRate?: Maybe<number>;
    description?: Maybe<string>;
};
