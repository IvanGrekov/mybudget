import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface IAccountsEmptyStateProps {
    isSingleAccount?: boolean;
    accountsType?: string;
    notWrappedByContainer?: boolean;
}

const TEXT = 'Accounts not found';
const SINGLE_ACCOUNT_TEXT = 'Account not found';

export default function AccountsEmptyState({
    isSingleAccount,
    accountsType,
    notWrappedByContainer,
}: IAccountsEmptyStateProps): JSX.Element {
    let text = isSingleAccount ? SINGLE_ACCOUNT_TEXT : TEXT;

    if (accountsType) {
        text = `No '${getCapitalizedEnumValue(accountsType)}' accounts found`;
    }

    if (notWrappedByContainer) {
        return <EmptyState text={text} />;
    }

    return (
        <Container>
            <EmptyState text={text} />
        </Container>
    );
}
