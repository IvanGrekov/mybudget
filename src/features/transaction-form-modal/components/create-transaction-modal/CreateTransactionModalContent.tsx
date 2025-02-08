import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import CreateTransactionFormContent from 'features/transaction-form-modal/components/create-transaction-form-content/CreateTransactionFormContent';
import { CREATE_TRANSACTION_FORM_VALIDATION } from 'features/transaction-form-modal/components/create-transaction-modal/constants/createTransactionFormValidation';
import { useCreateTransaction } from 'features/transaction-form-modal/components/create-transaction-modal/hooks/useCreateTransaction';
import { ICreateTransactionModalDataProps } from 'features/transaction-form-modal/components/create-transaction-modal/types/createTransactionModalDataProps';
import { getDefaultType } from 'features/transaction-form-modal/components/create-transaction-modal/utils/getDefaultType';
import { validateFormValuesOnSubmit } from 'features/transaction-form-modal/components/create-transaction-modal/utils/validateFormValuesOnSubmit';
import { TCreateTransactionFormValues } from 'features/transaction-form-modal/types/createTransactionFormValues';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import {
    CreateTransactionDtoTypeEnum,
    TransactionTypeEnum,
} from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface ICreateTransactionModalContentProps
    extends ICreateTransactionModalDataProps {
    userId: number;
    defaultType?: TransactionTypeEnum;
    refetchTransactionList: VoidFunction;
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function CreateTransactionModalContent({
    userId,
    defaultType,
    refetchTransactionList,
    hideModal,
    onCloseModal,
    ...dataProps
}: ICreateTransactionModalContentProps): JSX.Element {
    const addErrorMessage = useAddErrorMessageToNotifications();

    const methods = useForm<TCreateTransactionFormValues>({
        resolver: CREATE_TRANSACTION_FORM_VALIDATION,
        defaultValues: {
            type: getDefaultType(defaultType),
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
        refetchTransactionList,
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
        } else {
            addErrorMessage(errorMessage || DEFAULT_ERROR_MESSAGE);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CreateTransactionFormContent {...dataProps} />

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
