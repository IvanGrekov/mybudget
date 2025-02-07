'use client';

import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import TopArrowIcon from 'components/icons/TopArrowIcon';
import styles from 'components/scroll-top-button/ScrollTopButton.module.scss';
import { useScrollTopButton } from 'components/scroll-top-button/hooks/useScrollTopButton';

interface IScrollTopButtonProps {
    className?: string;
}

export default function ScrollTopButton({
    className,
}: IScrollTopButtonProps): JSX.Element {
    const { isVisible, onClick } = useScrollTopButton();

    return (
        <div
            className={cx(styles.wrapper, {
                [styles['wrapper--visible']]: isVisible,
            })}
        >
            <IconButton
                title="Scroll to top"
                Icon={TopArrowIcon}
                className={cx(styles.button, className, {
                    [styles['button--visible']]: isVisible,
                })}
                onClick={onClick}
            />
        </div>
    );
}
