import { lazy, Suspense } from 'react';

import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import Show from 'components/show/Show';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetMe } from 'hooks/me.hooks';
import { useGetEmptyStateTranslations } from 'hooks/translations.hooks';
import { AccountTypeEnum } from 'types/generated.types';

const CreateAccountModalContentLazy = lazy(
    () =>
        import(
            'features/account-form-modal/components/create-account-modal/CreateAccountModalContent'
        ),
);

interface ICreateAccountModalProps extends IModalBaseProps {
    defaultAccountType: AccountTypeEnum;
}

export default function CreateAccountModal({
    defaultAccountType,
    isOpen,
    onClose,
}: ICreateAccountModalProps): JSX.Element {
    const { me, isLoading } = useGetMe();

    const onCloseModal = useFormModalCloseConfirmation(onClose);

    const emptyStateTranslations = useGetEmptyStateTranslations();

    return (
        <Modal
            isOpen={isOpen}
            title="Create Account"
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
                    <CreateAccountModalContentLazy
                        user={me}
                        defaultAccountType={defaultAccountType}
                        hideModal={onClose}
                        onCloseModal={onCloseModal}
                    />
                </Suspense>
            )}
        </Modal>
    );
}
