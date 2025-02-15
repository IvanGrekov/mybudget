import { lazy, Suspense } from 'react';

import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { ICreateTransactionModalDataProps } from 'features/transaction-form-modal/components/create-transaction-modal/types/createTransactionModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetMe } from 'hooks/me.hooks';
import { useTransactionListCurrentTypesFilterValue } from 'hooks/transactionListFilters.hooks';
import {
    useGetEmptyStateTranslations,
    useGetFeatureTranslations,
} from 'hooks/translations.hooks';

const CreateTransactionModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModalContent'
        ),
);

type TCreateTransactionModalProps = IModalBaseProps &
    ICreateTransactionModalDataProps & {
        refetchTransactionList: VoidFunction;
    };

export default function CreateTransactionModal({
    isOpen,
    onClose,
    refetchTransactionList,
    ...dataProps
}: TCreateTransactionModalProps): JSX.Element {
    const { me, isLoading } = useGetMe();
    const { value } = useTransactionListCurrentTypesFilterValue();

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    const emptyStateTranslations = useGetEmptyStateTranslations();
    const [title] = useGetFeatureTranslations({
        featureName: 'CreateEntity',
        keys: ['create_transaction'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={title}
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
                    <CreateTransactionModalContentLazy
                        userId={me.id}
                        defaultType={value.length === 1 ? value[0] : undefined}
                        refetchTransactionList={refetchTransactionList}
                        hideModal={onClose}
                        onCloseModal={onCloseModal}
                        {...dataProps}
                    />
                </Suspense>
            )}
        </Modal>
    );
}
