import ConfirmationModal from 'components/confirmation-modal/ConfirmationModal';
import Typography from 'components/typography/Typography';

interface IConfirmDeletingModalProps {
    isConfirmationModalOpen: boolean;
    setIsConfirmationModalOpen: (value: boolean) => void;
    entityName: string;
    remove: VoidFunction;
}

export default function ConfirmDeletingModal({
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    entityName,
    remove,
}: IConfirmDeletingModalProps): JSX.Element {
    const closeConfirmationModal = (): void =>
        setIsConfirmationModalOpen(false);

    return (
        <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            confirmText="Delete"
            confirmColor="red"
            onClose={closeConfirmationModal}
            onCancel={closeConfirmationModal}
            onConfirm={() => {
                closeConfirmationModal();
                remove();
            }}
        >
            <Typography>
                Are you sure you want to delete this {entityName}?
            </Typography>
        </ConfirmationModal>
    );
}
