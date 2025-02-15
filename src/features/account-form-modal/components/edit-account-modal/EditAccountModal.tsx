import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditAccountModalDataProps } from 'features/account-form-modal/components/edit-account-modal/types/editAccountModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

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

    const [title] = useGetFeatureTranslations({
        featureName: 'EditEntity',
        keys: ['edit_account'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            size="medium"
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
