import { CSSProperties, PropsWithChildren } from 'react';

export interface IModalBaseProps {
    isOpen: boolean;
    onClose: VoidFunction;
}

export interface ILoaderProps {
    isLoading?: boolean;
}

export type TModalSize = 'small' | 'medium' | 'large';

export type TModalProps = IModalBaseProps &
    PropsWithChildren &
    ILoaderProps & {
        title: string;
        actions?: JSX.Element;
        size?: TModalSize;
        style?: CSSProperties;
        className?: string;
    };
