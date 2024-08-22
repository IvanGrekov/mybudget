import { PropsWithChildren } from 'react';

export interface IInputErrorProps {
    error?: string;
    disabled?: boolean;
    className?: string;
}

export type TBaseInputContainerProps = Pick<IInputErrorProps, 'error'> & {
    isFullWidth?: boolean;
    errorClassName?: IInputErrorProps['className'];
};

export type TInputContainerProps = PropsWithChildren &
    TBaseInputContainerProps &
    Pick<IInputErrorProps, 'disabled'> & {
        className?: string;
    };
