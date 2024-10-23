import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';
import { getCookie } from 'utils/getCookie';

export class ClientMyBudgetApi extends MyBudgetApi {
    constructor() {
        super(() => {
            return getCookie(SESSION_COOKIE_NAME) || '';
        }, process.env.NEXT_PUBLIC_API_CLIENT_URL);
    }
}

export const CLIENT_MY_BUDGET_API = new ClientMyBudgetApi();
