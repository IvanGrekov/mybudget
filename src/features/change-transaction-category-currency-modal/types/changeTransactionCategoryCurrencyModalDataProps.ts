import { TransactionCategory } from 'types/generated.types';

export type TChangeTransactionCategoryCurrencyModalDataProps = Pick<
    TransactionCategory,
    'id' | 'currency' | 'type' | 'name'
>;
