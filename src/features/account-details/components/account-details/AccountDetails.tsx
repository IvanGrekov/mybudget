import Card from 'components/card/Card';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import { IChipProps } from 'components/chip/types/chipProps';
import EmptyState from 'components/empty-state/EmptyState';
import EntityChipList from 'components/entity-chip-list/EntityChipList';
import TransactionsFilters from 'components/transactions-filters/TransactionsFilters';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import styles from 'features/account-details/components/account-details/AccountDetails.module.scss';
import { getColorForTypeChip } from 'features/account-details/components/account-details/utils/getColorForTypeChip';
import { Account, AccountStatusEnum } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';
import { getCapitalizedString } from 'utils/string.utils';

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
            title: getCapitalizedString(type, '_'),
            color: getColorForTypeChip(type),
        },
    ];

    return (
        <>
            <UnderDevelopmentMessage />

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
                    // actions={
                    //     <BaseEntityMenu
                    //         detailsPath={`${EAppRoutes.Accounts}/${id}`}
                    //         openEditModal={openEditAccountModal}
                    //         openChangeCurrencyModal={openChangeCurrencyModal}
                    //         openDeleteModal={openDeleteModal}
                    //     />
                    // }
                />
            </Card>

            <TransactionsFilters selectedAccountId={id} />
        </>
    );
}
