import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/field-group/FieldGroup.module.scss';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface IFieldGroupProps extends PropsWithChildren {
    title: string;
    disabled?: boolean;
    titleVariant?: TTypographyVariants;
    titleClassName?: string;
    className?: string;
}

export default function FieldGroup({
    title,
    children,
    disabled,
    titleVariant = 'subtitle2',
    titleClassName,
    className,
}: IFieldGroupProps): JSX.Element {
    return (
        <div className={cx(styles.group, className)}>
            <Typography
                element="h4"
                variant={titleVariant}
                className={cx(
                    styles.title,
                    {
                        [styles['title--disabled']]: disabled,
                    },
                    titleClassName,
                )}
            >
                {title}
            </Typography>

            {children}
        </div>
    );
}
