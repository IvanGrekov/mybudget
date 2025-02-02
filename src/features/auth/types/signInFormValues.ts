import { SignInDto } from 'types/generated.types';

export interface ISignInFormValues
    extends Pick<SignInDto, 'email' | 'password' | 'tfaToken'> {
    isVerificationRequired?: boolean;
}
