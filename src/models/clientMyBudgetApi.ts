import { CLIENT_API_CLIENT } from 'models/clientApiClient';
import { BaseMyBudgetApi } from 'models/myBudgetApi';

class ClientBaseMyBudgetApi extends BaseMyBudgetApi {
    constructor() {
        super(CLIENT_API_CLIENT);
    }
}

export const CLIENT_MY_BUDGET_API = new ClientBaseMyBudgetApi();
