import { useMemo } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ModalActions from 'components/modal/ModalActions';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import UserCurrencyFormContent from 'features/user-settings/components/user-currency-form-content/UserCurrencyFormContent';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-settings/components/user-currency-modal/constants/userCurrencyFormValidation';
import { getDefaultCurrency } from 'features/user-settings/components/user-currency-modal/utils/getDefaultCurrency';
import { TUserCurrencyFormData } from 'features/user-settings/types/userCurrencyFormData';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { getIsSubmitButtonDisabled } from 'utils/getIsSubmitButtonDisabled';

interface IUserCurrencyModalContentProps {
    userDefaultCurrency: UserDefaultCurrencyEnum;
    onClose: VoidFunction;
}

export default function UserCurrencyModalContent({
    userDefaultCurrency,
    onClose,
}: IUserCurrencyModalContentProps): JSX.Element {
    const defaultCurrency = useMemo(
        () => getDefaultCurrency(userDefaultCurrency),

        [userDefaultCurrency],
    );

    const methods = useForm<TUserCurrencyFormData>({
        defaultValues: {
            defaultCurrency,
            isAccountsCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencySoftUpdate: false,
            isTransactionCategoriesCurrencyForceUpdate: false,
        },
        resolver: USER_CURRENCY_FORM_VALIDATION,
    });

    const { formState, handleSubmit, watch, setValue } = methods;
    const { isDirty, errors } = formState;

    const onSubmit: SubmitHandler<TUserCurrencyFormData> = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };

    return (
        <>
            <UnderDevelopmentMessage />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserCurrencyFormContent
                        watch={watch}
                        setValue={setValue}
                    />

                    <ModalActions>
                        <CancelAction onCancel={onClose} />
                        <Button
                            text="Change"
                            type="submit"
                            // isLoading
                            isDisabled={getIsSubmitButtonDisabled({
                                isDirty,
                                errors,
                            })}
                        />
                    </ModalActions>
                </form>
            </FormProvider>
        </>
    );
}
