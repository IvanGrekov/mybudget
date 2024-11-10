import { Active, Over } from '@dnd-kit/core';

interface IGetIndexesResult {
    oldIndex: number;
    newIndex: number;
}

interface IGetIndexesArgs<T> {
    items: T[];
    active: Active;
    over: Over;
}

export const getIndexes = <T extends { id: number }>({
    items,
    active,
    over,
}: IGetIndexesArgs<T>): IGetIndexesResult => {
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    return { oldIndex, newIndex };
};
