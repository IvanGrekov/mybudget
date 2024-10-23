import 'server-only';

import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';

export class ServerMyBudgetApi extends MyBudgetApi {
    constructor() {
        super(() => {
            return cookies().get(SESSION_COOKIE_NAME)?.value || '';
        }, process.env.NEXT_PUBLIC_API_URL);
    }
}

export const SERVER_MY_BUDGET_API = new ServerMyBudgetApi();
