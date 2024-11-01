import { CSSProperties, forwardRef, Ref } from 'react';

import cx from 'classnames';

import styles from 'components/typography/Typography.module.scss';
import { TTypographyElements } from 'components/typography/types/typographyElements';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import { TTypographyChildren } from 'types/typographyChildren';
import { getLimitedText } from 'utils/getLimitedText';

interface ITypographyProps {
    children: TTypographyChildren;
    element?: TTypographyElements;
    variant?: TTypographyVariants;
    lineClamp?: number | 'none';
    maxLength?: number;
    textOverflow?: 'ellipsis' | 'clip' | 'unset' | 'initial' | 'inherit';
    style?: CSSProperties;
    className?: string;
}

function Typography(
    {
        children,
        element = 'p',
        variant = 'body1',
        lineClamp = 'none',
        maxLength,
        textOverflow = 'ellipsis',
        style = {},
        className,
    }: ITypographyProps,
    ref: Ref<HTMLHeadingElement>,
): JSX.Element {
    const Element = element;
    const text = getLimitedText({ children, maxLength });

    return (
        <Element
            ref={ref}
            className={cx(
                styles.typography,
                styles[`typography--${variant}`],
                {
                    [styles[`typography--line-clamp`]]: lineClamp !== 'none',
                },
                className,
            )}
            style={{
                WebkitLineClamp: lineClamp,
                textOverflow,
                ...style,
            }}
        >
            {text}
        </Element>
    );
}

export default forwardRef(Typography);
