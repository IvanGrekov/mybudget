import { PropsWithChildren } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IDragDropListItemProps extends PropsWithChildren {
    id: number;
    isLoading?: boolean;
}

export default function DragDropListItem({
    id,
    children,
    isLoading,
}: IDragDropListItemProps): JSX.Element {
    const { attributes, listeners, transform, transition, setNodeRef } =
        useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: isLoading ? 'progress' : 'grab',
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(isLoading ? {} : listeners)}
        >
            {children}
        </li>
    );
}
