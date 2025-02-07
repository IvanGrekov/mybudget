import { TOP_SUFFIX } from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/constants/rootDroppableContainerSuffixes';
import { TransactionCategory } from 'types/generated.types';

interface IGetNewSortableItemsOnParentUnassigningArgs {
    overPlaceholderId: string | number;
    currentActiveItem: TransactionCategory;
    sortableItems: TransactionCategory[];
}

export const getNewSortableItemsOnParentUnassigning = ({
    overPlaceholderId,
    currentActiveItem,
    sortableItems,
}: IGetNewSortableItemsOnParentUnassigningArgs):
    | TransactionCategory[]
    | null => {
    if (typeof overPlaceholderId !== 'string') {
        return null;
    }

    const isTop = overPlaceholderId.endsWith(TOP_SUFFIX);
    const { parent: prevParent } = currentActiveItem;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!prevParent) {
        return null;
    }

    const currentActiveItemWithoutParent = {
        ...currentActiveItem,
    };

    const newSortableItems = sortableItems.map((item) => {
        if (item.id === prevParent.id) {
            return {
                ...item,
                children: item.children?.filter(
                    (child) => child.id !== currentActiveItem.id,
                ),
            };
        }

        return item;
    });

    if (isTop) {
        return [currentActiveItemWithoutParent, ...newSortableItems];
    }

    return [...newSortableItems, currentActiveItemWithoutParent];
};
