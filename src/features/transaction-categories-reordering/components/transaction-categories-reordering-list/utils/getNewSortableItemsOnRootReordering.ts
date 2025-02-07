import { Active, Over } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { TransactionCategory } from 'types/generated.types';
import { getIndexes } from 'utils/sortableItems.utils';

interface IGetNewSortableItemsOnRootReorderingArgs {
    sortableItems: TransactionCategory[];
    active: Active;
    over: Over;
}

export const getNewSortableItemsOnRootReordering = ({
    sortableItems,
    active,
    over,
}: IGetNewSortableItemsOnRootReorderingArgs): TransactionCategory[] => {
    const { oldIndex, newIndex } = getIndexes({
        items: sortableItems,
        active,
        over,
    });

    return arrayMove(sortableItems, oldIndex, newIndex);
};
