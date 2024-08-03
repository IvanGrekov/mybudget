import styles from 'components/empty-state/EmptyState.module.scss';
import EmptyIcon from 'components/icons/EmptyIcon';
import ErrorIcon from 'components/icons/ErrorIcon';
import Typography from 'components/typography/Typography';

interface IEmptyStateProps {
    isError?: boolean;
    text?: string;
}

const ICON_SIZE = 150;

export default function EmptyState({
    isError,
    text,
}: IEmptyStateProps): JSX.Element {
    const colorClassName = isError ? 'red-color' : 'foreground-color';
    const defaultText = isError
        ? 'Something went wrong, try to load data later'
        : 'There is no any data yet';

    return (
        <section className={styles['empty-state']}>
            <div className={styles['icon-wrapper']}>
                {isError ? (
                    <ErrorIcon size={ICON_SIZE} className={colorClassName} />
                ) : (
                    <>
                        <EmptyIcon
                            size={ICON_SIZE}
                            className={colorClassName}
                        />
                    </>
                )}
            </div>

            <Typography element="h2" variant="h4" className={colorClassName}>
                {text || defaultText}
            </Typography>
        </section>
    );
}
