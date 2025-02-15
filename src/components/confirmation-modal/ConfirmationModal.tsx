import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import { TConfirmationModalProps } from 'components/confirmation-modal/types/confirmationModal.props';
import Modal from 'components/modal/Modal';
import { useGetActionButtonsTranslations } from 'hooks/translations.hooks';

export default function ConfirmationModal({
    confirmText,
    confirmColor,
    isLoading,
    children,
    onConfirm,
    onCancel,
    ...rest
}: TConfirmationModalProps): JSX.Element {
    const translatedTitle = useGetActionButtonsTranslations()('confirm_action');

    return (
        <Modal
            {...rest}
            title={translatedTitle}
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
