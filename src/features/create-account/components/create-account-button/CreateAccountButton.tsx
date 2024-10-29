import CreateItemButton from 'components/create-item-button/CreateItemButton';
import { MAX_ACCOUNTS_PER_USER } from 'constants/maxAccountPerUser';

interface ICreateAccountButtonProps {
    currentAccountsLength: number;
}

export default function CreateAccountButton({
    currentAccountsLength,
}: ICreateAccountButtonProps): JSX.Element {
    return (
        <CreateItemButton
            isDisabled={currentAccountsLength >= MAX_ACCOUNTS_PER_USER || true}
        />
    );
}
