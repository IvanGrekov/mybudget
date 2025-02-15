import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import DescriptionField from 'features/transaction-form-modal/components/create-transaction-form-content/DescriptionField';
import { EDIT_TRANSACTION_FORM_VALIDATION } from 'features/transaction-form-modal/components/edit-transaction-modal/constants/editTransactionFormValidation';
import { useEditTransaction } from 'features/transaction-form-modal/components/edit-transaction-modal/hooks/useEditTransaction';
import { IEditTransactionModalDataProps } from 'features/transaction-form-modal/components/edit-transaction-modal/types/editTransactionModalDataProps';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetActionButtonsTranslations } from 'hooks/translations.hooks';
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

    const onCompleted = (): void => {
        disableNavigationConfirmation();
        hideModal();
    };

    const { mutate, isLoading } = useEditTransaction({
        transactionId,
        onCompleted,
    });

    const submitText = useGetActionButtonsTranslations()('edit');

    const submit = (values: EditTransactionDto): void => {
        if (values.description !== description) {
            mutate(values);
        } else {
            onCompleted();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <div className={styles.container}>
                    <DescriptionField />
                </div>

                <ModalActions>
                    <CancelAction onCancel={onCloseModal} />
                    <Button
                        text={submitText}
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={getIsFormSubmitButtonDisabled(formState)}
                    />
                </ModalActions>
            </form>
        </FormProvider>
    );
}
