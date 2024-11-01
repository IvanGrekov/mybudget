import ItemsLeftChip from 'components/items-left-chip/ItemsLeftChip';
import { MAX_TRANSACTION_CATEGORIES_PER_USER } from 'constants/maxTransactionCategoriesPerUser';
import CreateTransactionCategoryButton from 'features/create-transaction-category/components/create-transaction-category-button/CreateTransactionCategoryButton';
import styles from 'styles/ItemList.module.scss';

interface ITransactionCategoryListHeaderProps {
    currentItemsLength: number;
}

export default function TransactionCategoryListHeader({
    currentItemsLength,
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
            />
        </div>
    );
}
