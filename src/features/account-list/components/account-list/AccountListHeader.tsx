import ItemsLeftChip from 'components/items-left-chip/ItemsLeftChip';
import { MAX_ACCOUNTS_PER_USER } from 'constants/maxAccountPerUser';
import styles from 'features/account-list/components/account-list/AccountList.module.scss';
import CreateAccountButton from 'features/create-account/components/create-account-button/CreateAccountButton';

interface IAccountListHeaderProps {
    currentItemsLength: number;
}

export default function AccountListHeader({
    currentItemsLength,
}: IAccountListHeaderProps): JSX.Element {
    return (
        <div className={styles.header}>
            <ItemsLeftChip
                itemName="account"
                currentItemsLength={currentItemsLength}
                maxItemsLength={MAX_ACCOUNTS_PER_USER}
            />

            <CreateAccountButton currentAccountsLength={currentItemsLength} />
        </div>
    );
}
