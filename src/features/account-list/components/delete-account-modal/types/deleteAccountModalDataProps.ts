import { Account } from 'types/generated.types';

export type TDeleteAccountModalDataProps = Pick<
    Account,
    'id' | 'type' | 'name'
>;
