'use client';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import Button from 'components/button/Button';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import AccountCard from 'features/account-list/components/account-card/AccountCard';
import AccountListHeader from 'features/account-list/components/account-list/AccountListHeader';
import AccountListTabs from 'features/account-list-tabs/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import { useGetAccounts } from 'hooks/useGetAccounts';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

export default function AccountList(): JSX.Element {
    const type = useAccountListCurrentTab();
    const { accounts, currentAllItemsLength, isLoading } = useGetAccounts(type);

    const isEmptyState = !accounts?.length;

    return (
        <div className={styles.container}>
            <AccountListHeader
                currentAllItemsLength={currentAllItemsLength}
                type={type}
            />

            <AccountListTabs />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <AccountsEmptyState
                    accountsType={type}
                    notWrappedByContainer={true}
                />
            </Show>

            {!isEmptyState && (
                <>
                    <ul className={styles.list}>
                        {accounts.map((account) => (
                            <li key={account.id}>
                                <AccountCard account={account} />
                            </li>
                        ))}
                    </ul>

                    <Button
                        text="Reorder accounts"
                        variant="contained"
                        href={EAppRoutes.AccountsReordering}
                        style={{ width: '100%' }}
                        linkClassName={styles.action}
                    />
                </>
            )}
        </div>
    );
}
