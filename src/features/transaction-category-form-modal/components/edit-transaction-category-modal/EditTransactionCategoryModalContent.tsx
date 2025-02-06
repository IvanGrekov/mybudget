import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import {
    DEFAULT_CATEGORY_ICON_NAME,
    DEFAULT_ENTITY_ICON_COLOR,
} from 'constants/entityIcons.constants';
import { EDIT_TRANSACTION_CATEGORY_FORM_VALIDATION } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/constants/editTransactionCategoryFormValidation';
import { useEditTransactionCategory } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/hooks/useEditTransactionCategory';
import { IEditTransactionCategoryModalDataProps } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/types/editTransactionCategoryModalDataProps';
import { getDefaultStatus } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/utils/getDefaultStatus';
import { getShouldEditTransactionCategory } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/utils/getShouldEditTransactionCategory';
import TransactionCategoryFormContent from 'features/transaction-category-form-modal/components/transaction-category-form-content/TransactionCategoryFormContent';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { EditTransactionCategoryDto } from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface IEditTransactionCategoryModalContentProps
    extends IEditTransactionCategoryModalDataProps {
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function EditTransactionCategoryModalContent({
    transactionCategory,
    parentId,
    hasChildren,
    hideModal,
    onCloseModal,
    onArchive,
}: IEditTransactionCategoryModalContentProps): JSX.Element {
    const { name, status, iconName, iconColor } = transactionCategory;

    const methods = useForm<EditTransactionCategoryDto>({
        defaultValues: {
            status: getDefaultStatus(status),
            name,
            iconName: iconName || DEFAULT_CATEGORY_ICON_NAME,
            iconColor: iconColor || DEFAULT_ENTITY_ICON_COLOR,
        },
        resolver: EDIT_TRANSACTION_CATEGORY_FORM_VALIDATION,
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const onCompleted = (): void => {
        disableNavigationConfirmation();
        hideModal();
    };

    const { mutate, isLoading } = useEditTransactionCategory({
        transactionCategory,
        parentId,
        hasChildren,
        onCompleted,
        onArchive,
    });

    const submit = (data: EditTransactionCategoryDto): void => {
        if (getShouldEditTransactionCategory({ transactionCategory, data })) {
            mutate(data);
        } else {
            onCompleted();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <TransactionCategoryFormContent isEdit={true} />

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
