'use client';

import { PropsWithChildren, forwardRef, Ref } from 'react';

import Chip from 'components/chip/Chip';
import { useIsMobile } from 'hooks/screenSize.hooks';

interface IHeaderChipProps extends PropsWithChildren {
    title: string;
}

function HeaderChip(
    { title, children }: IHeaderChipProps,
    ref: Ref<HTMLDivElement>,
): JSX.Element {
    const isMobile = useIsMobile();

    return (
        <Chip
            ref={ref}
            title={title}
            variant="outlined"
            size={isMobile ? 'regular' : 'big'}
            titleVariant="subtitle1"
        >
            {children}
        </Chip>
    );
}

export default forwardRef(HeaderChip);
