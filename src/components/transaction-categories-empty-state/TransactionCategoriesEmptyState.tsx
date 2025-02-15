import { useTranslations } from 'next-intl';

import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ITransactionCategoriesEmptyStateProps {
    entityNameTranslations: ReturnType<typeof useTranslations>;
    isSingleCategory?: boolean;
    categoriesType?: string;
    notWrappedByContainer?: boolean;
}

const TEXT = 'Transaction Categories not found';
const SINGLE_CATEGORY_TEXT = 'Transaction Category not found';

export default function TransactionCategoriesEmptyState({
    entityNameTranslations,
    isSingleCategory,
    categoriesType,
    notWrappedByContainer,
}: ITransactionCategoriesEmptyStateProps): JSX.Element {
    let text = isSingleCategory ? SINGLE_CATEGORY_TEXT : TEXT;

    if (categoriesType) {
        text = `No '${getCapitalizedEnumValue(
            categoriesType,
            entityNameTranslations,
        )}' transaction categories found`;
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
