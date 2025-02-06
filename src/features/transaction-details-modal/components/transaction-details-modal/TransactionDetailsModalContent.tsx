import Divider from 'components/divider/Divider';
import FromToTransactionDetails from 'components/from-to-transaction-details/FromToTransactionDetails';
import Show from 'components/show/Show';
import TransactionCardAdditionalInfo from 'components/transaction-card-additional-info/TransactionCardAdditionalInfo';
import TransactionCardHeaderChips from 'components/transaction-card-header-chips/TransactionCardHeaderChips';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-details-modal/components/transaction-details-modal/TransactionDetailsModalContent.module.scss';
import { ITransactionDetailsModalDataProps } from 'features/transaction-details-modal/components/transaction-details-modal/types/transactionDetailsModalDataProps';
import { roundValue } from 'utils/roundValue';

export default function TransactionDetailsModalContent({
    transaction,
}: ITransactionDetailsModalDataProps): JSX.Element {
    const { createdAt, type, value, currency, description } = transaction;

    return (
        <>
            <TransactionCardHeaderChips createdAt={createdAt} type={type} />

            <Divider className={styles['description-divider']} />

            <div className={styles['value-wrapper']}>
                <Typography variant="h6" element="h3">
                    {`${roundValue(value)} ${currency}`}
                </Typography>

                <TransactionCardAdditionalInfo
                    transaction={transaction}
                    textVariant="body1"
                />
            </div>

            <Divider className={styles['description-divider']} />

            <FromToTransactionDetails
                transaction={transaction}
                shouldShowUpdatedBalances={true}
            />

            <Show when={!!description}>
                <Divider className={styles['description-divider']} />
                <Typography>{description}</Typography>
            </Show>
        </>
    );
}
