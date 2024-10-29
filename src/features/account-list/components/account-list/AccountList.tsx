'use client';

import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import AccountCard from 'features/account-list/components/account-card/AccountCard';
import styles from 'features/account-list/components/account-list/AccountList.module.scss';
import AccountListHeader from 'features/account-list/components/account-list/AccountListHeader';
import { useGetAccounts } from 'features/account-list/components/account-list/hooks/useGetAccounts';
import AccountListTabs from 'features/account-list/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list/hooks/useAccountListCurrentTab';

interface IAccountListProps {
    currentItemsLength: number;
}

export default function AccountList({
    currentItemsLength,
}: IAccountListProps): JSX.Element {
    const type = useAccountListCurrentTab();
    const { accounts, isLoading } = useGetAccounts(type);

    const isEmptyState = !accounts?.length;

    return (
        <div className={styles.container}>
            <AccountListHeader currentItemsLength={currentItemsLength} />

            <AccountListTabs />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState}>
                <EmptyState text={`No '${type}' accounts found`} />
            </Show>

            {!isEmptyState && (
                <ul className={styles.list}>
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
