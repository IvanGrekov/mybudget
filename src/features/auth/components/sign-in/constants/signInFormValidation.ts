import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    SIGN_IN_FORM_FIELD_NAMES,
    TFA_TOKEN_LABEL,
} from 'features/auth/constants/signInForm.constants';
import { ISignInFormValues } from 'features/auth/types/signInFormValues';
import {
    getRequiredValidationWarning,
    getMatchValidationWarning,
} from 'utils/formValidationWarning.utils';

export const SIGN_IN_FORM_VALIDATION = yupResolver<ISignInFormValues>(
    yup.object().shape({
        email: yup
            .string()
            .email(getMatchValidationWarning(SIGN_IN_FORM_FIELD_NAMES.email))
            .required(
                getRequiredValidationWarning(SIGN_IN_FORM_FIELD_NAMES.email),
            ),
        password: yup
            .string()
            .required(
                getRequiredValidationWarning(SIGN_IN_FORM_FIELD_NAMES.password),
            ),
        isVerificationRequired: yup.boolean(),
        tfaToken: yup
            .string()
            .when(
                SIGN_IN_FORM_FIELD_NAMES.isVerificationRequired,
                ([isVerificationRequired]) => {
                    if (isVerificationRequired) {
                        return yup
                            .string()
                            .required(
                                getRequiredValidationWarning(TFA_TOKEN_LABEL),
                            );
                    }

                    return yup
                        .string()
                        .transform((value) => value || undefined);
                },
            ),
    }),
);
