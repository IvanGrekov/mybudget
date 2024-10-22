import CircularLoading from 'components/circular-loading/CircularLoading';
import styles from 'features/user-settings/components/enable-tfa-modal/EnableTfaModal.module.scss';

export default function EnableTfaModalSkeleton(): JSX.Element {
    return (
        <div className={styles.container}>
            <CircularLoading size={200} />
        </div>
    );
}
