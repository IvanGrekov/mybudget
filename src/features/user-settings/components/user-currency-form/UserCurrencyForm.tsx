import { useMemo } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import Typography from 'components/typography/Typography';
import { USER_CURRENCY_FORM_VALIDATION } from 'features/user-settings/components/user-currency-form/constants/userCurrencyForm.constants';
import { TUserCurrencyFormData } from 'features/user-settings/components/user-currency-form/types/userCurrencyFormData';
import { getDefaultCurrency } from 'features/user-settings/components/user-currency-form/utils/getDefaultCurrency';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { getIsSubmitButtonDisabled } from 'utils/getIsSubmitButtonDisabled';

interface IUserCurrencyFormProps {
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencyForm({
    userDefaultCurrency,
}: IUserCurrencyFormProps): JSX.Element {
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

    const { formState, handleSubmit } = methods;
    const { isDirty, errors } = formState;

    const onSubmit: SubmitHandler<TUserCurrencyFormData> = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset
                    title="New User Default Currency"
                    actions={
                        <Button
                            text="Save"
                            type="submit"
                            // isLoading
                            isDisabled={getIsSubmitButtonDisabled({
                                isDirty,
                                errors,
                            })}
                        />
                    }
                >
                    <Typography>
                        Current currency:{' '}
                        <Typography
                            element="span"
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            {userDefaultCurrency}
                        </Typography>
                    </Typography>
                </Fieldset>
            </form>
        </FormProvider>
    );
}
