import { useState } from 'react';

import cx from 'classnames';

import styles from 'components/accordion/Accordion.module.scss';
import AccordionContent from 'components/accordion/AccordionContent';
import AccordionHeader from 'components/accordion/AccordionHeader';
import { TAccordionProps } from 'components/accordion/types/accordionProps';

export default function Accordion({
    title,
    titleVariant,
    children,
    isSpaced = true,
}: TAccordionProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (): void => {
        setIsOpen((prev) => !prev);
    };

    return (
        <article
            className={cx(styles.accordion, {
                [styles['accordion--open']]: isOpen,
                [styles['accordion--spaced']]: isSpaced,
            })}
        >
            <AccordionHeader
                isOpen={isOpen}
                title={title}
                titleVariant={titleVariant}
                onClick={toggleAccordion}
            />

            <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
        </article>
    );
}
