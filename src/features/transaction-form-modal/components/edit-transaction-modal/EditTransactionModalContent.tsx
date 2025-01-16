import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import DescriptionField from 'features/transaction-form-modal/components/create-transaction-form-content/DescriptionField';
import { EDIT_TRANSACTION_FORM_VALIDATION } from 'features/transaction-form-modal/components/edit-transaction-modal/constants/editTransactionFormValidation';
import { useEditTransaction } from 'features/transaction-form-modal/components/edit-transaction-modal/hooks/useEditTransaction';
import { IEditTransactionModalDataProps } from 'features/transaction-form-modal/components/edit-transaction-modal/types/editTransactionModalDataProps';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import styles from 'styles/Form.module.scss';
import { EditTransactionDto } from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface IEditTransactionModalContentProps
    extends IEditTransactionModalDataProps {
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function EditTransactionModalContent({
    transaction,
    hideModal,
    onCloseModal,
}: IEditTransactionModalContentProps): JSX.Element {
    const { id: transactionId, description } = transaction;

    const methods = useForm<EditTransactionDto>({
        resolver: EDIT_TRANSACTION_FORM_VALIDATION,
        defaultValues: {
            description,
        },
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const { mutate, isLoading } = useEditTransaction({
        transactionId,
        onCompleted: () => {
            disableNavigationConfirmation();
            hideModal();
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(mutate)}>
                <div className={styles.container}>
                    <DescriptionField />
                </div>

                <ModalActions>
                    <CancelAction onCancel={onCloseModal} />
                    <Button
                        text="Edit"
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={getIsFormSubmitButtonDisabled(formState)}
                    />
                </ModalActions>
            </form>
        </FormProvider>
    );
}
