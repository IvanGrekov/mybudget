import { SignInDto } from 'types/generated.types';

export interface ISignInFormValues extends SignInDto {
    isVerificationRequired?: boolean;
}
