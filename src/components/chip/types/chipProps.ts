import { MouseEvent } from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export interface IChipProps {
    title: string;
    variant?: 'contained' | 'outlined';
    size?: 'small' | 'regular' | 'big';
    titleVariant?: TTypographyVariants;
    buttonTabIndex?: number;
    className?: string;
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
}
