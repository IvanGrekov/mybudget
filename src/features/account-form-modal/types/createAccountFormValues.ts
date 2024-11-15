import { CreateAccountDto } from 'types/generated.types';

export type CreateAccountFormValues = Omit<CreateAccountDto, 'userId'>;
