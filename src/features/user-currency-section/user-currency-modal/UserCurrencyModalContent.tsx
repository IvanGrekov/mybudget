import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import ModalActions from 'components/modal/ModalActions';
import UserCurrencyFormContent from 'features/user-currency-section/user-currency-form-content/UserCurrencyFormContent';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-currency-section/user-currency-modal/constants/userCurrencyFormValidation';
import { useEditUserCurrency } from 'features/user-currency-section/user-currency-modal/hooks/useEditUserCurrency';
import { getDefaultCurrency } from 'features/user-currency-section/user-currency-modal/utils/getDefaultCurrency';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import {
    EditUserCurrencyDto,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';
import { getIsFormSubmitButtonDisabled } from 'utils/getIsFormSubmitButtonDisabled';

interface IUserCurrencyModalContentProps {
    userId: number;
    userDefaultCurrency: UserDefaultCurrencyEnum;
    hideModal: VoidFunction;
    onCloseModal: VoidFunction;
}

export default function UserCurrencyModalContent({
    userId,
    userDefaultCurrency,
    hideModal,
    onCloseModal,
}: IUserCurrencyModalContentProps): JSX.Element {
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<EditUserCurrencyDto>({
        defaultValues: {
            defaultCurrency: getDefaultCurrency(userDefaultCurrency),
            isAccountsCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencyForceUpdate: false,
        },
        resolver: USER_CURRENCY_FORM_VALIDATION,
    });
    const { formState, handleSubmit } = methods;

    const disableNavigationConfirmation = useConfirmNavigation(
        formState.dirtyFields,
    );

    const { mutate, isLoading } = useEditUserCurrency({
        userId,
        onCompleted: () => {
            disableNavigationConfirmation();
            hideModal();
        },
        setError,
    });

    return (
        <DefaultModalContainer>
            {error && <ErrorMessage message={error} />}

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(mutate)}>
                    <UserCurrencyFormContent />

                    <ModalActions>
                        <CancelAction onCancel={onCloseModal} />
                        <Button
                            text="Change"
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={getIsFormSubmitButtonDisabled(
                                formState,
                            )}
                        />
                    </ModalActions>
                </form>
            </FormProvider>
        </DefaultModalContainer>
    );
}
