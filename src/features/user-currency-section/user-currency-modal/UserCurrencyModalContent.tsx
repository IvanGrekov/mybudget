import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import ModalActions from 'components/modal/ModalActions';
import UserCurrencyFormContent from 'features/user-currency-section/user-currency-form-content/UserCurrencyFormContent';
import styles from 'features/user-currency-section/user-currency-modal/UserCurrencyModalContent.module.scss';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-currency-section/user-currency-modal/constants/userCurrencyFormValidation';
import { useEditUserCurrency } from 'features/user-currency-section/user-currency-modal/hooks/useEditUserCurrency';
import { getDefaultCurrency } from 'features/user-currency-section/user-currency-modal/utils/getDefaultCurrency';
import { useConfirmNavigation } from 'hooks/formModalCloseConfirmation.hooks';
import {
    EditUserCurrencyDto,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';

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

    const { mutate, isLoading } = useEditUserCurrency({
        userId,
        onCompleted: hideModal,
        setError,
    });

    const { formState, handleSubmit } = methods;
    const { errors, dirtyFields, isDirty } = formState;

    useConfirmNavigation(isDirty);

    return (
        <div className={styles.container}>
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
                            isDisabled={
                                !dirtyFields.defaultCurrency ||
                                Object.keys(errors).length > 0
                            }
                        />
                    </ModalActions>
                </form>
            </FormProvider>
        </div>
    );
}
