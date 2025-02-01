'use client';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import DragDropContext from 'contexts/DragDropContext';
import AccountListTabs from 'features/account-list-tabs/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import AccountCard from 'features/accounts-reordering/components/account-card/AccountCard';
import AccountReorderingListHeader from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingListHeader';
import { useSortableAccounts } from 'features/accounts-reordering/components/account-reordering-list/hooks/useSortableAccounts';
import styles from 'styles/ItemList.module.scss';

export default function AccountReorderingList(): JSX.Element {
    const type = useAccountListCurrentTab();
    const {
        sortableItems,
        isGetAccountsLoading,
        isEditOrderLoading,
        handleDragEnd,
    } = useSortableAccounts(type);
    const isEmptyState = !sortableItems.length;

    return (
        <div className={styles.container}>
            <AccountReorderingListHeader
                isBackButtonDisabled={isEditOrderLoading}
            />

            <AccountListTabs isDisabled={isEditOrderLoading} />

            <Show when={isGetAccountsLoading || isEditOrderLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isGetAccountsLoading}>
                <AccountsEmptyState
                    accountsType={type}
                    notWrappedByContainer={true}
                />
            </Show>

            {!isEmptyState && (
                <DragDropContext
                    items={sortableItems}
                    handleDragEnd={handleDragEnd}
                >
                    <ul className={styles['grid-list']}>
                        {sortableItems.map((account) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                isLoading={isEditOrderLoading}
                            />
                        ))}
                    </ul>
                </DragDropContext>
            )}
        </div>
    );
}
