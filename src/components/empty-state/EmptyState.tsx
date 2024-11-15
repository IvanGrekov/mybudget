import Button from 'components/button/Button';
import styles from 'components/empty-state/EmptyState.module.scss';
import EmptyIcon from 'components/icons/EmptyIcon';
import ErrorIcon from 'components/icons/ErrorIcon';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { getCapitalizedString } from 'utils/string.utils';

interface IEmptyStateProps {
    isError?: boolean;
    text?: string;
    onClick?: VoidFunction;
}

const ICON_SIZE = 150;

export default function EmptyState({
    isError,
    text,
    onClick,
}: IEmptyStateProps): JSX.Element {
    const colorClassName = isError ? 'red-color' : 'foreground-color';
    const defaultText = isError
        ? DEFAULT_ERROR_MESSAGE
        : 'There is no any data yet!';

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

            <div className={styles['text-wrapper']}>
                <Typography
                    element="h2"
                    variant="h5"
                    className={colorClassName}
                >
                    {text ? getCapitalizedString(text) : defaultText}
                </Typography>

                <Show when={!!onClick}>
                    <Button
                        text="Try again"
                        color={isError ? 'red' : 'primary'}
                        onClick={onClick}
                    />
                </Show>
            </div>
        </section>
    );
}
