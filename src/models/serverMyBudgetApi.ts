import { BaseMyBudgetApi } from 'models/myBudgetApi';
import { SERVER_API_CLIENT } from 'models/serverApiClient';

class ServerBaseMyBudgetApi extends BaseMyBudgetApi {
    constructor() {
        super(SERVER_API_CLIENT);
    }
}

export const SERVER_MY_BUDGET_API = new ServerBaseMyBudgetApi();
