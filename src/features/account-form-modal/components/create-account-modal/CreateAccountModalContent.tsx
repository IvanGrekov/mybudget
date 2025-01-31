import { FormProvider, useForm } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import {
    DEFAULT_ACCOUNT_ICON_NAME,
    DEFAULT_ENTITY_ICON_COLOR,
} from 'constants/entityIcons.constants';
import AccountFormContent from 'features/account-form-modal/components/account-form-content/AccountFormContent';
import { CREATE_ACCOUNT_FORM_VALIDATION } from 'features/account-form-modal/components/create-account-modal/constants/createAccountFormValidation';
import { useCreateAccount } from 'features/account-form-modal/components/create-account-modal/hooks/useCreateAccount';
import { getDefaultCurrency } from 'features/account-form-modal/components/create-account-modal/utils/getDefaultCurrency';
import { getDefaultType } from 'features/account-form-modal/components/create-account-modal/utils/getDefaultType';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import { AccountTypeEnum, User } from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface ICreateAccountModalContentProps {
    user: User;
    defaultAccountType: AccountTypeEnum;
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function CreateAccountModalContent({
    user,
    defaultAccountType,
    hideModal,
    onCloseModal,
}: ICreateAccountModalContentProps): JSX.Element {
    const { id: userId, defaultCurrency: userDefaultCurrency } = user;

    const methods = useForm<TCreateAccountFormValues>({
        defaultValues: {
            type: getDefaultType(defaultAccountType),
            currency: getDefaultCurrency(userDefaultCurrency),
            balance: 0,
            iconName: DEFAULT_ACCOUNT_ICON_NAME,
            iconColor: DEFAULT_ENTITY_ICON_COLOR,
        },
        resolver: CREATE_ACCOUNT_FORM_VALIDATION,
    });
    const { formState, watch, handleSubmit } = methods;
    const type = watch('type');

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const { mutate, isLoading } = useCreateAccount({
        userId,
        onCompleted: () => {
            disableNavigationConfirmation();
            hideModal();
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(mutate)}>
                <AccountFormContent type={type} />

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
