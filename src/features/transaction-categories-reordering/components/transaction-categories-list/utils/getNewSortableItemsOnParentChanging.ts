import { Active, Over } from '@dnd-kit/core';

import { TransactionCategory } from 'types/generated.types';
import { getIndexes } from 'utils/sortableItems.utils';

interface IGetNewSortableItemsOnParentChangingArgs {
    overParentElement?: TransactionCategory | null;
    currentActiveItem: TransactionCategory;
    sortableItems: TransactionCategory[];
    active: Active;
    over: Over;
}

export const getNewSortableItemsOnParentChanging = ({
    overParentElement,
    currentActiveItem,
    sortableItems,
    active,
    over,
}: IGetNewSortableItemsOnParentChangingArgs): TransactionCategory[] | null => {
    if (!overParentElement) {
        return null;
    }

    const isOverElementParent = overParentElement.id === over.id;
    const prevParentElementId = currentActiveItem.parent.id;

    return sortableItems.map((item) => {
        if (item.id === prevParentElementId) {
            return {
                ...item,
                children: item.children.filter(
                    (child) => child.id !== currentActiveItem.id,
                ),
            };
        }

        if (isOverElementParent && item.id === over.id) {
            return {
                ...item,
                children: [
                    ...item.children,
                    {
                        ...currentActiveItem,
                        parent: item,
                    },
                ],
            };
        }

        if (!isOverElementParent && item.id === overParentElement.id) {
            const { newIndex } = getIndexes({
                items: item.children,
                active,
                over,
            });

            return {
                ...item,
                children: [
                    ...item.children.slice(0, newIndex),
                    {
                        ...currentActiveItem,
                        parent: item,
                    },
                    ...item.children.slice(newIndex),
                ],
            };
        }

        return item;
    });
};
