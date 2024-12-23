import { TransactionCategory } from 'types/generated.types';

interface IGetNewSortableItemsOnParentAssigningArgs {
    overParentId?: number;
    currentActiveItem: TransactionCategory;
    sortableItems: TransactionCategory[];
}

export const getNewSortableItemsOnParentAssigning = ({
    overParentId,
    currentActiveItem,
    sortableItems,
}: IGetNewSortableItemsOnParentAssigningArgs): TransactionCategory[] | null => {
    if (!overParentId) {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (currentActiveItem.children?.length) {
        return null;
    }

    const filteredSortableItems = sortableItems.filter(
        (item) => item.id !== currentActiveItem.id,
    );

    return filteredSortableItems.map((item) => {
        if (item.id === overParentId) {
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

        return item;
    });
};
