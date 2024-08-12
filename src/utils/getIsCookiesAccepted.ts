import { COOKIES_ACCEPTED_STORAGE_KEY } from 'constants/cookiesAcceptedStorageKey';
import { getCookie } from 'utils/getCookie';

export const getIsCookiesAccepted = (): boolean => {
    return Boolean(getCookie(COOKIES_ACCEPTED_STORAGE_KEY));
};
