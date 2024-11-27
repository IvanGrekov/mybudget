import { Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { IEditAccountModalDataProps } from 'features/account-form-modal/components/edit-account-modal/types/editAccountModalDataProps';

export default function EditAccountModal({
    isOpen,
    onClose,
}: IModalBaseProps & IEditAccountModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Edit Account"
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <UnderDevelopmentMessage />
            </Suspense>
        </Modal>
    );
}
