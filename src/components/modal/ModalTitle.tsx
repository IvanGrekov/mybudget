import IconButton from 'components/button/IconButton';
import CloseIcon from 'components/icons/CloseIcon';
import styles from 'components/modal/Modal.module.scss';
import Typography from 'components/typography/Typography';

interface IModalTitleProps {
    isOpen: boolean;
    text: string;
    onClose: VoidFunction;
}

export default function ModalTitle({
    isOpen,
    text,
    onClose,
}: IModalTitleProps): JSX.Element {
    return (
        <div className={styles['title-container']}>
            <Typography variant="subtitle1" className={styles.title}>
                {text}
            </Typography>

            <IconButton
                iconSize={25}
                tabIndex={isOpen ? 1 : -1}
                Icon={CloseIcon}
                onClick={onClose}
            />
        </div>
    );
}
