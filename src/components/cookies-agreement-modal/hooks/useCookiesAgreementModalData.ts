import { useCallback, useMemo } from 'react';

import { setCookie } from 'actions/setCookie';
import { COOKIES_ACCEPTED_STORAGE_KEY } from 'constants/cookiesKeys.constants';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getCookie } from 'utils/getCookie';

interface IUseCookiesAgreementModalDataResult {
    shouldShowModal: boolean;
    acceptCookies: VoidFunction;
    declineCookies: VoidFunction;
}

export const useCookiesAgreementModalData =
    (): IUseCookiesAgreementModalDataResult => {
        const shouldShowModal = useMemo(() => {
            if (!getCookie(COOKIES_ACCEPTED_STORAGE_KEY)) {
                return true;
            }

            return false;
        }, []);

        const acceptCookies = useCallback(() => {
            try {
                setCookie({
                    key: COOKIES_ACCEPTED_STORAGE_KEY,
                    value: 'true',
                });
            } catch (error) {
                getFailedResponse(error, 'accept cookie error');
            }
        }, []);

        const declineCookies = useCallback(() => {
            try {
                setCookie({
                    key: COOKIES_ACCEPTED_STORAGE_KEY,
                    value: 'false',
                    // NOTE: 1 week
                    maxAge: 60 * 60 * 24 * 7,
                });
            } catch (error) {
                getFailedResponse(error, 'decline cookie error');
            }
        }, []);

        return {
            shouldShowModal,
            acceptCookies,
            declineCookies,
        };
    };
