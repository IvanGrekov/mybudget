import { EditUserCurrencyDto } from 'types/generated.types';

export type TUserCurrencyFormData = Omit<EditUserCurrencyDto, 'rate'>;
