import { SortableContext } from '@dnd-kit/sortable';

import SubcategoryItem from 'features/transaction-categories-reordering/components/transaction-category-card/SubcategoryItem';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';
interface ISubcategoriesProps {
    parentId: number;
    subcategories: TransactionCategory[];
    isLoading: boolean;
}

export default function Subcategories({
    parentId,
    subcategories,
    isLoading,
}: ISubcategoriesProps): JSX.Element {
    return (
        <SortableContext items={subcategories} id={String(parentId)}>
            <ul className={styles.subcategories}>
                {subcategories.map((subcategory) => (
                    <SubcategoryItem
                        key={subcategory.id}
                        subcategory={subcategory}
                        isLoading={isLoading}
                    />
                ))}
            </ul>
        </SortableContext>
    );
}
