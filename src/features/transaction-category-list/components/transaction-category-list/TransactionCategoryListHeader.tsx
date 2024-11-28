import ItemsLeftChip from 'components/items-left-chip/ItemsLeftChip';
import { MAX_TRANSACTION_CATEGORIES_PER_USER } from 'constants/maxTransactionCategoriesPerUser';
import CreateTransactionCategoryButton from 'features/transaction-category-form-modal/components/create-transaction-category-button/CreateTransactionCategoryButton';
import styles from 'styles/ItemList.module.scss';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

interface ITransactionCategoryListHeaderProps {
    currentItemsLength: number;
    type: TransactionCategoryTypeEnum;
}

export default function TransactionCategoryListHeader({
    currentItemsLength,
    type,
}: ITransactionCategoryListHeaderProps): JSX.Element {
    return (
        <div className={styles.header}>
            <ItemsLeftChip
                itemName="transaction category"
                currentItemsLength={currentItemsLength}
                maxItemsLength={MAX_TRANSACTION_CATEGORIES_PER_USER}
            />

            <CreateTransactionCategoryButton
                currentTransactionCategoriesLength={currentItemsLength}
                defaultTransactionCategoryType={type}
            />
        </div>
    );
}
