import { refreshTokens } from 'actions/refreshTokens';
import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';
import { getCookie } from 'utils/getCookie';

export class ClientMyBudgetApi extends MyBudgetApi {
    private async getNewAccessToken(): Promise<string> {
        const result = await refreshTokens().catch(() => null);

        if (!result?.accessToken) {
            return '';
        }

        return result.accessToken;
    }

    constructor() {
        const getAccessToken = async (): Promise<string> => {
            let token = getCookie(SESSION_COOKIE_NAME);

            if (!token) {
                token = await this.getNewAccessToken().catch((error) => {
                    console.error(error);

                    return null;
                });
            }

            return token || '';
        };

        super(getAccessToken, process.env.NEXT_PUBLIC_API_CLIENT_URL, true);
    }
}

export const CLIENT_MY_BUDGET_API = new ClientMyBudgetApi();
