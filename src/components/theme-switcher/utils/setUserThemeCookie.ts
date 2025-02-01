import { setCookie } from 'actions/setCookie';
import { COOKIES_USER_THEME_KEY } from 'constants/cookiesKeys.constants';
import { ETheme } from 'types/theme';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getCookie } from 'utils/getCookie';
import { getIsCookiesAccepted } from 'utils/getIsCookiesAccepted';

export const setUserThemeCookie = (value: ETheme): void => {
    const currentValue = getCookie(COOKIES_USER_THEME_KEY);
    if (currentValue === value) {
        return;
    }

    const isCookiesAccepted = getIsCookiesAccepted();
    if (!isCookiesAccepted) {
        return;
    }

    try {
        setCookie({
            key: COOKIES_USER_THEME_KEY,
            value,
            // NOTE: 5 years
            maxAge: 60 * 60 * 24 * 365 * 5,
        });
    } catch (error) {
        getFailedResponse(error, 'set user theme cookie error');
    }
};
