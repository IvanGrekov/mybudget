import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ENTITY_ICON_NAME_VALIDATION } from 'constants/entityIcons.constants';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
    TRANSACTION_CATEGORY_NAME_VALIDATION,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import {
    EditTransactionCategoryDto,
    EditTransactionCategoryDtoStatusEnum,
} from 'types/generated.types';
import { getRequiredValidationWarning } from 'utils/formValidationWarning.utils';

export const EDIT_TRANSACTION_CATEGORY_FORM_VALIDATION =
    yupResolver<EditTransactionCategoryDto>(
        yup.object().shape({
            name: TRANSACTION_CATEGORY_NAME_VALIDATION,
            status: yup
                .mixed<EditTransactionCategoryDtoStatusEnum>()
                .oneOf(Object.values(EditTransactionCategoryDtoStatusEnum))
                .required(
                    getRequiredValidationWarning(
                        TRANSACTION_CATEGORY_FORM_FIELD_LABELS.status,
                    ),
                ),
            iconName: ENTITY_ICON_NAME_VALIDATION,
            iconColor: yup.string().nullable(),
        }),
    );
