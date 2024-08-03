import { PropsWithChildren } from 'react';

export interface IInputErrorProps {
    error?: string;
    disabled?: boolean;
    className?: string;
}

export type TBaseInputContainerProps = Pick<IInputErrorProps, 'error'> & {
    errorClassName?: IInputErrorProps['className'];
};

export type TInputContainerProps = PropsWithChildren &
    TBaseInputContainerProps &
    Pick<IInputErrorProps, 'disabled'> & {
        className?: string;
    };
