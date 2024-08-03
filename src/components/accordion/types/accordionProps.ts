import { PropsWithChildren } from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';

interface IAccordionItemProps {
    isOpen: boolean;
}

export interface IAccordionHeaderProps extends IAccordionItemProps {
    title: string;
    titleVariant?: TTypographyVariants;
    onClick: VoidFunction;
}

export type TAccordionContentProps = PropsWithChildren & IAccordionItemProps;

export type TAccordionProps = Pick<
    IAccordionHeaderProps,
    'title' | 'titleVariant'
> &
    Pick<TAccordionContentProps, 'children'> & {
        isSpaced?: boolean;
    };
