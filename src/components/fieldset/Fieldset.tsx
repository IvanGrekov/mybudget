import { PropsWithChildren, ReactNode } from 'react';

import cx from 'classnames';

import ButtonGroup from 'components/button-group/ButtonGroup';
import styles from 'components/fieldset/Fieldset.module.scss';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface IFieldsetProps extends PropsWithChildren {
    title?: string;
    actions?: ReactNode;
    disabled?: boolean;
    titleVariant?: TTypographyVariants;
    withBorder?: boolean;
    titleClassName?: string;
    legendClassName?: string;
    className?: string;
}

export default function Fieldset({
    title,
    actions,
    children,
    disabled,
    titleVariant = 'subtitle2',
    withBorder = true,
    titleClassName,
    legendClassName,
    className,
}: IFieldsetProps): JSX.Element {
    return (
        <fieldset
            className={cx(
                styles.fieldset,
                { [styles['fieldset--border']]: withBorder },
                className,
            )}
        >
            {title && (
                <legend
                    className={cx(
                        styles.legend,
                        { [styles['legend--border']]: withBorder },
                        legendClassName,
                    )}
                >
                    <Typography
                        element="span"
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
                </legend>
            )}

            <div className={styles.stack}>
                <div className={styles['children-stack']}>{children}</div>

                {!!actions && <ButtonGroup>{actions}</ButtonGroup>}
            </div>
        </fieldset>
    );
}
