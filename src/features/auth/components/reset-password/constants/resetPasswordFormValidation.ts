import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PASSWORD_MIN_LENGTH } from 'features/auth/constants/passwordMinLength';
import {
    RESET_PASSWORD_FORM_FIELD_NAMES,
    RESET_PASSWORD_FORM_FIELD_LABELS,
} from 'features/auth/constants/resetPasswordForm.constants';
import { TResetPasswordFormValues } from 'features/auth/types/resetPasswordFormValues';
import {
    getRequiredValidationWarning,
    getMatchValidationWarning,
    getMinLengthValidationWarning,
} from 'utils/formValidationWarning.utils';

export const RESET_PASSWORD_FORM_VALIDATION =
    yupResolver<TResetPasswordFormValues>(
        yup.object().shape({
            email: yup
                .string()
                .email(
                    getMatchValidationWarning(
                        RESET_PASSWORD_FORM_FIELD_LABELS.email,
                    ),
                )
                .required(
                    getRequiredValidationWarning(
                        RESET_PASSWORD_FORM_FIELD_LABELS.email,
                    ),
                ),
            isVerificationCodeSent: yup.boolean(),
            newPassword: yup
                .string()
                .when(
                    RESET_PASSWORD_FORM_FIELD_NAMES.isVerificationCodeSent,
                    ([isVerificationCodeSent]) => {
                        if (isVerificationCodeSent) {
                            return yup
                                .string()
                                .min(
                                    PASSWORD_MIN_LENGTH,
                                    getMinLengthValidationWarning(
                                        RESET_PASSWORD_FORM_FIELD_LABELS.newPassword,
                                        PASSWORD_MIN_LENGTH,
                                    ),
                                )
                                .required(
                                    getRequiredValidationWarning(
                                        RESET_PASSWORD_FORM_FIELD_LABELS.newPassword,
                                    ),
                                );
                        }

                        return yup
                            .string()
                            .transform((value) => value || undefined);
                    },
                ),
            confirmNewPassword: yup
                .string()
                .when(
                    RESET_PASSWORD_FORM_FIELD_NAMES.isVerificationCodeSent,
                    ([isVerificationCodeSent]) => {
                        if (isVerificationCodeSent) {
                            return yup
                                .string()
                                .required(
                                    getRequiredValidationWarning(
                                        RESET_PASSWORD_FORM_FIELD_LABELS.confirmNewPassword,
                                    ),
                                )
                                .oneOf(
                                    [
                                        yup.ref(
                                            RESET_PASSWORD_FORM_FIELD_NAMES.newPassword,
                                        ),
                                    ],
                                    'Passwords must match',
                                );
                        }

                        return yup
                            .string()
                            .transform((value) => value || undefined);
                    },
                ),
            verificationCode: yup
                .string()
                .when(
                    RESET_PASSWORD_FORM_FIELD_NAMES.isVerificationCodeSent,
                    ([isVerificationCodeSent]) => {
                        if (isVerificationCodeSent) {
                            return yup
                                .string()
                                .required(
                                    getRequiredValidationWarning(
                                        RESET_PASSWORD_FORM_FIELD_LABELS.verificationCode,
                                    ),
                                );
                        }

                        return yup
                            .string()
                            .transform((value) => value || undefined);
                    },
                ),
        }),
    );
