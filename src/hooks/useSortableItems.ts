import { useState, useLayoutEffect } from 'react';

import { TApiClientResult } from 'types/apiClient.types';

interface IUseSortableItemsResult<T> {
    sortableItems: T[];
    setSortableItems: (items: T[]) => void;
    setPrevSortableItems: (items: T[]) => void;
    onSuccessfulUpdate: VoidFunction;
    onFailedUpdate: VoidFunction;
}

export const useSortableItems = <T extends { id: number }>(
    items: TApiClientResult<T[]> | undefined,
): IUseSortableItemsResult<T> => {
    const [prevSortableItems, setPrevSortableItems] = useState<T[]>([]);
    const [sortableItems, setSortableItems] = useState<T[]>([]);

    useLayoutEffect(() => {
        if (items) {
            setPrevSortableItems(items);
            setSortableItems(items);
        }
    }, [items]);

    const onSuccessfulUpdate = (): void => {
        setPrevSortableItems(sortableItems);
    };

    const onFailedUpdate = (): void => {
        setSortableItems(prevSortableItems);
    };

    return {
        sortableItems,
        setSortableItems,
        setPrevSortableItems,
        onSuccessfulUpdate,
        onFailedUpdate,
    };
};
