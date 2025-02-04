import ArrowIcon from 'components/icons/ArrowIcon';
import Show from 'components/show/Show';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import FromToTransactionDetailsItem from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetailsItem';
import {
    Transaction,
    TransactionTypeEnum,
    AccountStatusEnum,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

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
    const isFromEntityArchived =
        fromAccount?.status === AccountStatusEnum.ARCHIVED ||
        fromCategory?.status === TransactionCategoryStatusEnum.ARCHIVED;
    const isToEntityArchived =
        toAccount?.status === AccountStatusEnum.ARCHIVED ||
        toCategory?.status === TransactionCategoryStatusEnum.ARCHIVED;

    return (
        <div className={styles['from-to-details-wrapper']}>
            <Show when={!isBalanceCorrection}>
                <FromToTransactionDetailsItem
                    isArchived={isFromEntityArchived}
                    id={fromAccount?.id || fromCategory?.id}
                    isCategory={!!fromCategory}
                    iconName={fromAccount?.iconName || fromCategory?.iconName}
                    iconColor={
                        fromAccount?.iconColor || fromCategory?.iconColor
                    }
                    name={fromAccount?.name || fromCategory?.name}
                    shouldShowUpdatedBalances={shouldShowUpdatedBalances}
                    accountUpdatedBalance={fromAccountUpdatedBalance}
                    accountCurrency={fromAccount?.currency}
                />
            </Show>

            <Show when={!isBalanceCorrection}>
                <ArrowIcon wrapperClassName={styles['arrow-icon-wrapper']} />
            </Show>

            <FromToTransactionDetailsItem
                isArchived={isToEntityArchived}
                id={toAccount?.id || toCategory?.id}
                isCategory={!!toCategory}
                iconName={toAccount?.iconName || toCategory?.iconName}
                iconColor={toAccount?.iconColor || toCategory?.iconColor}
                name={toAccount?.name || toCategory?.name}
                shouldShowUpdatedBalances={
                    isBalanceCorrection ? false : shouldShowUpdatedBalances
                }
                accountUpdatedBalance={toAccountUpdatedBalance}
                accountCurrency={toAccount?.currency}
            />
        </div>
    );
}
