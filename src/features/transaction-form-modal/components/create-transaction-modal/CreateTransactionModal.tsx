import { lazy, Suspense } from 'react';

import EmptyState from 'components/empty-state/EmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useTransactionListCurrentTypesFilterValue } from 'features/transaction-list/hooks/transactionListFilters.hooks';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetMe } from 'hooks/me.hooks';

const CreateTransactionModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModalContent'
        ),
);

interface ICreateTransactionModalProps extends IModalBaseProps {
    refetchTransactionList: VoidFunction;
}

export default function CreateTransactionModal({
    isOpen,
    onClose,
    refetchTransactionList,
}: ICreateTransactionModalProps): JSX.Element {
    const { me, isLoading } = useGetMe();
    const { value } = useTransactionListCurrentTypesFilterValue();

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title="Create Transaction"
            size="medium"
            onClose={onCloseModal}
        >
            <Show when={isLoading}>
                <ModalCircularLoading />
            </Show>

            <Show when={!me && !isLoading}>
                <EmptyState text="We couldn't find your profile" />
            </Show>

            {me && (
                <Suspense fallback={<ModalCircularLoading />}>
                    <CreateTransactionModalContentLazy
                        userId={me.id}
                        defaultType={value.length === 1 ? value[0] : undefined}
                        refetchTransactionList={refetchTransactionList}
                        hideModal={onClose}
                        onCloseModal={onCloseModal}
                    />
                </Suspense>
            )}
        </Modal>
    );
}
