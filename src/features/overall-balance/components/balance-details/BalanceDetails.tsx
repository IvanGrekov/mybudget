import EmptyState from 'components/empty-state/EmptyState';
import styles from 'features/overall-balance/components/balance-details/BalanceDetails.module.scss';
import BalanceItems from 'features/overall-balance/components/balance-details/BalanceItems';
import { getBalanceItemsCollectionByAccountTypes } from 'features/overall-balance/components/balance-details/utils/getBalanceItemsCollectionByAccountTypes';
import { useGetEmptyStateTranslations } from 'hooks/translations.hooks';
import { Account } from 'types/generated.types';

interface IBalanceDetailsProps {
    accounts: Account[];
}

export default function BalanceDetails({
    accounts,
}: IBalanceDetailsProps): JSX.Element {
    const balanceItemsCollection =
        getBalanceItemsCollectionByAccountTypes(accounts);

    const emptyStateTranslations = useGetEmptyStateTranslations();

    if (!Object.keys(balanceItemsCollection).length) {
        return <EmptyState text={emptyStateTranslations('empty_balance')} />;
    }

    return (
        <ul className={styles.list}>
            {Object.entries(balanceItemsCollection).map(
                ([title, balanceItems]) => {
                    if (!balanceItems?.length) {
                        return null;
                    }

                    return (
                        <li key={title} className={styles.items}>
                            <BalanceItems title={title} items={balanceItems} />
                        </li>
                    );
                },
            )}
        </ul>
    );
}
