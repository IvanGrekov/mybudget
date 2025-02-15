import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import { TConfirmationModalProps } from 'components/confirmation-modal/types/confirmationModal.props';
import Modal from 'components/modal/Modal';

export default function ConfirmationModal({
    title = 'Confirm Action',
    confirmText,
    confirmColor,
    isLoading,
    children,
    onConfirm,
    onCancel,
    ...rest
}: TConfirmationModalProps): JSX.Element {
    return (
        <Modal
            {...rest}
            title={title}
            isConfirmationModal={true}
            actions={
                <>
                    <CancelAction onCancel={onCancel} />
                    <ConfirmAction
                        confirmText={confirmText}
                        confirmColor={confirmColor}
                        isLoading={isLoading}
                        onConfirm={onConfirm}
                    />
                </>
            }
        >
            {children}
        </Modal>
    );
}
