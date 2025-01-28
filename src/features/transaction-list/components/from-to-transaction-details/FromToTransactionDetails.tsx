import EntityIcon from 'components/entity-icon/EntityIcon';
import ArrowIcon from 'components/icons/ArrowIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import UpdatedBalanceDetails from 'features/transaction-list/components/from-to-transaction-details/UpdatedBalanceDetails';
import { getFromToItemHref } from 'features/transaction-list/components/from-to-transaction-details/utils/getFromToItemHref';
import { Transaction } from 'types/generated.types';

interface IFromToTransactionDetailsProps {
    transaction: Transaction;
    shouldShowUpdatedBalances?: boolean;
}

export default function FromToTransactionDetails({
    transaction,
    shouldShowUpdatedBalances,
}: IFromToTransactionDetailsProps): JSX.Element {
    const {
        fromAccount,
        fromAccountUpdatedBalance,
        fromCategory,
        toAccount,
        toAccountUpdatedBalance,
        toCategory,
    } = transaction;

    const fromEntityIconName = fromAccount?.iconName || fromCategory?.iconName;
    const fromEntityIconColor =
        fromAccount?.iconColor || fromCategory?.iconColor;
    const fromEntityName = fromAccount?.name || fromCategory?.name;
    const fromAccountCurrency = fromAccount?.currency;

    const toEntityIconName = toAccount?.iconName || toCategory?.iconName;
    const toEntityIconColor = toAccount?.iconColor || toCategory?.iconColor;
    const toEntityName = toAccount?.name || toCategory?.name;
    const toAccountCurrency = toAccount?.currency;

    return (
        <div className={styles['from-to-details-wrapper']}>
            <Link
                href={getFromToItemHref({
                    id: fromAccount?.id || fromCategory?.id,
                    isCategory: !!fromCategory,
                })}
                target="_blank"
                className={styles['from-to-item-details-wrapper']}
            >
                <div className={styles['from-to-entity-details']}>
                    <EntityIcon
                        iconName={fromEntityIconName}
                        iconColor={fromEntityIconColor}
                        isCategory={!!fromCategory}
                        size={EIconSizes.medium}
                    />
                    <Typography variant="subtitle2">
                        {fromEntityName}
                    </Typography>
                </div>

                {shouldShowUpdatedBalances &&
                    !!fromAccountUpdatedBalance &&
                    !!fromAccountCurrency && (
                        <UpdatedBalanceDetails
                            value={fromAccountUpdatedBalance}
                            currency={fromAccountCurrency}
                        />
                    )}
            </Link>

            <ArrowIcon wrapperClassName={styles['arrow-icon-wrapper']} />

            <Link
                href={getFromToItemHref({
                    id: toAccount?.id || toCategory?.id,
                    isCategory: !!toCategory,
                })}
                className={styles['from-to-item-details-wrapper']}
            >
                <div className={styles['from-to-entity-details']}>
                    <EntityIcon
                        iconName={toEntityIconName}
                        iconColor={toEntityIconColor}
                        isCategory={!!toCategory}
                        size={EIconSizes.medium}
                    />
                    <Typography variant="subtitle2">{toEntityName}</Typography>
                </div>

                {shouldShowUpdatedBalances &&
                    !!toAccountUpdatedBalance &&
                    !!toAccountCurrency && (
                        <UpdatedBalanceDetails
                            value={toAccountUpdatedBalance}
                            currency={toAccountCurrency}
                        />
                    )}
            </Link>
        </div>
    );
}
