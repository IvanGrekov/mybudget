import { useState } from 'react';

import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import { useArchiveTransactionCategory } from 'features/delete-transaction-category-modal/hooks/useArchiveTransactionCategory';
import { useDeleteTransactionCategory } from 'features/delete-transaction-category-modal/hooks/useDeleteTransactionCategory';
import { TDeleteTransactionCategoryModalDataProps } from 'features/delete-transaction-category-modal/types/deleteTransactionCategoryModalDataProps';
import {
    useGetFeatureTranslations,
    useGetActionButtonsTranslations,
} from 'hooks/translations.hooks';
import styles from 'styles/ModalContent.module.scss';

interface IDeleteTransactionCategoryModalContentProps
    extends TDeleteTransactionCategoryModalDataProps {
    onClose: VoidFunction;
}

export default function DeleteTransactionCategoryModalContent({
    id,
    type,
    name,
    hasChildren,
    parentId,
    onClose,
    onCompleted,
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
            parentId,
            onCompleted,
        },
    );

    const { isLoading: isArchiveLoading, archive } =
        useArchiveTransactionCategory({
            id,
            type,
            hasChildren,
            parentId,
            onCompleted,
        });

    const [
        youSureWantDeleteCategoryText,
        youSureWantDeleteSubcategoryText,
        iWantDeleteCategoryText,
        iWantDeleteSubcategoryText,
        deleteRelatedTransactionsText,
        deleteSubcategoriesText,
    ] = useGetFeatureTranslations({
        featureName: 'DeleteEntity',
        keys: [
            'you_sure_want_delete_category',
            'you_sure_want_delete_subcategory',
            'i_want_delete_category',
            'i_want_delete_subcategory',
            'delete_related_transactions',
            'delete_subcategories',
        ],
    });

    const submitText = useGetActionButtonsTranslations()('delete');

    return (
        <>
            <div className={styles.container}>
                <Typography>
                    {parentId
                        ? youSureWantDeleteSubcategoryText
                        : youSureWantDeleteCategoryText}{' '}
                    &quot;{name}
                    &quot; ?
                </Typography>

                <Checkbox
                    checked={isSoftDeleting}
                    label={
                        parentId
                            ? iWantDeleteSubcategoryText
                            : iWantDeleteCategoryText
                    }
                    isFullWidth={true}
                    onChange={() => setIsSoftDeleting((prev) => !prev)}
                />

                <Checkbox
                    checked={isForceDeleting}
                    label={deleteRelatedTransactionsText}
                    isFullWidth={true}
                    onChange={() => setIsForceDeleting((prev) => !prev)}
                />

                <Show when={hasChildren && isForceDeleting}>
                    <Checkbox
                        checked={shouldRemoveChildren}
                        label={deleteSubcategoriesText}
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
                    text={submitText}
                    color="red"
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
