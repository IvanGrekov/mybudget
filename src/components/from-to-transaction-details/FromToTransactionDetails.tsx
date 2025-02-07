import { useParams } from 'next/navigation';

import styles from 'components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import FromToTransactionDetailsItem from 'components/from-to-transaction-details/FromToTransactionDetailsItem';
import ArrowIcon from 'components/icons/ArrowIcon';
import Show from 'components/show/Show';
import {
    Transaction,
    TransactionTypeEnum,
    AccountStatusEnum,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { IWithIdParamProps } from 'types/pageProps';

interface IFromToTransactionDetailsProps {
    transaction: Transaction;
    shouldShowUpdatedBalances?: boolean;
}

export default function FromToTransactionDetails({
    transaction,
    shouldShowUpdatedBalances,
}: IFromToTransactionDetailsProps): JSX.Element {
    const { accountId, categoryId } = useParams<IWithIdParamProps['params']>();
    const entityIdFromParams = Number(accountId || categoryId || 0);

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

    const fromEntityId = fromAccount?.id || fromCategory?.id;
    const toEntityId = toAccount?.id || toCategory?.id;
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
                    isDisabled={isFromEntityArchived}
                    isActive={entityIdFromParams === fromEntityId}
                    id={fromEntityId}
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
                isDisabled={isToEntityArchived}
                isActive={entityIdFromParams === toEntityId}
                id={toEntityId}
                isCategory={!!toCategory}
                iconName={toAccount?.iconName || toCategory?.iconName}
                iconColor={toAccount?.iconColor || toCategory?.iconColor}
                name={toAccount?.name || toCategory?.name}
                shouldShowUpdatedBalances={shouldShowUpdatedBalances}
                accountUpdatedBalance={toAccountUpdatedBalance}
                accountCurrency={toAccount?.currency}
            />
        </div>
    );
}
