import { lazy, Suspense } from 'react';

import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetMe } from 'hooks/me.hooks';
import { useTransactionListCurrentTypesFilterValue } from 'hooks/transactionListFilters.hooks';

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
                <MeEmptyState notWrappedByContainer={true} />
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
