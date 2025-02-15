import ItemsLeftChip from 'components/items-left-chip/ItemsLeftChip';
import LinearProgress from 'components/linear-progress/LinearProgress';
import { MAX_ACCOUNTS_PER_USER } from 'constants/maxAccountPerUser';
import CreateAccountButton from 'features/account-form-modal/components/create-account-button/CreateAccountButton';
import styles from 'styles/ItemList.module.scss';
import { AccountTypeEnum } from 'types/generated.types';

interface IAccountListHeaderProps {
    currentAllItemsLength?: number;
    type: AccountTypeEnum;
}

export default function AccountListHeader({
    currentAllItemsLength,
    type,
}: IAccountListHeaderProps): JSX.Element {
    if (currentAllItemsLength === undefined) {
        return <LinearProgress />;
    }

    return (
        <div className={styles.header}>
            <ItemsLeftChip
                itemsName="accounts"
                currentItemsLength={currentAllItemsLength}
                maxItemsLength={MAX_ACCOUNTS_PER_USER}
            />

            <CreateAccountButton
                currentAccountsLength={currentAllItemsLength}
                defaultAccountType={type}
            />
        </div>
    );
}
