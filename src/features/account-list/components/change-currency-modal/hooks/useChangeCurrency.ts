import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editAccountCurrency } from 'actions/editAccountCurrency';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { getUpdateAccountCurrency } from 'features/account-list/components/change-currency-modal/utils/getUpdateAccountCurrency';
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
        onSuccess: () => {
            const updateAccountCurrency = getUpdateAccountCurrency({
                id,
                currency,
                rate,
            });

            queryClient.setQueryData(
                getAccountsQueryKey({
                    type,
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

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Account currency',
                    isEditing: true,
                }),
            });
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    return {
        change: mutate,
        isLoading: isPending,
    };
};
