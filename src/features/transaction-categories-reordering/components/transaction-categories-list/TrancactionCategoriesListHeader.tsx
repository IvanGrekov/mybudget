import BackButton from 'components/back-button/BackButton';
import HeaderChip from 'components/header-chip/HeaderChip';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

interface ITransactionCategoriesListProps {
    isBackButtonDisabled?: boolean;
}

export default function TransactionCategoriesListHeader({
    isBackButtonDisabled,
}: ITransactionCategoriesListProps): JSX.Element {
    return (
        <div className={styles.header}>
            <BackButton
                href={EAppRoutes.TransactionCategories}
                isDisabled={isBackButtonDisabled}
            />
            <HeaderChip title="Categories Reordering" />
        </div>
    );
}
