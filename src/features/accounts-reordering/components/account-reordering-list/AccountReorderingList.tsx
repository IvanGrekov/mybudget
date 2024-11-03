'use client';

import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import AccountListTabs from 'features/account-list-tabs/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import AccountCard from 'features/accounts-reordering/components/account-card/AccountCard';
import AccountReorderingListHeader from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingListHeader';
import { useGetAccounts } from 'hooks/useGetAccounts';
import styles from 'styles/ItemList.module.scss';

export default function AccountReorderingList(): JSX.Element {
    const type = useAccountListCurrentTab();
    const { accounts, isLoading } = useGetAccounts(type);

    const isEmptyState = !accounts?.length;

    return (
        <div className={styles.container}>
            <AccountReorderingListHeader />

            <AccountListTabs />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <EmptyState text={`No '${type}' accounts found`} />
            </Show>

            {!isEmptyState && (
                <ul className={styles['grid-list']}>
                    {accounts.map((account) => (
                        <li key={account.id}>
                            <AccountCard account={account} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
