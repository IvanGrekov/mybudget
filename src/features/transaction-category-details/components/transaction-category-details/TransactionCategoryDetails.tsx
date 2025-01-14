import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';

interface ITransactionCategoryDetailsProps {
    transactionCategoryId: string;
}

export default function TransactionCategoryDetails({
    transactionCategoryId,
}: ITransactionCategoryDetailsProps): JSX.Element {
    return (
        <>
            <UnderDevelopmentMessage />
            <div>TransactionCategoryDetails - {transactionCategoryId}</div>
        </>
    );
}
