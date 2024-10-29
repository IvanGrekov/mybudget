import { TAB_PARAM_NAME } from 'constants/tabParamName';

export const getCurrentTab = (url: string): string => {
    const urlSearchParams = new URL(url).searchParams;

    return urlSearchParams.get(TAB_PARAM_NAME) || '';
};
