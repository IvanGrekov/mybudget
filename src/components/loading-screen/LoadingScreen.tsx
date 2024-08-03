import CircularLoading from 'components/circular-loading/CircularLoading';
import styles from 'components/loading-screen/LoadingScreen.module.scss';
import Typography from 'components/typography/Typography';

interface ILoadingScreenProps {
    title?: string;
    description?: string;
}

export default function LoadingScreen({
    title = 'Please wait a second',
    description,
}: ILoadingScreenProps): JSX.Element {
    return (
        <div className={styles['loading-screen']}>
            <CircularLoading size={120} />

            <div className={styles['text-container']}>
                <Typography variant="h3">{title}</Typography>

                {!!description && (
                    <Typography variant="subtitle1">{description}</Typography>
                )}
            </div>
        </div>
    );
}
