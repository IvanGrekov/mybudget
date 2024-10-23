import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';

export const getIsActiveSession = (
    cookiesStore: ReturnType<typeof cookies>,
): boolean => {
    return !!cookiesStore.get(SESSION_COOKIE_NAME)?.value;
};
