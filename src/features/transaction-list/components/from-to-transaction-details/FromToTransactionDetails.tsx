import EntityIcon from 'components/entity-icon/EntityIcon';
import ArrowIcon from 'components/icons/ArrowIcon';
import { EIconSizes } from 'components/icons/types/iconSizes';
import Link from 'components/link/Link';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import UpdatedBalanceDetails from 'features/transaction-list/components/from-to-transaction-details/UpdatedBalanceDetails';
import { getFromToItemHref } from 'features/transaction-list/components/from-to-transaction-details/utils/getFromToItemHref';
import { Transaction, TransactionTypeEnum } from 'types/generated.types';

interface IFromToTransactionDetailsProps {
    transaction: Transaction;
    shouldShowUpdatedBalances?: boolean;
}

export default function FromToTransactionDetails({
    transaction,
    shouldShowUpdatedBalances,
}: IFromToTransactionDetailsProps): JSX.Element {
    const {
        type,
        fromAccount,
        fromAccountUpdatedBalance,
        fromCategory,
        toAccount,
        toAccountUpdatedBalance,
        toCategory,
    } = transaction;

    const isBalanceCorrection = type === TransactionTypeEnum.BALANCE_CORRECTION;

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
            <Show when={!isBalanceCorrection}>
                <div className={styles['from-to-item-link-wrapper']}>
                    <Link
                        href={getFromToItemHref({
                            id: fromAccount?.id || fromCategory?.id,
                            isCategory: !!fromCategory,
                        })}
                        target="_blank"
                        className={styles['from-to-item-link']}
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
                    </Link>

                    {shouldShowUpdatedBalances &&
                        typeof fromAccountUpdatedBalance === 'number' &&
                        !!fromAccountCurrency && (
                            <UpdatedBalanceDetails
                                value={fromAccountUpdatedBalance}
                                currency={fromAccountCurrency}
                            />
                        )}
                </div>
            </Show>

            <Show when={!isBalanceCorrection}>
                <ArrowIcon wrapperClassName={styles['arrow-icon-wrapper']} />
            </Show>

            <div className={styles['from-to-item-link-wrapper']}>
                <Link
                    href={getFromToItemHref({
                        id: toAccount?.id || toCategory?.id,
                        isCategory: !!toCategory,
                    })}
                    className={styles['from-to-item-link']}
                >
                    <div className={styles['from-to-entity-details']}>
                        <EntityIcon
                            iconName={toEntityIconName}
                            iconColor={toEntityIconColor}
                            isCategory={!!toCategory}
                            size={EIconSizes.medium}
                        />
                        <Typography variant="subtitle2">
                            {toEntityName}
                        </Typography>
                    </div>
                </Link>

                {(isBalanceCorrection ? false : shouldShowUpdatedBalances) &&
                    typeof toAccountUpdatedBalance === 'number' &&
                    !!toAccountCurrency && (
                        <UpdatedBalanceDetails
                            value={toAccountUpdatedBalance}
                            currency={toAccountCurrency}
                        />
                    )}
            </div>
        </div>
    );
}
