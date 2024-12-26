import Button from 'components/button/Button';
import styles from 'components/entity-icon-color-field/EntityIconColorField.module.scss';
import EntityIconColorModal from 'components/entity-icon-color-modal/EntityIconColorModal';
import { IEntityIconColorModalProps } from 'components/entity-icon-color-modal/types/entityIconColorModalProps';
import { useModal } from 'hooks/useModal';

export default function EntityIconColorField(
    props: IEntityIconColorModalProps,
): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Button
                text="Select Icon Color"
                className={styles.button}
                onClick={openModal}
            />

            <EntityIconColorModal
                isOpen={isModalOpen}
                {...props}
                onClose={closeModal}
            />
        </>
    );
}
