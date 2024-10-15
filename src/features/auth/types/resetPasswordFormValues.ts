import { ResetPasswordDto } from 'types/generated.types';

export type TResetPasswordFormValues = Pick<ResetPasswordDto, 'email'> & {
    isVerificationCodeSent?: boolean;
    newPassword?: string;
    confirmNewPassword?: string;
    verificationCode?: string;
};
