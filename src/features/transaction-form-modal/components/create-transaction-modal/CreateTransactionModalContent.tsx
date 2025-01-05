import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import CreateTransactionFormContent from 'features/transaction-form-modal/components/create-transaction-form-content/CreateTransactionFormContent';
import { CREATE_TRANSACTION_FORM_VALIDATION } from 'features/transaction-form-modal/components/create-transaction-modal/constants/createTransactionFormValidation';
import { validateFormValuesOnSubmit } from 'features/transaction-form-modal/components/create-transaction-modal/utils/validateFormValuesOnSubmit';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface ICreateTransactionModalContentProps {
    userId: number;
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function CreateTransactionModalContent({
    userId,
    hideModal,
    onCloseModal,
}: ICreateTransactionModalContentProps): JSX.Element {
    const addErrorMessageToNotifications = useAddErrorMessageToNotifications();

    const methods = useForm<TCreateTransactionFormValues>({
        resolver: CREATE_TRANSACTION_FORM_VALIDATION,
        defaultValues: {
            value: 0,
            fee: 0,
            description: '',
        },
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const onSubmit = (values: TCreateTransactionFormValues): void => {
        const { isError, errorMessage } = validateFormValuesOnSubmit(values);

        if (!isError) {
            userId;
            hideModal;
            disableNavigationConfirmation;

            return;
        }

        if (errorMessage) {
            addErrorMessageToNotifications({
                message: errorMessage,
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <UnderDevelopmentMessage />

                <CreateTransactionFormContent />

                <ModalActions>
                    <CancelAction onCancel={onCloseModal} />
                    <Button
                        text="Create"
                        type="submit"
                        // TODO: Pass the correct isLoading state
                        isLoading={false}
                        isDisabled={getIsFormSubmitButtonDisabled(formState)}
                    />
                </ModalActions>
            </form>
        </FormProvider>
    );
}
