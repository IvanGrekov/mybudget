import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import { IChipProps } from 'components/chip/types/chipProps';
import EmptyState from 'components/empty-state/EmptyState';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import Typography from 'components/typography/Typography';
import styles from 'features/account-details/components/account-details/AccountDetails.module.scss';
import AccountMenu from 'features/account-details/components/account-menu/AccountMenu';
import EntityTransactionList from 'features/transaction-list/components/entity-transaction-list/EntityTransactionList';
import {
    Account,
    AccountStatusEnum,
    AccountTypeEnum,
} from 'types/generated.types';
import { getColorForAccountTypeChip } from 'utils/getColorForAccountTypeChip';
import { roundValue } from 'utils/roundValue';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface IAccountDetailsProps {
    account: Account;
}

export default function AccountDetails({
    account,
}: IAccountDetailsProps): JSX.Element {
    const { status, balance, currency, type } = account;

    if (status === AccountStatusEnum.ARCHIVED) {
        return <EmptyState text="Account is archived" />;
    }

    const chips: IChipProps[] = [
        {
            title: getCapitalizedEnumValue(type),
            color: getColorForAccountTypeChip(type),
        },
        {
            title: `Currency: ${currency}`,
        },
    ];

    const isOweAccountType = [
        AccountTypeEnum.I_OWE,
        AccountTypeEnum.OWE_ME,
    ].includes(type);

    return (
        <>
            <Card>
                <CardHeader
                    shouldHideBorder={true}
                    title={
                        <div className={styles['header-title-wrapper']}>
                            <EntityChipList items={chips} />

                            <Typography variant="h6" element="h3">
                                {roundValue(balance)} {currency}
                            </Typography>
                        </div>
                    }
                    actions={<AccountMenu account={account} />}
                />
            </Card>

            <EntityTransactionList
                selectedAccount={account}
                considerToAsExpense={isOweAccountType}
                considerFromAsIncome={isOweAccountType}
            />
        </>
    );
}
