import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editAccountCurrency } from 'actions/editAccountCurrency';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { getUpdateAccountCurrency } from 'features/change-account-currency-modal/utils/getUpdateAccountCurrency';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    Account,
    AccountTypeEnum,
    EditAccountCurrencyDtoCurrencyEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getAccountsQueryKey,
    getSingleAccountQueryKey,
} from 'utils/queryKey.utils';

type TUseChangeCurrency = (args: {
    id: number;
    type: AccountTypeEnum;
    initialCurrency: EditAccountCurrencyDtoCurrencyEnum;
    currency: EditAccountCurrencyDtoCurrencyEnum;
}) => {
    change: VoidFunction;
    isLoading: boolean;
};

export const useChangeCurrency: TUseChangeCurrency = ({
    id,
    type,
    initialCurrency,
    currency,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const baseExchangeRates = useExchangeRatesContext(initialCurrency);
    const rate = baseExchangeRates[currency];

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return editAccountCurrency({
                id,
                currency,
                rate,
            });
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            const updateAccountCurrency = getUpdateAccountCurrency({
                id,
                currency,
                rate,
            });

            queryClient.setQueryData(
                getAccountsQueryKey({
                    types: [type],
                }),
                (oldAccountList?: Account[]) =>
                    oldAccountList?.map(updateAccountCurrency) || [],
            );

            queryClient.setQueryData(
                getAccountsQueryKey(),
                (oldAllAccountList?: Account[]) =>
                    oldAllAccountList?.map(updateAccountCurrency) || [],
            );

            queryClient.setQueryData(
                getSingleAccountQueryKey(id),
                updateAccountCurrency,
            );

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Account currency',
                    isEditing: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        change: mutate,
        isLoading: isPending,
    };
};
