import { CSSProperties } from 'react';

import cx from 'classnames';

import styles from 'components/typography/Typography.module.scss';
import { TTypographyElements } from 'components/typography/types/typographyElements';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import { getLimitedText } from 'utils/getLimitedText';

interface ITypographyProps {
    children: string;
    element?: TTypographyElements;
    variant?: TTypographyVariants;
    lineClamp?: number | 'none';
    maxLength?: number;
    textOverflow?: 'ellipsis' | 'clip' | 'unset' | 'initial' | 'inherit';
    style?: CSSProperties;
    className?: string;
}

export default function Typography({
    children,
    element = 'p',
    variant = 'body1',
    lineClamp = 'none',
    maxLength,
    textOverflow = 'ellipsis',
    style = {},
    className,
}: ITypographyProps): JSX.Element {
    const Element = element;
    const text = getLimitedText({ text: children, maxLength });

    return (
        <Element
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
