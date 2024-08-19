import { IGetAccountsArgs } from 'types/api.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User, Account } from 'types/generated.types';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

export class Api {
    private constructor() {}

    private static getApiKey(): string {
        return process.env.API_KEY || '';
    }

    private static getBaseHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: Api.getApiKey(),
        };
    }

    static async getUser(id: string): Promise<User> {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            headers: Api.getBaseHeaders(),
        });

        return await response.json();
    }

    static async getAccounts({ userId }: IGetAccountsArgs): Promise<Account[]> {
        const response = await fetch(`${BASE_URL}/accounts?userId=${userId}`, {
            next: { tags: [EFetchingTags.ACCOUNTS] },
            headers: Api.getBaseHeaders(),
        });

        return await response.json();
    }
}
