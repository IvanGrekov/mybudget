import cx from 'classnames';

import styles from 'components/accordion/Accordion.module.scss';
import { useContentHeight } from 'components/accordion/hooks/useContentHeight';
import { TAccordionContentProps } from 'components/accordion/types/accordionProps';

export default function AccordionContent({
    isOpen,
    children,
}: TAccordionContentProps): JSX.Element {
    const { childrenWrapperRef, contentHeight } = useContentHeight(isOpen);

    return (
        <div
            className={cx(styles.content, {
                [styles['content--open']]: isOpen,
            })}
            style={{
                height: contentHeight,
            }}
        >
            <div ref={childrenWrapperRef}>{children}</div>
        </div>
    );
}
