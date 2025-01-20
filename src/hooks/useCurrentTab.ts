import { TAB_PARAM_NAME } from 'constants/tabParamName';
import { useGetSearchParamsValue } from 'hooks/searchParams.hooks';

export const useCurrentTab = (): string => {
    const currentTab = useGetSearchParamsValue(TAB_PARAM_NAME);

    return currentTab || '';
};
