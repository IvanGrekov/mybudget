import { MouseEvent, PropsWithChildren, ReactNode } from 'react';

import { TTypographyVariants } from 'components/typography/types/typographyVariants';

export interface IChipProps extends PropsWithChildren {
    title: ReactNode;
    variant?: 'contained' | 'outlined';
    size?: 'small' | 'regular' | 'big';
    color?: 'success' | 'error' | 'info';
    titleVariant?: TTypographyVariants;
    buttonTabIndex?: number;
    className?: string;
    onClick?: VoidFunction;
    onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
}
