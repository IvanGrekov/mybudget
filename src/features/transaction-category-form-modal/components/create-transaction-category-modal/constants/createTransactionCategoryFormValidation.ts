import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DEFAULT_MAX_LENGTH } from 'constants/formValidation.constants';
import { TRANSACTION_CATEGORY_FORM_FIELD_LABELS } from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';
import {
    CreateTransactionCategoryDtoTypeEnum,
    CreateTransactionCategoryDtoCurrencyEnum,
} from 'types/generated.types';
import {
    getMaxLengthValidationWarning,
    getRequiredValidationWarning,
} from 'utils/formValidationWarning.utils';

export const CREATE_TRANSACTION_CATEGORY_FORM_VALIDATION =
    yupResolver<TCreateTransactionCategoryFormValues>(
        yup.object().shape({
            name: yup
                .string()
                .max(
                    DEFAULT_MAX_LENGTH,
                    getMaxLengthValidationWarning(
                        TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name,
                    ),
                )
                .required(
                    getRequiredValidationWarning(
                        TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name,
                    ),
                ),
            type: yup
                .mixed<CreateTransactionCategoryDtoTypeEnum>()
                .oneOf(Object.values(CreateTransactionCategoryDtoTypeEnum))
                .required(
                    getRequiredValidationWarning(
                        TRANSACTION_CATEGORY_FORM_FIELD_LABELS.type,
                    ),
                ),
            currency: yup
                .mixed<CreateTransactionCategoryDtoCurrencyEnum>()
                .oneOf(Object.values(CreateTransactionCategoryDtoCurrencyEnum))
                .required(
                    getRequiredValidationWarning(
                        TRANSACTION_CATEGORY_FORM_FIELD_LABELS.currency,
                    ),
                ),
            parentId: yup.number().nullable(),
        }),
    );
