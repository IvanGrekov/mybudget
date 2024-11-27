import CreateItemButton from 'components/create-item-button/CreateItemButton';
import { MAX_TRANSACTION_CATEGORIES_PER_USER } from 'constants/maxTransactionCategoriesPerUser';

interface ICreateTransactionCategoryButtonProps {
    currentTransactionCategoriesLength: number;
}

export default function CreateTransactionCategoryButton({
    currentTransactionCategoriesLength,
}: ICreateTransactionCategoryButtonProps): JSX.Element {
    return (
        <CreateItemButton
            isDisabled={
                currentTransactionCategoriesLength >=
                    MAX_TRANSACTION_CATEGORIES_PER_USER || true
            }
        />
    );
}
