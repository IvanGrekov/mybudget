import { SignUpDto } from 'types/generated.types';

export type TSignUpFormValues = Pick<
    SignUpDto,
    'email' | 'password' | 'nickname' | 'defaultCurrency' | 'timeZone'
> & {
    confirmPassword: string;
};
