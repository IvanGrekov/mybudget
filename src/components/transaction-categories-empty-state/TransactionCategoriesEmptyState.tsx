import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { TTranslations } from 'types/translations';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ITransactionCategoriesEmptyStateProps {
    emptyStateTranslations: TTranslations;
    entityNameTranslations: TTranslations;
    isSingleCategory?: boolean;
    categoriesType?: string;
    notWrappedByContainer?: boolean;
}

export default function TransactionCategoriesEmptyState({
    emptyStateTranslations,
    entityNameTranslations,
    isSingleCategory,
    categoriesType,
    notWrappedByContainer,
}: ITransactionCategoriesEmptyStateProps): JSX.Element {
    const singleCategoryText = emptyStateTranslations(
        'single_transaction_category_not_found',
    );
    const multipleCategoriesText = emptyStateTranslations(
        'transaction_categories_not_found',
    );
    let text = isSingleCategory ? singleCategoryText : multipleCategoriesText;

    if (categoriesType) {
        text = `'${getCapitalizedEnumValue(
            categoriesType,
            entityNameTranslations,
        )}' ${multipleCategoriesText}`;
    }

    if (notWrappedByContainer) {
        return <EmptyState text={text} />;
    }

    return (
        <Container>
            <EmptyState text={text} />
        </Container>
    );
}
