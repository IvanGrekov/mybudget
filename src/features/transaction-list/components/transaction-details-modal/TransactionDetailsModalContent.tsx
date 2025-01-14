import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { ITransactionDetailsModalDataProps } from 'features/transaction-list/components/transaction-details-modal/types/transactionDetailsModalDataProps';

export default function TransactionDetailsModalContent({
    transaction,
}: ITransactionDetailsModalDataProps): JSX.Element {
    return (
        <>
            <UnderDevelopmentMessage />
            <div>TransactionDetails - {transaction.id}</div>
        </>
    );
}
