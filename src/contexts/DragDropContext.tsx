import { PropsWithChildren } from 'react';

import {
    KeyboardSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DndContext,
    closestCenter,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    SortableContext,
} from '@dnd-kit/sortable';

interface IDragDropContextProps extends PropsWithChildren {
    items: { id: number }[];
    handleDragEnd: (event: DragEndEvent) => void;
}

export default function DragDropContext({
    items,
    children,
    handleDragEnd,
}: IDragDropContextProps): JSX.Element {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // NOTE: Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // NOTE: Press delay of 125ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 125,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items}>{children}</SortableContext>
        </DndContext>
    );
}
