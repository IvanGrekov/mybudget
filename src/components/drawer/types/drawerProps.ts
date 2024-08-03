import { PropsWithChildren, ReactNode, CSSProperties } from 'react';

export interface IDrawerProps extends PropsWithChildren {
    isOpen: boolean;
    position?: 'left' | 'right';
    shouldAddCloseButton?: boolean;
    header?: ReactNode;
    style?: CSSProperties;
    className?: string;
    onClose: VoidFunction;
}
