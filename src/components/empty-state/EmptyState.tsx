import cx from 'classnames';

import Button from 'components/button/Button';
import styles from 'components/empty-state/EmptyState.module.scss';
import EmptyIcon from 'components/icons/EmptyIcon';
import ErrorIcon from 'components/icons/ErrorIcon';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { TTranslations } from 'types/translations';
import { getCapitalizedString } from 'utils/string.utils';

interface IEmptyStateProps {
    emptyStateTranslations?: TTranslations;
    isError?: boolean;
    text?: string;
    className?: string;
    onClick?: VoidFunction;
}

const ICON_SIZE = 150;

export default function EmptyState({
    emptyStateTranslations,
    isError,
    text,
    className,
    onClick,
}: IEmptyStateProps): JSX.Element {
    const colorClassName = isError ? 'red-color' : 'foreground-color';
    const defaultText = isError
        ? emptyStateTranslations?.('error') || DEFAULT_ERROR_MESSAGE
        : emptyStateTranslations?.('title') || 'There is no any data yet!';

    return (
        <section className={cx(styles['empty-state'], className)}>
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
