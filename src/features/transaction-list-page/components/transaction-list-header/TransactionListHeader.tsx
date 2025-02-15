import HeaderChip from 'components/header-chip/HeaderChip';
import CreateTransactionButton from 'features/transaction-form-modal/components/create-transaction-button/CreateTransactionButton';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import styles from 'styles/ItemList.module.scss';

interface ITransactionListHeaderProps {
    refetchTransactionList: VoidFunction;
}

export default function TransactionListHeader({
    refetchTransactionList,
}: ITransactionListHeaderProps): JSX.Element {
    const [title] = useGetFeatureTranslations({
        featureName: 'Transactions',
    });

    return (
        <div className={styles.header}>
            <HeaderChip title={title} />

            <CreateTransactionButton
                refetchTransactionList={refetchTransactionList}
            />
        </div>
    );
}
