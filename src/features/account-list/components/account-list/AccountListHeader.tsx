import ItemsLeftChip from 'components/items-left-chip/ItemsLeftChip';
import { MAX_ACCOUNTS_PER_USER } from 'constants/maxAccountPerUser';
import CreateAccountButton from 'features/create-account/components/create-account-button/CreateAccountButton';
import styles from 'styles/ItemList.module.scss';

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
