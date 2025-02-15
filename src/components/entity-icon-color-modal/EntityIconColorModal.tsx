import { lazy, Suspense } from 'react';

import { IEntityIconColorModalProps } from 'components/entity-icon-color-modal/types/entityIconColorModalProps';
import styles from 'components/entity-icon-name-modal/EntityIconNameModal.module.scss';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { useGetEntityIconFormFeatureTranslations } from 'hooks/translations.hooks';

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
    const title = useGetEntityIconFormFeatureTranslations()('icon_color');

    return (
        <Modal
            isOpen={isOpen}
            title={title}
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
