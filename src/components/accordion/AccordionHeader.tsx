import cx from 'classnames';

import styles from 'components/accordion/Accordion.module.scss';
import { IAccordionHeaderProps } from 'components/accordion/types/accordionProps';
import IconButton from 'components/button/IconButton';
import ArrowIcon from 'components/icons/ArrowIcon';
import Typography from 'components/typography/Typography';

export default function AccordionHeader({
    title,
    titleVariant = 'subtitle2',
    isOpen,
    onClick,
}: IAccordionHeaderProps): JSX.Element {
    return (
        <div
            className={cx(styles.header, {
                [styles['header--open']]: isOpen,
            })}
        >
            <Typography
                element="h4"
                variant={titleVariant}
                className={styles.title}
            >
                {title}
            </Typography>

            <IconButton
                className={cx(styles.button, {
                    [styles['button--open']]: isOpen,
                })}
                iconSize={25}
                Icon={ArrowIcon}
                onClick={onClick}
            />
        </div>
    );
}
