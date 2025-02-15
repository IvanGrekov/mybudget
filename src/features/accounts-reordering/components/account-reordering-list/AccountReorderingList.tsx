'use client';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import DragDropContext from 'contexts/DragDropContext';
import AccountListTabs from 'features/account-list-tabs/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import AccountReorderingCard from 'features/accounts-reordering/components/account-reordering-card/AccountReorderingCard';
import AccountReorderingListHeader from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingListHeader';
import { useSortableAccounts } from 'features/accounts-reordering/components/account-reordering-list/hooks/useSortableAccounts';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import styles from 'styles/ItemList.module.scss';

export default function AccountReorderingList(): JSX.Element {
    const type = useAccountListCurrentTab();
    const {
        sortableItems,
        isGetAccountsLoading,
        isEditOrderLoading,
        handleDragEnd,
    } = useSortableAccounts(type);

    const entityNameTranslations = useGetEntityNameTranslations();

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
                    entityNameTranslations={entityNameTranslations}
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
                            <AccountReorderingCard
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
