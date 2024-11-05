import { forwardRef, Ref } from 'react';

import cx from 'classnames';
import Link from 'next/link';

import ButtonBody from 'components/button//ButtonBody';
import styles from 'components/button/Button.module.scss';
import { IButtonProps } from 'components/button/types/buttonProps';

const Button = (
    { href, linkClassName, ...props }: IButtonProps,
    ref: Ref<HTMLButtonElement>,
): JSX.Element => {
    if (href) {
        return (
            <Link
                href={href}
                className={cx(linkClassName, styles.link)}
                style={{
                    pointerEvents: props.isDisabled ? 'none' : 'auto',
                }}
            >
                <ButtonBody {...props} ref={ref} />
            </Link>
        );
    }

    return <ButtonBody {...props} ref={ref} />;
};

export default forwardRef(Button);
