import { TransactionCategory } from 'types/generated.types';

export type TChangeCategoryCurrencyModalDataProps = Pick<
    TransactionCategory,
    'id' | 'currency' | 'type' | 'name'
>;
