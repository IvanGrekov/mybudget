import { IButtonProps } from 'components/button/types/buttonProps';
import { TModalProps } from 'components/modal/types/modalProps';

export interface IConfirmActionProps {
    confirmText?: string;
    confirmColor?: IButtonProps['color'];
    isLoading?: boolean;
    isDisabled?: boolean;
    onConfirm: () => void;
}

export interface ICancelActionProps {
    cancelText?: string;
    onCancel: () => void;
}

export type TConfirmationModalProps = Omit<TModalProps, 'actions' | 'title'> &
    IConfirmActionProps &
    ICancelActionProps & {
        title?: string;
    };
