import IconButton from 'components/button/IconButton';
import CloseIcon from 'components/icons/CloseIcon';
import styles from 'components/modal/Modal.module.scss';
import Typography from 'components/typography/Typography';

interface IModalTitleProps {
    text: string;
    onClose: VoidFunction;
}

export default function ModalTitle({
    text,
    onClose,
}: IModalTitleProps): JSX.Element {
    return (
        <div className={styles['title-container']}>
            <Typography variant="subtitle1" className={styles.title}>
                {text}
            </Typography>

            <IconButton iconSize={25} Icon={CloseIcon} onClick={onClose} />
        </div>
    );
}
