import { refreshTokens } from 'actions/refreshTokens';
import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';
import { getCookie } from 'utils/getCookie';
import log from 'utils/log';

export class ClientMyBudgetApi extends MyBudgetApi {
    private async getNewAccessToken(): Promise<string | null> {
        const result = await refreshTokens().catch(() => null);

        if (!result || 'error' in result) {
            log('failed to refresh tokens in client api', result);

            return null;
        }

        if (result.accessToken) {
            log('refreshing in client api', {
                accessToken: result.accessToken,
            });

            return result.accessToken;
        }

        return null;
    }

    constructor() {
        const getAccessToken = async (): Promise<string | null> => {
            let token = getCookie(SESSION_COOKIE_NAME);

            if (!token) {
                token = await this.getNewAccessToken().catch(() => null);
            }

            return token;
        };

        super(getAccessToken, process.env.NEXT_PUBLIC_API_CLIENT_URL, true);
    }
}

export const CLIENT_MY_BUDGET_API = new ClientMyBudgetApi();
