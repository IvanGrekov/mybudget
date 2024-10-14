import { CreateUserDto } from 'types/generated.types';

export type TSignUpFormValues = Pick<
    CreateUserDto,
    'email' | 'password' | 'nickname' | 'defaultCurrency' | 'timeZone'
> & {
    confirmPassword: string;
};
