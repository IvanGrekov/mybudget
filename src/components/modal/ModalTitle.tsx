import styles from 'components/modal/Modal.module.scss';
import Typography from 'components/typography/Typography';

interface IModalTitleProps {
    text?: string;
}

export default function ModalTitle({
    text,
}: IModalTitleProps): JSX.Element | null {
    if (!text) {
        return null;
    }

    return (
        <Typography variant="subtitle1" className={styles.title}>
            {text}
        </Typography>
    );
}
