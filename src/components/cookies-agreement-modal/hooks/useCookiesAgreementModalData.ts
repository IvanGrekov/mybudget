import { useCallback, useMemo } from 'react';

import { setCookie } from 'actions/setCookie';
import { COOKIES_ACCEPTED_STORAGE_KEY } from 'constants/cookiesKeys.constants';
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
            setCookie({
                key: COOKIES_ACCEPTED_STORAGE_KEY,
                value: 'true',
            });
        }, []);

        const declineCookies = useCallback(() => {
            setCookie({
                key: COOKIES_ACCEPTED_STORAGE_KEY,
                value: 'false',
                // NOTE: 1 week
                maxAge: 60 * 60 * 24 * 7,
            });
        }, []);

        return {
            shouldShowModal,
            acceptCookies,
            declineCookies,
        };
    };
