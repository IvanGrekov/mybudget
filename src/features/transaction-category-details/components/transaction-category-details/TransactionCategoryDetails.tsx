import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryDetailsProps {
    transactionCategory: TransactionCategory;
}

export default function TransactionCategoryDetails({
    transactionCategory,
}: ITransactionCategoryDetailsProps): JSX.Element {
    transactionCategory;

    return (
        <>
            <UnderDevelopmentMessage />
        </>
    );
}
