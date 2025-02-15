import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { TTranslations } from 'types/translations';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface IAccountsEmptyStateProps {
    emptyStateTranslations: TTranslations;
    entityNameTranslations: TTranslations;
    isSingleAccount?: boolean;
    accountsType?: string;
    notWrappedByContainer?: boolean;
}

export default function AccountsEmptyState({
    emptyStateTranslations,
    entityNameTranslations,
    isSingleAccount,
    accountsType,
    notWrappedByContainer,
}: IAccountsEmptyStateProps): JSX.Element {
    const singleAccountText = emptyStateTranslations(
        'single_account_not_found',
    );
    const multiple_accounts_text = emptyStateTranslations('accounts_not_found');
    let text = isSingleAccount ? singleAccountText : multiple_accounts_text;

    if (accountsType) {
        text = `'${getCapitalizedEnumValue(
            accountsType,
            entityNameTranslations,
        )}' ${multiple_accounts_text}`;
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
