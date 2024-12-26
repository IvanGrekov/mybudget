import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ENTITY_ICON_NAME_VALIDATION } from 'constants/entityIcons.constants';
import {
    ACCOUNT_FORM_FIELD_LABELS,
    ACCOUNT_NAME_VALIDATION,
    ACCOUNT_BALANCE_VALIDATION,
} from 'features/account-form-modal/constants/accountForm.constants';
import {
    EditAccountDto,
    EditAccountDtoStatusEnum,
} from 'types/generated.types';
import { getRequiredValidationWarning } from 'utils/formValidationWarning.utils';

export const EDIT_ACCOUNT_FORM_VALIDATION = yupResolver<EditAccountDto>(
    yup.object().shape({
        status: yup
            .mixed<EditAccountDtoStatusEnum>()
            .oneOf(Object.values(EditAccountDtoStatusEnum))
            .required(
                getRequiredValidationWarning(ACCOUNT_FORM_FIELD_LABELS.status),
            ),
        name: ACCOUNT_NAME_VALIDATION,
        balance: ACCOUNT_BALANCE_VALIDATION,
        shouldHideFromOverallBalance: yup.boolean(),
        shouldShowAsIncome: yup.boolean(),
        shouldShowAsExpense: yup.boolean(),
        iconName: ENTITY_ICON_NAME_VALIDATION,
        iconColor: yup.string(),
    }),
);
