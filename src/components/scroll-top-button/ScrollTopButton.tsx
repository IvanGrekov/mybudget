'use client';

import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import TopArrowIcon from 'components/icons/TopArrowIcon';
import styles from 'components/scroll-top-button/ScrollTopButton.module.scss';
import { useScrollTopButton } from 'components/scroll-top-button/hooks/useScrollTopButton';
import Tooltip from 'components/tooltip/Tooltip';

interface IScrollTopButtonProps {
    className?: string;
}

export default function ScrollTopButton({
    className,
}: IScrollTopButtonProps): JSX.Element {
    const { isVisible, onClick } = useScrollTopButton();

    return (
        <div className={styles.wrapper}>
            <Tooltip text="Scroll to top">
                <IconButton
                    Icon={TopArrowIcon}
                    className={cx(
                        styles.button,
                        {
                            [styles['button--visible']]: isVisible,
                        },
                        className,
                    )}
                    onClick={onClick}
                />
            </Tooltip>
        </div>
    );
}
