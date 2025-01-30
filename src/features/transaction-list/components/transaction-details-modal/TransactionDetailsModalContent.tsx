import Divider from 'components/divider/Divider';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import FromToTransactionDetails from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails';
import HeaderChips from 'features/transaction-list/components/header-chips/HeaderChips';
import styles from 'features/transaction-list/components/transaction-details-modal/TransactionDetailsModalContent.module.scss';
import { ITransactionDetailsModalDataProps } from 'features/transaction-list/components/transaction-details-modal/types/transactionDetailsModalDataProps';
import { roundValue } from 'utils/roundValue';

export default function TransactionDetailsModalContent({
    transaction,
}: ITransactionDetailsModalDataProps): JSX.Element {
    const { createdAt, type, value, currency, fee, description } = transaction;

    return (
        <>
            <HeaderChips createdAt={createdAt} type={type} />

            <Divider className={styles['description-divider']} />

            <div className={styles['value-wrapper']}>
                <Typography variant="h6" element="h3">
                    {`${roundValue(value)} ${currency}`}
                </Typography>

                {fee && (
                    <Typography variant="body2" className={styles.fee}>
                        Fee: {`${roundValue(fee)} ${currency}`}
                    </Typography>
                )}
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
