import FormTextField from 'components/form-fields/FormTextField';
import Show from 'components/show/Show';
import CurrencyField from 'features/transaction-category-form-modal/components/transaction-category-form-content/CurrencyField';
import IconColorField from 'features/transaction-category-form-modal/components/transaction-category-form-content/IconColorField';
import IconNameField from 'features/transaction-category-form-modal/components/transaction-category-form-content/IconNameField';
import ParentField from 'features/transaction-category-form-modal/components/transaction-category-form-content/ParentField';
import StatusField from 'features/transaction-category-form-modal/components/transaction-category-form-content/StatusField';
import TypeField from 'features/transaction-category-form-modal/components/transaction-category-form-content/TypeField';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_NAMES,
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import styles from 'styles/Form.module.scss';

interface ITransactionCategoryFormContentProps {
    isEdit?: boolean;
}

export default function TransactionCategoryFormContent({
    isEdit,
}: ITransactionCategoryFormContentProps): JSX.Element {
    return (
        <div className={styles.container}>
            <Show when={!!isEdit}>
                <StatusField />
            </Show>

            <Show when={!isEdit}>
                <TypeField />
            </Show>

            <FormTextField
                name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.name}
                label={TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name}
                required={true}
            />

            <Show when={!isEdit}>
                <CurrencyField />
            </Show>

            <Show when={!isEdit}>
                <ParentField />
            </Show>

            <IconNameField />

            <IconColorField />
        </div>
    );
}
