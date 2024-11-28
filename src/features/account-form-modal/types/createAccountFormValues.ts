import { CreateAccountDto } from 'types/generated.types';

export type TCreateAccountFormValues = Omit<CreateAccountDto, 'userId'>;
