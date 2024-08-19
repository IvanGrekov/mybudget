import { PropsWithChildren } from 'react';

import cx from 'classnames';
import NextLink from 'next/link';

import { IIconProps } from 'components/icons/types/iconProps';
import styles from 'components/link/Link.module.scss';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface ILinkProps extends PropsWithChildren {
    href: string;
    text?: string;
    Icon?: (props: IIconProps) => JSX.Element;
    textVariant?: TTypographyVariants;
    iconSize?: IIconProps['size'];
    shallow?: boolean;
    isActive?: boolean;
    className?: string;
    textClassName?: string;
    onClick?: VoidFunction;
}

export default function Link({
    href,
    text,
    Icon,
    children,
    textVariant = 'body1',
    iconSize = 35,
    shallow,
    isActive,
    className,
    textClassName,
    onClick,
}: ILinkProps): JSX.Element {
    return (
        <NextLink
            href={href}
            shallow={shallow}
            tabIndex={1}
            className={cx(
                styles.link,
                {
                    [styles['link--active']]: isActive,
                    [styles['link--gap']]: !!Icon,
                },
                className,
            )}
            onClick={onClick}
        >
            {Icon && <Icon size={iconSize} className={styles.icon} />}

            {text && (
                <Typography
                    element="span"
                    variant={textVariant}
                    className={cx(styles.text, textClassName)}
                >
                    {text}
                </Typography>
            )}

            {children}
        </NextLink>
    );
}
