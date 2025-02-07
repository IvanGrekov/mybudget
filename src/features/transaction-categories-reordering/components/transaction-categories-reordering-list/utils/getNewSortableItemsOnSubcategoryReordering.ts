import { Active, Over } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { TransactionCategory } from 'types/generated.types';
import { getIndexes } from 'utils/sortableItems.utils';

interface IGetNewSortableItemsOnSubcategoryReorderingArgs {
    sortableItems: TransactionCategory[];
    sortableContainerId: string;
    active: Active;
    over: Over;
}

export const getNewSortableItemsOnSubcategoryReordering = ({
    sortableItems,
    sortableContainerId,
    active,
    over,
}: IGetNewSortableItemsOnSubcategoryReorderingArgs):
    | TransactionCategory[]
    | null => {
    const { id: parentId, children } =
        sortableItems.find(({ id }) => id === parseInt(sortableContainerId)) ||
        {};

    if (!parentId || !children) {
        return null;
    }

    const { oldIndex, newIndex } = getIndexes({
        items: children,
        active,
        over,
    });

    const newSortableChildItems = arrayMove(children, oldIndex, newIndex);

    return sortableItems.map((item) =>
        item.id === parentId
            ? {
                  ...item,
                  children: newSortableChildItems,
              }
            : item,
    );
};
