import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import { CREATE_TRANSACTION_CATEGORY_FORM_VALIDATION } from 'features/transaction-category-form-modal/components/create-transaction-category-modal/constants/createTransactionCategoryFormValidation';
import { useCreateTransactionCategory } from 'features/transaction-category-form-modal/components/create-transaction-category-modal/hooks/useCreateTransactionCategory';
import { getDefaultCurrency } from 'features/transaction-category-form-modal/components/create-transaction-category-modal/utils/getDefaultCurrency';
import { getDefaultType } from 'features/transaction-category-form-modal/components/create-transaction-category-modal/utils/getDefaultType';
import TransactionCategoryFormContent from 'features/transaction-category-form-modal/components/transaction-category-form-content/TransactionCategoryFormContent';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { User, TransactionCategoryTypeEnum } from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface ICreateTransactionCategoryModalContentProps {
    user: User;
    defaultTransactionCategoryType: TransactionCategoryTypeEnum;
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function CreateTransactionCategoryModalContent({
    user,
    defaultTransactionCategoryType,
    hideModal,
    onCloseModal,
}: ICreateTransactionCategoryModalContentProps): JSX.Element {
    const { id: userId, defaultCurrency: userDefaultCurrency } = user;

    const methods = useForm<TCreateTransactionCategoryFormValues>({
        defaultValues: {
            type: getDefaultType(defaultTransactionCategoryType),
            currency: getDefaultCurrency(userDefaultCurrency),
        },
        resolver: CREATE_TRANSACTION_CATEGORY_FORM_VALIDATION,
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const { mutate, isLoading } = useCreateTransactionCategory({
        userId,
        onCompleted: () => {
            disableNavigationConfirmation();
            hideModal();
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(mutate)}>
                <TransactionCategoryFormContent />

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
