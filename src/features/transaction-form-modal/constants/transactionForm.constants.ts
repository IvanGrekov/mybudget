import * as yup from 'yup';

import { DEFAULT_DESCRIPTION_MAX_LENGTH } from 'constants/formValidation.constants';
import { getMaxLengthValidationWarning } from 'utils/formValidationWarning.utils';

export const TRANSACTION_FORM_FIELD_NAMES = {
    type: 'type',
    fromAccount: 'fromAccount',
    toAccount: 'toAccount',
    fromCategory: 'fromCategory',
    toCategory: 'toCategory',
    value: 'value',
    fee: 'fee',
    currencyRate: 'currencyRate',
    description: 'description',
};

export const TRANSACTION_FORM_FIELD_LABELS = {
    type: 'Type',
    fromAccount: 'From Account',
    toAccount: 'To Account',
    fromCategory: 'From Category',
    toCategory: 'To Category',
    value: 'Value',
    fee: 'Fee',
    currencyRate: 'Currency Rate',
    description: 'Description',
};

export const TRANSACTION_DESCRIPTION_VALIDATION = yup
    .string()
    .max(
        DEFAULT_DESCRIPTION_MAX_LENGTH,
        getMaxLengthValidationWarning(
            TRANSACTION_FORM_FIELD_LABELS.description,
        ),
    );
