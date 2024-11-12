import { useState, useLayoutEffect } from 'react';

import { TApiClientResult } from 'types/apiClient.types';

interface IUseSortableItemsResult<T> {
    sortableItems: T[];
    activeItem: T | null;
    setSortableItems: (items: T[]) => void;
    setActiveItem: (item: T | null) => void;
    setPrevSortableItems: (items: T[]) => void;
    onSuccessfulUpdate: VoidFunction;
    onFailedUpdate: VoidFunction;
}

export const useSortableItems = <T extends { id: number }>(
    items: TApiClientResult<T[]> | undefined,
): IUseSortableItemsResult<T> => {
    const [activeItem, setActiveItem] = useState<T | null>(null);
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
        activeItem,
        setSortableItems,
        setActiveItem,
        setPrevSortableItems,
        onSuccessfulUpdate,
        onFailedUpdate,
    };
};
