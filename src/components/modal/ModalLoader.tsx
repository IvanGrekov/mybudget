import styles from 'components/modal/Modal.module.scss';
import { ILoaderProps } from 'components/modal/types';
import Skeleton from 'components/skeleton/Skeleton';

export default function ModalLoader({
    isLoading,
}: ILoaderProps): JSX.Element | null {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles.loader}>
            <Skeleton height={8} />
        </div>
    );
}
