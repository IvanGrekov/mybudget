import Button from 'components/button/Button';
import { IConfirmActionProps } from 'components/confirmation-modal/types/confirmationModal.props';

export default function ConfirmAction({
    confirmText = 'Confirm',
    confirmColor,
    isLoading,
    onConfirm,
}: IConfirmActionProps): JSX.Element {
    return (
        <Button
            text={confirmText}
            isLoading={isLoading}
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
        />
    );
}
