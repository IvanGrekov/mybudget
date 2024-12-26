import IconButton from 'components/button/IconButton';
import styles from 'components/entity-icon-name-modal/EntityIconNameModal.module.scss';
import { IEntityIconNameModalProps } from 'components/entity-icon-name-modal/types/entityIconNameModalProps';
import { ENTITY_ICONS } from 'constants/entityIcons.constants';

interface IEntityIconNameModalContentProps extends IEntityIconNameModalProps {
    closeModal: VoidFunction;
}

const ITEMS = Array.from(ENTITY_ICONS.entries());

export default function EntityIconNameModalContent({
    selectedIconName,
    changeIconName,
    closeModal,
}: IEntityIconNameModalContentProps): JSX.Element {
    return (
        <ul className={styles.list}>
            {ITEMS.map(([iconName, Icon]) => (
                <li key={iconName} className={styles.item}>
                    <IconButton
                        Icon={Icon}
                        iconSize="extraSmall"
                        isDisabled={iconName === selectedIconName}
                        onClick={() => {
                            changeIconName(iconName);
                            closeModal();
                        }}
                    />
                </li>
            ))}
        </ul>
    );
}
