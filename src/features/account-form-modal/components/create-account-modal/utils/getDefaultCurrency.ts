import { CreateAccountDtoCurrencyEnum } from 'types/generated.types';

export const getDefaultCurrency = (
    userCurrency: string,
): CreateAccountDtoCurrencyEnum => {
    const values = Object.values(CreateAccountDtoCurrencyEnum);

    return (
        values.find((value) => value === userCurrency) ||
        CreateAccountDtoCurrencyEnum.USD
    );
};
