import BackButton from 'components/back-button/BackButton';
import HeaderChip from 'components/header-chip/HeaderChip';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

interface ITransactionCategoriesReorderingListHeaderProps {
    isBackButtonDisabled?: boolean;
}

export default function TransactionCategoriesReorderingListHeader({
    isBackButtonDisabled,
}: ITransactionCategoriesReorderingListHeaderProps): JSX.Element {
    const type = useTransactionCategoryListCurrentTab();
    const [title] = useGetFeatureTranslations({
        featureName: 'ReorderTransactionCategoriesPage',
    });

    return (
        <div className={styles.header}>
            <BackButton
                href={`${EAppRoutes.TransactionCategories}?${TAB_PARAM_NAME}=${type}`}
                isDisabled={isBackButtonDisabled}
            />
            <HeaderChip title={title} />
        </div>
    );
}
