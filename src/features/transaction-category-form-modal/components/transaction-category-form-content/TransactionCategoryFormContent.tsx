import FormTextField from 'components/form-fields/FormTextField';
import Spacing from 'components/spacing/Spacing';
import CurrencyField from 'features/transaction-category-form-modal/components/transaction-category-form-content/CurrencyField';
import ParentField from 'features/transaction-category-form-modal/components/transaction-category-form-content/ParentField';
import TypeField from 'features/transaction-category-form-modal/components/transaction-category-form-content/TypeField';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_NAMES,
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import styles from 'styles/Form.module.scss';

interface ITransactionCategoryFormContentProps {}

export default function TransactionCategoryFormContent({}: ITransactionCategoryFormContentProps): JSX.Element {
    return (
        <div className={styles.container}>
            <TypeField />

            <FormTextField
                name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.name}
                label={TRANSACTION_CATEGORY_FORM_FIELD_LABELS.name}
                required={true}
            />

            <CurrencyField />

            <ParentField />

            <Spacing xs={60} />
        </div>
    );
}
