import { lazy, Suspense } from 'react';

import { IEntityIconColorModalProps } from 'components/entity-icon-color-modal/types/entityIconColorModalProps';
import styles from 'components/entity-icon-name-modal/EntityIconNameModal.module.scss';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';

const EntityIconColorModalContentLazy = lazy(
    () =>
        import(
            'components/entity-icon-color-modal/EntityIconColorModalContent'
        ),
);

export default function EntityIconColorModal({
    isOpen,
    onClose,
    ...rest
}: IModalBaseProps & IEntityIconColorModalProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Select Icon Color"
            size="small"
            className={styles.modal}
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EntityIconColorModalContentLazy {...rest} />
            </Suspense>
        </Modal>
    );
}
