import { lazy, Suspense } from 'react';

import { useQuery } from '@tanstack/react-query';

import EmptyState from 'components/empty-state/EmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { EFetchingTags } from 'types/fetchingTags';
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
    const { isPending, data: user } = useQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => CLIENT_MY_BUDGET_API.getMe(),
    });

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title="Create Category"
            size="medium"
            onClose={onCloseModal}
        >
            <Show when={isPending}>
                <ModalCircularLoading />
            </Show>

            <Show when={!user && !isPending}>
                <EmptyState text="We couldn't find your profile" />
            </Show>

            {user && (
                <Suspense fallback={<ModalCircularLoading />}>
                    <CreateTransactionCategoryModalContentLazy
                        user={user}
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
