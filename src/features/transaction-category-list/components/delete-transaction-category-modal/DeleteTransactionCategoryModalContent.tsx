import { useState } from 'react';

import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModalContent.module.scss';
import { useArchiveTransactionCategory } from 'features/transaction-category-list/components/delete-transaction-category-modal/hooks/useArchiveTransactionCategory';
import { useDeleteTransactionCategory } from 'features/transaction-category-list/components/delete-transaction-category-modal/hooks/useDeleteTransactionCategory';
import { TDeleteTransactionCategoryModalDataProps } from 'features/transaction-category-list/components/delete-transaction-category-modal/types/deleteTransactionCategoryModalDataProps';

interface IDeleteTransactionCategoryModalContentProps
    extends TDeleteTransactionCategoryModalDataProps {
    onClose: VoidFunction;
}

export default function DeleteTransactionCategoryModalContent({
    id,
    type,
    name,
    hasChildren,
    isSubcategory,
    onClose,
}: IDeleteTransactionCategoryModalContentProps): JSX.Element {
    const [isSoftDeleting, setIsSoftDeleting] = useState(false);
    const [isForceDeleting, setIsForceDeleting] = useState(false);
    const [shouldRemoveChildren, setShouldRemoveChildren] = useState(false);

    const { isLoading: isDeleteLoading, remove } = useDeleteTransactionCategory(
        {
            id,
            type,
            shouldRemoveChildren,
            hasChildren,
        },
    );
    const { isLoading: isArchiveLoading, archive } =
        useArchiveTransactionCategory({
            id,
            type,
            hasChildren,
        });

    return (
        <>
            <div className={styles.container}>
                <Typography>
                    Are you sure you want to delete the{' '}
                    {isSubcategory ? 'subcategory' : 'category'} &quot;{name}
                    &quot; ?
                </Typography>

                <Checkbox
                    checked={isSoftDeleting}
                    label="I want to delete the category"
                    isFullWidth={true}
                    onChange={() => setIsSoftDeleting((prev) => !prev)}
                />

                <Checkbox
                    checked={isForceDeleting}
                    label="Delete related transactions"
                    isFullWidth={true}
                    onChange={() => setIsForceDeleting((prev) => !prev)}
                />

                <Show when={hasChildren && isForceDeleting}>
                    <Checkbox
                        checked={shouldRemoveChildren}
                        label="Delete subcategories"
                        isFullWidth={true}
                        onChange={() =>
                            setShouldRemoveChildren((prev) => !prev)
                        }
                    />
                </Show>
            </div>

            <ModalActions>
                <CancelAction onCancel={onClose} />
                <Button
                    text="Delete"
                    color="red"
                    variant="contained"
                    type="submit"
                    isLoading={isDeleteLoading || isArchiveLoading}
                    isDisabled={!isSoftDeleting}
                    onClick={(): void => {
                        onClose();
                        (isForceDeleting ? remove : archive)();
                    }}
                />
            </ModalActions>
        </>
    );
}
