import CircularLoading from 'components/circular-loading/CircularLoading';
import styles from 'components/modal/Modal.module.scss';

export default function ModalCircularLoading(): JSX.Element {
    return (
        <div className={styles['placeholder-loader']}>
            <CircularLoading size={150} />
        </div>
    );
}
