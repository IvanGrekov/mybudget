'use client';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import AccountListTabs from 'features/account-list-tabs/components/account-list-tabs/AccountListTabs';
import { useAccountListCurrentTab } from 'features/account-list-tabs/hooks/useAccountListCurrentTab';
import AccountCard from 'features/accounts-reordering/components/account-card/AccountCard';
import AccountReorderingListHeader from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingListHeader';
import { useSortableAccounts } from 'features/accounts-reordering/components/account-reordering-list/hooks/useSortableAccounts';
import styles from 'styles/ItemList.module.scss';

export default function AccountReorderingList(): JSX.Element {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // NOTE: Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // NOTE: Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const type = useAccountListCurrentTab();
    const {
        sortableItems,
        isGetAccountsLoading,
        isEditOrderLoading,
        handleDragEnd,
    } = useSortableAccounts(type);
    const isEmptyState = !sortableItems.length;

    return (
        <div className={styles.container}>
            <AccountReorderingListHeader
                isBackButtonDisabled={isEditOrderLoading}
            />

            <AccountListTabs isDisabled={isEditOrderLoading} />

            <Show when={isGetAccountsLoading || isEditOrderLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isGetAccountsLoading}>
                <EmptyState text={`No '${type}' accounts found`} />
            </Show>

            {!isEmptyState && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={sortableItems}>
                        <ul className={styles['grid-list']}>
                            {sortableItems.map((account) => (
                                <AccountCard
                                    key={account.id}
                                    account={account}
                                    isLoading={isEditOrderLoading}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
