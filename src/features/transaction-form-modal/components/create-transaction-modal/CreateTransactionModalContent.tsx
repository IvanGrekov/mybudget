import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import CreateTransactionFormContent from 'features/transaction-form-modal/components/create-transaction-form-content/CreateTransactionFormContent';
import { CREATE_TRANSACTION_FORM_VALIDATION } from 'features/transaction-form-modal/components/create-transaction-modal/constants/createTransactionFormValidation';
import { useCreateTransaction } from 'features/transaction-form-modal/components/create-transaction-modal/hooks/useCreateTransaction';
import { validateFormValuesOnSubmit } from 'features/transaction-form-modal/components/create-transaction-modal/utils/validateFormValuesOnSubmit';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
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

    const { mutate, isLoading } = useCreateTransaction({
        userId,
        onCompleted: () => {
            disableNavigationConfirmation();
            hideModal();
        },
    });

    const onSubmit = (values: TCreateTransactionFormValues): void => {
        const { isError, errorMessage } = validateFormValuesOnSubmit(values);

        if (!isError) {
            const {
                type,
                value,
                fee,
                currencyRate,
                description,
                fromAccount,
                toAccount,
                fromCategory,
                toCategory,
            } = values;

            return mutate({
                type: type as CreateTransactionDtoTypeEnum,
                value,
                fee: typeof fee === 'number' ? fee : undefined,
                currencyRate:
                    typeof currencyRate === 'number' ? currencyRate : undefined,
                description: description || undefined,
                fromAccountId: fromAccount?.id,
                toAccountId: toAccount?.id,
                fromCategoryId: fromCategory?.id,
                toCategoryId: toCategory?.id,
            });
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
                <CreateTransactionFormContent />

                <ModalActions>
                    <CancelAction onCancel={onCloseModal} />
                    <Button
                        text="Create"
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={getIsFormSubmitButtonDisabled(formState)}
                    />
                </ModalActions>
            </form>
        </FormProvider>
    );
}
