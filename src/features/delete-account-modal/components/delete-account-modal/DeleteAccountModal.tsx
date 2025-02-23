import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TDeleteAccountModalDataProps } from 'features/delete-account-modal/types/deleteAccountModalDataProps';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

const DeleteAccountModalContentLazy = lazy(
    () =>
        import(
            'features/delete-account-modal/components/delete-account-modal-content/DeleteAccountModalContent'
        ),
);

export default function DeleteAccountModal({
    isOpen,
    onClose,
    ...dataProps
}: IModalBaseProps & TDeleteAccountModalDataProps): JSX.Element {
    const [title] = useGetFeatureTranslations({
        featureName: 'DeleteEntity',
        keys: ['delete_account'],
    });

    return (
        <Modal isOpen={isOpen} title={title} size="small" onClose={onClose}>
            <Suspense fallback={<ModalCircularLoading />}>
                <DeleteAccountModalContentLazy
                    {...dataProps}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
