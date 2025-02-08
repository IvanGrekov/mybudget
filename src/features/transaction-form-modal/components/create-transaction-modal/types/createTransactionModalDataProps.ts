import { Account, TransactionCategory } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

export interface ICreateTransactionModalDataProps {
    defaultAccount?: Maybe<Account>;
    defaultTransactionCategory?: Maybe<TransactionCategory>;
}
