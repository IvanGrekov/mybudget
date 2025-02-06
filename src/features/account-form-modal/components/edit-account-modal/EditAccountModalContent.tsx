import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import {
    DEFAULT_ACCOUNT_ICON_NAME,
    DEFAULT_ENTITY_ICON_COLOR,
} from 'constants/entityIcons.constants';
import AccountFormContent from 'features/account-form-modal/components/account-form-content/AccountFormContent';
import { EDIT_ACCOUNT_FORM_VALIDATION } from 'features/account-form-modal/components/edit-account-modal/constants/editAccountFormValidation';
import { useEditAccount } from 'features/account-form-modal/components/edit-account-modal/hooks/useEditAccount';
import { IEditAccountModalDataProps } from 'features/account-form-modal/components/edit-account-modal/types/editAccountModalDataProps';
import { getDefaultStatus } from 'features/account-form-modal/components/edit-account-modal/utils/getDefaultStatus';
import { getShouldEditAccount } from 'features/account-form-modal/components/edit-account-modal/utils/getShouldEditAccount';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { EditAccountDto } from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface IEditAccountModalContentProps extends IEditAccountModalDataProps {
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function EditAccountModalContent({
    account,
    hideModal,
    onCloseModal,
}: IEditAccountModalContentProps): JSX.Element {
    const {
        status,
        type,
        name,
        balance,
        shouldHideFromOverallBalance,
        shouldShowAsExpense,
        shouldShowAsIncome,
        iconName,
        iconColor,
    } = account;

    const methods = useForm<EditAccountDto>({
        defaultValues: {
            status: getDefaultStatus(status),
            name,
            balance,
            shouldHideFromOverallBalance,
            shouldShowAsExpense,
            shouldShowAsIncome,
            iconName: iconName || DEFAULT_ACCOUNT_ICON_NAME,
            iconColor: iconColor || DEFAULT_ENTITY_ICON_COLOR,
        },
        resolver: EDIT_ACCOUNT_FORM_VALIDATION,
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const onCompleted = (): void => {
        disableNavigationConfirmation();
        hideModal();
    };

    const { mutate, isLoading } = useEditAccount({
        account,
        onCompleted,
    });

    const submit = (data: EditAccountDto): void => {
        if (getShouldEditAccount({ account, data })) {
            mutate(data);
        } else {
            onCompleted();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <AccountFormContent type={type} isEdit={true} />

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
