import { SortableContext } from '@dnd-kit/sortable';

import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import SubcategoryItem from 'features/transaction-categories-reordering/components/transaction-category-card/SubcategoryItem';
import styles from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard.module.scss';
import { TransactionCategory } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface ISubcategoriesProps {
    subcategories?: Maybe<TransactionCategory[]>;
    isLoading?: boolean;
    isDragging?: boolean;
}

export default function Subcategories({
    subcategories,
    isLoading,
    isDragging,
}: ISubcategoriesProps): JSX.Element | null {
    if (!subcategories) {
        return null;
    }

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
}: ISortableSubcategoriesProps): JSX.Element | null {
    if (!subcategories) {
        return null;
    }

    return (
        <SortableContext items={subcategories} id={String(parentId)}>
            <Subcategories subcategories={subcategories} {...rest} />
        </SortableContext>
    );
}
