import { lazy, Suspense } from 'react';

import styles from 'components/entity-icon-name-modal/EntityIconNameModal.module.scss';
import { IEntityIconNameModalProps } from 'components/entity-icon-name-modal/types/entityIconNameModalProps';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';

const EntityIconNameModalContentLazy = lazy(
    () =>
        import('components/entity-icon-name-modal/EntityIconNameModalContent'),
);

export default function EntityIconNameModal({
    isOpen,
    onClose,
    ...rest
}: IModalBaseProps & IEntityIconNameModalProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Select Icon"
            size="small"
            className={styles.modal}
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EntityIconNameModalContentLazy
                    {...rest}
                    closeModal={onClose}
                />
            </Suspense>
        </Modal>
    );
}
