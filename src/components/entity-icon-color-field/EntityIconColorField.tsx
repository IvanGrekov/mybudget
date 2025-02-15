import Button from 'components/button/Button';
import styles from 'components/entity-icon-color-field/EntityIconColorField.module.scss';
import EntityIconColorModal from 'components/entity-icon-color-modal/EntityIconColorModal';
import { IEntityIconColorModalProps } from 'components/entity-icon-color-modal/types/entityIconColorModalProps';
import { useGetEntityIconFormFeatureTranslations } from 'hooks/translations.hooks';
import { useModal } from 'hooks/useModal';

export default function EntityIconColorField(
    props: IEntityIconColorModalProps,
): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    const label = useGetEntityIconFormFeatureTranslations()('icon_color');

    return (
        <>
            <Button
                text={label}
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
