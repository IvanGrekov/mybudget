import 'server-only';

import { cookies, headers } from 'next/headers';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';
import { Maybe } from 'types/utility.types';
import { extractSessionCookieValueFromSetCookieHeader } from 'utils/extractSessionCookieValueFromSetCookieHeader';

export class ServerMyBudgetApi extends MyBudgetApi {
    constructor() {
        const getAccessToken = (): Promise<string | null> => {
            let token: Maybe<string> =
                cookies().get(SESSION_COOKIE_NAME)?.value;

            if (!token) {
                token = extractSessionCookieValueFromSetCookieHeader(
                    headers().get('set-cookie'),
                );
            }

            return Promise.resolve(token);
        };

        super(getAccessToken, process.env.NEXT_PUBLIC_API_URL);
    }
}

export const SERVER_MY_BUDGET_API = new ServerMyBudgetApi();
