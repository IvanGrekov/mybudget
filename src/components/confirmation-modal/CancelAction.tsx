import Button from 'components/button/Button';
import { ICancelActionProps } from 'components/confirmation-modal/types/confirmationModal.props';
import { useGetActionButtonsTranslations } from 'hooks/translations.hooks';

export default function CancelAction({
    cancelText,
    onCancel,
}: ICancelActionProps): JSX.Element {
    const buttonText = useGetActionButtonsTranslations()('cancel');

    return (
        <Button
            text={cancelText || buttonText}
            variant="outlined"
            onClick={onCancel}
        />
    );
}
