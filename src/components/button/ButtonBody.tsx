import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import styles from 'components/button/Button.module.scss';
import { IButtonProps } from 'components/button/types/buttonProps';
import Loader from 'components/loader/Loader';
import Typography from 'components/typography/Typography';

const ButtonBody = (
    {
        text,
        onClick,
        type = 'button',
        form,
        title,
        Icon,
        iconColor,
        variant = type === 'submit' ? 'contained' : 'outlined',
        size = 'regular',
        textVariant = size === 'big' || variant === 'text' ? 'button' : 'body2',
        isDisabled,
        isLoading,
        isActive,
        tabIndex,
        style,
        className,
        color,
    }: IButtonProps,
    ref: Ref<HTMLButtonElement>,
): JSX.Element => {
    const isButtonDisabled = isDisabled || isLoading;

    return (
        <button
            ref={ref}
            type={type}
            form={form}
            title={title}
            disabled={isButtonDisabled}
            tabIndex={tabIndex}
            onClick={onClick}
            className={cx(
                styles.button,
                styles[`button--${variant}`],
                styles[`button--${size}`],
                styles[`button--${color}`],
                {
                    [styles['button--disabled']]: isDisabled || isLoading,
                    [styles['button--loading']]: isLoading,
                    [styles['button--active']]: isActive,
                },
                className,
            )}
            style={style}
        >
            {isLoading ? (
                <span className={styles.loader}>
                    <Loader size="small" />
                </span>
            ) : (
                <>
                    <Typography
                        element="span"
                        variant={textVariant}
                        style={{
                            lineHeight: 1,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                        }}
                    >
                        {text}
                    </Typography>

                    {Icon && (
                        <span className={styles.icon}>
                            <Icon size={30} color={iconColor} />
                        </span>
                    )}
                </>
            )}
        </button>
    );
};

export default forwardRef(ButtonBody);
