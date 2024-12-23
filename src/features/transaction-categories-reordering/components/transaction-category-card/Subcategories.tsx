import { SortableContext } from '@dnd-kit/sortable';

import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import SubcategoryItem from 'features/transaction-categories-reordering/components/transaction-category-card/SubcategoryItem';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';

interface ISubcategoriesProps {
    subcategories: TransactionCategory[];
    isLoading?: boolean;
    isDragging?: boolean;
}

export default function Subcategories({
    subcategories,
    isLoading,
    isDragging,
}: ISubcategoriesProps): JSX.Element {
    return (
        <ul className={styles.subcategories}>
            {subcategories.map((subcategory) => {
                const { id } = subcategory;

                if (isDragging) {
                    return (
                        <SubcategoryItem key={id} subcategory={subcategory} />
                    );
                }

                return (
                    <DragDropListItem
                        key={id}
                        id={id}
                        isLoading={isLoading}
                        isChild={true}
                    >
                        <SubcategoryItem subcategory={subcategory} />
                    </DragDropListItem>
                );
            })}
        </ul>
    );
}

interface ISortableSubcategoriesProps
    extends Omit<ISubcategoriesProps, 'isDragging'> {
    parentId: number;
}

export function SortableSubcategories({
    parentId,
    subcategories,
    ...rest
}: ISortableSubcategoriesProps): JSX.Element {
    return (
        <SortableContext items={subcategories} id={String(parentId)}>
            <Subcategories subcategories={subcategories} {...rest} />
        </SortableContext>
    );
}
