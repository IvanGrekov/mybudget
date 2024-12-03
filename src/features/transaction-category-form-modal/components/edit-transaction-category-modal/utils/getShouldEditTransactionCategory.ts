import {
    TransactionCategory,
    EditTransactionCategoryDto,
} from 'types/generated.types';

type TGetShouldEditAccount = (args: {
    transactionCategory: TransactionCategory;
    data: EditTransactionCategoryDto;
}) => boolean;

export const getShouldEditTransactionCategory: TGetShouldEditAccount = ({
    transactionCategory: { status, name },
    data: { status: newStatus, name: newName },
}) => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status !== newStatus || name !== newName
    );
};
