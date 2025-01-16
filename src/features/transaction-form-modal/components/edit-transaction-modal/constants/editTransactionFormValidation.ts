import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TRANSACTION_DESCRIPTION_VALIDATION } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { EditTransactionDto } from 'types/generated.types';

export const EDIT_TRANSACTION_FORM_VALIDATION = yupResolver<EditTransactionDto>(
    yup.object().shape({
        description: TRANSACTION_DESCRIPTION_VALIDATION,
    }),
);
