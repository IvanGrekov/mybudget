import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import { IChipProps } from 'components/chip/types/chipProps';
import EmptyState from 'components/empty-state/EmptyState';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import styles from 'features/account-details/components/account-details/AccountDetails.module.scss';
import AccountMenu from 'features/account-details/components/account-menu/AccountMenu';
import EntityTransactionList from 'features/transaction-list/components/entity-transaction-list/EntityTransactionList';
import { Account, AccountStatusEnum } from 'types/generated.types';
import { getColorForAccountTypeChip } from 'utils/getColorForAccountTypeChip';
import { roundValue } from 'utils/roundValue';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface IAccountDetailsProps {
    account: Account;
}

export default function AccountDetails({
    account,
}: IAccountDetailsProps): JSX.Element {
    const { id, status, balance, currency, type } = account;

    if (status === AccountStatusEnum.ARCHIVED) {
        return <EmptyState text="Account is archived" />;
    }

    const chips: IChipProps[] = [
        {
            title: getCapitalizedEnumValue(type),
            color: getColorForAccountTypeChip(type),
        },
    ];

    return (
        <>
            <Card>
                <CardHeader
                    shouldHideBorder={true}
                    title={
                        <div className={styles['header-title-wrapper']}>
                            <EntityChipList items={chips} />

                            <CardTitle
                                title={`Balance: ${roundValue(
                                    balance,
                                )} ${currency}`}
                                titleVariant="h6"
                            />
                        </div>
                    }
                    actions={<AccountMenu account={account} />}
                />
            </Card>

            <EntityTransactionList selectedAccountId={id} />
        </>
    );
}
