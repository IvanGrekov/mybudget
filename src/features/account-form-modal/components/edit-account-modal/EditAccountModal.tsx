import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditAccountModalDataProps } from 'features/account-form-modal/components/edit-account-modal/types/editAccountModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';

const EditAccountModalContentLazy = lazy(
    () =>
        import(
            'features/account-form-modal/components/edit-account-modal/EditAccountModalContent'
        ),
);

export default function EditAccountModal({
    account,
    isOpen,
    onClose,
}: IModalBaseProps & IEditAccountModalDataProps): JSX.Element {
    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title={`Edit "${account.name}" Account`}
            size="small"
            onClose={onCloseModal}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EditAccountModalContentLazy
                    account={account}
                    hideModal={onClose}
                    onCloseModal={onCloseModal}
                />
            </Suspense>
        </Modal>
    );
}
