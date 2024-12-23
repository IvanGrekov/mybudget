import { useFormContext } from 'react-hook-form';

import FormSelectField from 'components/form-fields/FormSelectField';
import LinearProgress from 'components/linear-progress/LinearProgress';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_NAMES,
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';
import { useGetTransactionCategories } from 'hooks/useGetTransactionCategories';

export default function ParentField(): JSX.Element {
    const { watch } = useFormContext<TCreateTransactionCategoryFormValues>();

    const type = watch('type');
    const { isLoading, transactionCategories } = useGetTransactionCategories(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        type,
    );

    const options = transactionCategories?.map(({ id }) => id);

    if (isLoading || !transactionCategories?.length || !options?.length) {
        return <LinearProgress />;
    }

    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.parentId}
            label={TRANSACTION_CATEGORY_FORM_FIELD_LABELS.parentId}
            options={options}
            isClearable={true}
            shouldAddSearch={true}
            getOptionLabel={(option) =>
                transactionCategories.find(({ id }) => id === option)?.name ||
                String(option)
            }
        />
    );
}
