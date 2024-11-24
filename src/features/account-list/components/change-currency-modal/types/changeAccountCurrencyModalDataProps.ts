import { Account } from 'types/generated.types';

export type TChangeAccountCurrencyModalDataProps = Pick<
    Account,
    'id' | 'currency' | 'type' | 'name'
>;
