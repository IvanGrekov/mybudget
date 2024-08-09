interface ITransactionCategoryDetailsProps {
    transactionCategoryId: string;
}

export default function TransactionCategoryDetails({
    transactionCategoryId,
}: ITransactionCategoryDetailsProps): JSX.Element {
    return <div>TransactionCategoryDetails - {transactionCategoryId}</div>;
}
