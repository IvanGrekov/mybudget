import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FormSelectField from 'components/form-fields/FormSelectField';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { USER_CURRENCY_FORM_FIELD_NAMES } from 'features/user-settings/constants/userCurrencyForm.constants';
import { useGetSettingsTranslations } from 'hooks/translations.hooks';
import {
    EditUserCurrencyDto,
    EditUserCurrencyDtoDefaultCurrencyEnum,
} from 'types/generated.types';
import { roundCurrencyRate } from 'utils/roundCurrencyRate';

const OPTIONS = Object.values(EditUserCurrencyDtoDefaultCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    const { formState, setValue, watch } =
        useFormContext<EditUserCurrencyDto>();

    const currentUserCurrency = formState.defaultValues?.['defaultCurrency'];
    const selectedCurrency = watch('defaultCurrency');

    const exchangeRates = useExchangeRatesContext(currentUserCurrency);

    useEffect(() => {
        setValue('rate', exchangeRates[selectedCurrency], {
            shouldDirty: true,
            shouldTouch: true,
        });
    }, [exchangeRates, selectedCurrency, setValue]);

    const label = useGetSettingsTranslations()('new_default_currency');

    return (
        <FormSelectField
            name={USER_CURRENCY_FORM_FIELD_NAMES.defaultCurrency}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => {
                if (option === currentUserCurrency) {
                    return option;
                }

                return `${option} (${roundCurrencyRate(
                    exchangeRates[option],
                )})`;
            }}
        />
    );
}
