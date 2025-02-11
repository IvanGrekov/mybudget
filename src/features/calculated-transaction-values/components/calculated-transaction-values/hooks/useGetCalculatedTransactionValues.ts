import { useQuery } from '@tanstack/react-query';

import { parseCalculatedTransactionValues } from 'features/calculated-transaction-values/components/calculated-transaction-values/utils/parseCalculatedTransactionValues';
import { ICalculatedTransactionValues } from 'features/calculated-transaction-values/types/calculatedTransactionValues';
import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { Maybe } from 'types/utility.types';
import { getCalculatedTransactionValuesQueryKey } from 'utils/queryKey.utils';

type TUseGetCalculatedTransactionValues = (args: {
    accountId?: number;
    categoryId?: number;
    from?: string;
    to?: string;
}) => { data: Maybe<ICalculatedTransactionValues>; isLoading: boolean };

export const useGetCalculatedTransactionValues: TUseGetCalculatedTransactionValues =
    ({ accountId, categoryId, from, to }) => {
        const { data, isPending, error } = useQuery({
            queryKey: getCalculatedTransactionValuesQueryKey({
                accountId,
                categoryId,
                from,
                to,
            }),
            queryFn: () =>
                CLIENT_MY_BUDGET_API.getCalculatedTransactionValues({
                    accountId,
                    categoryId,
                    from,
                    to,
                }),
        });

        useRequestErrorHandler(error);

        return {
            data: parseCalculatedTransactionValues(data),
            isLoading: isPending,
        };
    };
