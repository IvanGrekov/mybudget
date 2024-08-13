import { COOKIES_ACCEPTED_STORAGE_KEY } from 'constants/cookiesKeys.constants';
import { getCookie } from 'utils/getCookie';

export const getIsCookiesAccepted = (): boolean => {
    return getCookie(COOKIES_ACCEPTED_STORAGE_KEY) === 'true';
};
