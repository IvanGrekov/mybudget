import { CSSProperties, PropsWithChildren } from 'react';

export interface IModalBaseProps {
    isOpen: boolean;
    onClose: VoidFunction;
}

export interface ILoaderProps {
    isLoading?: boolean;
}

export type TModalProps = IModalBaseProps &
    PropsWithChildren &
    ILoaderProps & {
        title?: string;
        actions: JSX.Element;
        style?: CSSProperties;
        className?: string;
    };
