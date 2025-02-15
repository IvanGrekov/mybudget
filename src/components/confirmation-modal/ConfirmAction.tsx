import Button from 'components/button/Button';
import { IConfirmActionProps } from 'components/confirmation-modal/types/confirmationModal.props';
import { useGetActionButtonsTranslations } from 'hooks/translations.hooks';
import { getCapitalizedString } from 'utils/string.utils';

export default function ConfirmAction({
    confirmText = 'confirm',
    confirmColor,
    isLoading,
    isDisabled,
    onConfirm,
}: IConfirmActionProps): JSX.Element {
    const submitText = useGetActionButtonsTranslations()(confirmText);

    return (
        <Button
            text={getCapitalizedString(submitText)}
            isLoading={isLoading}
            isDisabled={isDisabled}
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
        />
    );
}
