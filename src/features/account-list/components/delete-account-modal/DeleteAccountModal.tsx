import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TDeleteAccountModalDataProps } from 'features/account-list/components/delete-account-modal/types/deleteAccountModalDataProps';

const DeleteAccountModalContentLazy = lazy(
    () =>
        import(
            'features/account-list/components/delete-account-modal/DeleteAccountModalContent'
        ),
);

export default function DeleteAccountModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps & TDeleteAccountModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Confirm Account Deleting"
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <DeleteAccountModalContentLazy
                    {...dataProps}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
