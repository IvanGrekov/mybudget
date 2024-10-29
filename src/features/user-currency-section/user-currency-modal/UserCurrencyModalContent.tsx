import { useMemo, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import ModalActions from 'components/modal/ModalActions';
import UserCurrencyFormContent from 'features/user-currency-section/user-currency-form-content/UserCurrencyFormContent';
import styles from 'features/user-currency-section/user-currency-modal/UserCurrencyModalContent.module.scss';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-currency-section/user-currency-modal/constants/userCurrencyFormValidation';
import { useEditUserCurrency } from 'features/user-currency-section/user-currency-modal/hooks/useEditUserCurrency';
import { getDefaultCurrency } from 'features/user-currency-section/user-currency-modal/utils/getDefaultCurrency';
import {
    EditUserCurrencyDto,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';

interface IUserCurrencyModalContentProps {
    userId: number;
    userDefaultCurrency: UserDefaultCurrencyEnum;
    onClose: VoidFunction;
}

export default function UserCurrencyModalContent({
    userId,
    userDefaultCurrency,
    onClose,
}: IUserCurrencyModalContentProps): JSX.Element {
    const [error, setError] = useState<string | null>(null);

    const defaultCurrency = useMemo(
        () => getDefaultCurrency(userDefaultCurrency),

        [userDefaultCurrency],
    );

    const methods = useForm<EditUserCurrencyDto>({
        defaultValues: {
            defaultCurrency,
            isAccountsCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencyForceUpdate: false,
        },
        resolver: USER_CURRENCY_FORM_VALIDATION,
    });

    const { mutate, isLoading } = useEditUserCurrency({
        userId,
        onCompleted: onClose,
        setError,
    });

    const onSubmit: SubmitHandler<EditUserCurrencyDto> = (data) => {
        mutate(data);
    };

    const { formState, handleSubmit } = methods;
    const { errors, dirtyFields } = formState;

    return (
        <div className={styles.container}>
            {error && <ErrorMessage message={error} />}

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserCurrencyFormContent />

                    <ModalActions>
                        <CancelAction onCancel={onClose} />
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
