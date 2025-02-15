import { lazy, Suspense } from 'react';

import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetMe } from 'hooks/me.hooks';
import { useGetEmptyStateTranslations } from 'hooks/translations.hooks';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

const CreateTransactionCategoryModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-category-form-modal/components/create-transaction-category-modal/CreateTransactionCategoryModalContent'
        ),
);

interface ICreateTransactionCategoryModalProps extends IModalBaseProps {
    defaultTransactionCategoryType: TransactionCategoryTypeEnum;
}

export default function CreateTransactionCategoryModal({
    defaultTransactionCategoryType,
    isOpen,
    onClose,
}: ICreateTransactionCategoryModalProps): JSX.Element {
    const { me, isLoading } = useGetMe();

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    const emptyStateTranslations = useGetEmptyStateTranslations();

    return (
        <Modal
            isOpen={isOpen}
            title="Create Category"
            size="medium"
            onClose={onCloseModal}
        >
            <Show when={isLoading}>
                <ModalCircularLoading />
            </Show>

            <Show when={!me && !isLoading}>
                <MeEmptyState
                    emptyStateTranslations={emptyStateTranslations}
                    notWrappedByContainer={true}
                />
            </Show>

            {me && (
                <Suspense fallback={<ModalCircularLoading />}>
                    <CreateTransactionCategoryModalContentLazy
                        user={me}
                        defaultTransactionCategoryType={
                            defaultTransactionCategoryType
                        }
                        hideModal={onClose}
                        onCloseModal={onCloseModal}
                    />
                </Suspense>
            )}
        </Modal>
    );
}
