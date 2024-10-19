/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Transaction {
    id: number;
    user: User;
    fromAccount?: Account;
    fromAccountUpdatedBalance?: number;
    toAccount?: Account;
    toAccountUpdatedBalance?: number;
    fromCategory?: TransactionCategory;
    toCategory?: TransactionCategory;
    type: TransactionTypeEnum;
    value: number;
    fee?: number;
    currency: TransactionCurrencyEnum;
    currencyRate?: number;
    description: string;
    /** @format date-time */
    createdAt: string;
}

export interface TransactionCategory {
    id: number;
    user: User;
    outgoingTransactions: Transaction[];
    incomingTransactions: Transaction[];
    children: TransactionCategory[];
    parent: TransactionCategory;
    name: string;
    type: TransactionCategoryTypeEnum;
    status: TransactionCategoryStatusEnum;
    currency: TransactionCategoryCurrencyEnum;
    order: number;
    /** @format date-time */
    createdAt: string;
}

export interface ApiKey {
    id: number;
    key: string;
    uuid: string;
    apiKey: string;
    user: User;
}

export interface User {
    /** Default currency for users accounts and transactions */
    defaultCurrency: UserDefaultCurrencyEnum;
    id: number;
    googleId: string;
    email: string;
    password: string;
    isTfaEnabled: boolean;
    tfaSecret: string;
    role: UserRoleEnum;
    accounts: Account[];
    transactionCategories: TransactionCategory[];
    transactions: Transaction[];
    nickname: string;
    timeZone: string;
    apiKeys: ApiKey[];
    /** @format date-time */
    createdAt: string;
}

export interface Account {
    id: number;
    user: User;
    outgoingTransactions: Transaction[];
    incomingTransactions: Transaction[];
    name: string;
    type: AccountTypeEnum;
    status: AccountStatusEnum;
    currency: AccountCurrencyEnum;
    balance: number;
    initBalance: number;
    shouldHideFromOverallBalance: boolean;
    shouldShowAsIncome: boolean;
    shouldShowAsExpense: boolean;
    order: number;
    /** @format date-time */
    createdAt: string;
}

export interface EditUserDto {
    email?: string;
    googleId?: string;
    password?: string;
    nickname?: string;
    timeZone?: string;
}

export interface EditUserCurrencyDto {
    /** @min 1 */
    rate: number;
    isAccountsCurrencySoftUpdate?: boolean;
    isTransactionCategoriesCurrencySoftUpdate?: boolean;
    isTransactionCategoriesCurrencyForceUpdate?: boolean;
    defaultCurrency?: EditUserCurrencyDtoDefaultCurrencyEnum;
}

export interface EditUserRoleDto {
    role: EditUserRoleDtoRoleEnum;
}

export interface CreateAccountDto {
    userId: number;
    name: string;
    type: CreateAccountDtoTypeEnum;
    currency: CreateAccountDtoCurrencyEnum;
    balance: number;
    shouldHideFromOverallBalance?: boolean;
    shouldShowAsIncome?: boolean;
    shouldShowAsExpense?: boolean;
}

export interface EditAccountDto {
    status?: EditAccountDtoStatusEnum;
    name?: string;
    balance?: number;
    shouldHideFromOverallBalance?: boolean;
    shouldShowAsIncome?: boolean;
    shouldShowAsExpense?: boolean;
}

export interface EditAccountCurrencyDto {
    /** @min 1 */
    rate: number;
    currency: EditAccountCurrencyDtoCurrencyEnum;
}

export interface ReorderAccountDto {
    order: number;
}

export interface CreateTransactionCategoryDto {
    userId: number;
    parentId?: number;
    name: string;
    type: CreateTransactionCategoryDtoTypeEnum;
    currency: CreateTransactionCategoryDtoCurrencyEnum;
}

export interface ReorderTransactionCategoryDto {
    id: number;
    order: number;
}

export interface ReorderParentTransactionCategoryDto {
    childNodes?: ReorderTransactionCategoryDto[];
    id: number;
    order: number;
}

export interface ReorderTransactionCategoriesDto {
    parentNodes: ReorderParentTransactionCategoryDto[];
}

export interface EditTransactionCategoryDto {
    status?: EditTransactionCategoryDtoStatusEnum;
    name?: string;
}

export interface EditTransactionCategoryCurrencyDto {
    currency: EditTransactionCategoryCurrencyDtoCurrencyEnum;
}

export interface CreateTransactionDto {
    userId: number;
    fromAccountId?: number;
    toAccountId?: number;
    fromCategoryId?: number;
    toCategoryId?: number;
    type: CreateTransactionDtoTypeEnum;
    /** @min 1 */
    value: number;
    /** @min 1 */
    fee?: number;
    /** @min 1 */
    currencyRate?: number;
    description?: string;
}

export interface EditTransactionDto {
    description?: string;
}

export interface CreateUserDto {
    email: string;
    googleId?: string;
    password?: string;
    nickname?: string;
    defaultCurrency?: CreateUserDtoDefaultCurrencyEnum;
    language?: CreateUserDtoLanguageEnum;
    timeZone?: string;
}

export interface GeneratedTokensDto {
    accessToken: string;
    refreshToken: string;
}

export interface SignInDto {
    password: string;
    tfaToken?: string;
    email: string;
}

export interface RefreshTokenDto {
    refreshToken: string;
}

export interface GoogleIdTokenDto {
    token: string;
}

export interface InitiateResetPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    email: string;
    newPassword: string;
    verificationCode: string;
}

export interface CreateApiKeyForUserDto {
    userId: number;
}

export interface GeneratedApiKeyDto {
    apiKey: string;
    hashedKey: string;
}

export interface GetApiKeyByUserIdDto {
    userId: number;
}

export enum TransactionTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER',
    BALANCE_CORRECTION = 'BALANCE_CORRECTION',
}

export enum TransactionCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum TransactionCategoryTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum TransactionCategoryStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum TransactionCategoryCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

/** Default currency for users accounts and transactions */
export enum UserDefaultCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum UserRoleEnum {
    Admin = 'admin',
    User = 'user',
}

export enum AccountTypeEnum {
    REGULAR = 'REGULAR',
    SAVINGS = 'SAVINGS',
    I_OWE = 'I_OWE',
    OWE_ME = 'OWE_ME',
}

export enum AccountStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum AccountCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum EditUserCurrencyDtoDefaultCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum EditUserRoleDtoRoleEnum {
    Admin = 'admin',
    User = 'user',
}

export enum CreateAccountDtoTypeEnum {
    REGULAR = 'REGULAR',
    SAVINGS = 'SAVINGS',
    I_OWE = 'I_OWE',
    OWE_ME = 'OWE_ME',
}

export enum CreateAccountDtoCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum EditAccountDtoStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum EditAccountCurrencyDtoCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum CreateTransactionCategoryDtoTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum CreateTransactionCategoryDtoCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum EditTransactionCategoryDtoStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum EditTransactionCategoryCurrencyDtoCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum CreateTransactionDtoTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER',
    BALANCE_CORRECTION = 'BALANCE_CORRECTION',
}

export enum CreateUserDtoDefaultCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    UAH = 'UAH',
    CZK = 'CZK',
    PLN = 'PLN',
}

export enum CreateUserDtoLanguageEnum {
    EN = 'EN',
    UA = 'UA',
}

export enum AccountsControllerFindMyParamsTypeEnum {
    REGULAR = 'REGULAR',
    SAVINGS = 'SAVINGS',
    I_OWE = 'I_OWE',
    OWE_ME = 'OWE_ME',
}

export enum AccountsControllerFindMyParamsStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum AccountsControllerFindAllParamsTypeEnum {
    REGULAR = 'REGULAR',
    SAVINGS = 'SAVINGS',
    I_OWE = 'I_OWE',
    OWE_ME = 'OWE_ME',
}

export enum AccountsControllerFindAllParamsStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum TransactionCategoriesControllerFindMyParamsTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum TransactionCategoriesControllerFindMyParamsStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum TransactionCategoriesControllerFindAllParamsTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum TransactionCategoriesControllerFindAllParamsStatusEnum {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export enum TransactionsControllerFindMyParamsTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER',
    BALANCE_CORRECTION = 'BALANCE_CORRECTION',
}

export enum TransactionsControllerFindAllParamsTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER',
    BALANCE_CORRECTION = 'BALANCE_CORRECTION',
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<
    FullRequestParams,
    'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
    extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = '';
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
        fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter(
            (key) => 'undefined' !== typeof query[key],
        );
        return keys
            .map((key) =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : this.addQueryParam(query, key),
            )
            .join('&');
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : '';
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null &&
            (typeof input === 'object' || typeof input === 'string')
                ? JSON.stringify(input)
                : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string'
                ? JSON.stringify(input)
                : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                          ? JSON.stringify(property)
                          : `${property}`,
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(
        params1: RequestParams,
        params2?: RequestParams,
    ): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected createAbortSignal = (
        cancelToken: CancelToken,
    ): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean'
                ? secure
                : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter =
            this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(
            `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
            {
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type && type !== ContentType.FormData
                        ? { 'Content-Type': type }
                        : {}),
                },
                signal:
                    (cancelToken
                        ? this.createAbortSignal(cancelToken)
                        : requestParams.signal) || null,
                body:
                    typeof body === 'undefined' || body === null
                        ? null
                        : payloadFormatter(body),
            },
        ).then(async (response) => {
            const r = response.clone() as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data;
                          } else {
                              r.error = data;
                          }
                          return r;
                      })
                      .catch((e) => {
                          r.error = e;
                          return r;
                      });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };
}

/**
 * @title My Budget
 * @version 1.0
 * @contact
 *
 * The My Budget API description
 */
export class Api<
    SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
    users = {
        /**
         * No description
         *
         * @tags users
         * @name UsersControllerGetNewName
         * @request GET:/users/name
         */
        usersControllerGetNewName: (params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/users/name`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerGetMe
         * @request GET:/users/me
         */
        usersControllerGetMe: (params: RequestParams = {}) =>
            this.request<User, any>({
                path: `/users/me`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerFindAll
         * @request GET:/users
         */
        usersControllerFindAll: (
            query?: {
                /**
                 * @min 1
                 * @default 10
                 */
                limit?: number;
                /**
                 * @min 1
                 * @default 1
                 */
                offset?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<User[], any>({
                path: `/users`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerGetOne
         * @request GET:/users/{id}
         */
        usersControllerGetOne: (id: number, params: RequestParams = {}) =>
            this.request<User, any>({
                path: `/users/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerEditOne
         * @request PATCH:/users/{id}
         */
        usersControllerEditOne: (
            id: number,
            data: EditUserDto,
            params: RequestParams = {},
        ) =>
            this.request<User, any>({
                path: `/users/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerDeleteOne
         * @request DELETE:/users/{id}
         */
        usersControllerDeleteOne: (id: number, params: RequestParams = {}) =>
            this.request<User, any>({
                path: `/users/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerEditCurrency
         * @request PATCH:/users/currency/{id}
         */
        usersControllerEditCurrency: (
            id: number,
            data: EditUserCurrencyDto,
            params: RequestParams = {},
        ) =>
            this.request<User, any>({
                path: `/users/currency/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersControllerEditRole
         * @request PATCH:/users/role/{id}
         */
        usersControllerEditRole: (
            id: number,
            data: EditUserRoleDto,
            params: RequestParams = {},
        ) =>
            this.request<User, any>({
                path: `/users/role/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    };
    accounts = {
        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerFindMy
         * @request GET:/accounts/my
         */
        accountsControllerFindMy: (
            query?: {
                type?: AccountsControllerFindMyParamsTypeEnum;
                status?: AccountsControllerFindMyParamsStatusEnum;
                excludeId?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Account[], any>({
                path: `/accounts/my`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerFindAll
         * @request GET:/accounts
         */
        accountsControllerFindAll: (
            query: {
                userId: number;
                type?: AccountsControllerFindAllParamsTypeEnum;
                status?: AccountsControllerFindAllParamsStatusEnum;
                excludeId?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Account[], any>({
                path: `/accounts`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerCreate
         * @request POST:/accounts
         */
        accountsControllerCreate: (
            data: CreateAccountDto,
            params: RequestParams = {},
        ) =>
            this.request<Account, any>({
                path: `/accounts`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerGetOne
         * @request GET:/accounts/{id}
         */
        accountsControllerGetOne: (id: number, params: RequestParams = {}) =>
            this.request<Account, any>({
                path: `/accounts/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerEditOne
         * @request PATCH:/accounts/{id}
         */
        accountsControllerEditOne: (
            id: number,
            data: EditAccountDto,
            params: RequestParams = {},
        ) =>
            this.request<Account, any>({
                path: `/accounts/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerDelete
         * @request DELETE:/accounts/{id}
         */
        accountsControllerDelete: (id: number, params: RequestParams = {}) =>
            this.request<Account, any>({
                path: `/accounts/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerEditOnesCurrency
         * @request PATCH:/accounts/currency/{id}
         */
        accountsControllerEditOnesCurrency: (
            id: number,
            data: EditAccountCurrencyDto,
            params: RequestParams = {},
        ) =>
            this.request<Account, any>({
                path: `/accounts/currency/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags accounts
         * @name AccountsControllerReorderOne
         * @request PATCH:/accounts/reorder/{id}
         */
        accountsControllerReorderOne: (
            id: number,
            data: ReorderAccountDto,
            params: RequestParams = {},
        ) =>
            this.request<Account[], any>({
                path: `/accounts/reorder/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    };
    transactionCategories = {
        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerFindMy
         * @request GET:/transaction-categories/my
         */
        transactionCategoriesControllerFindMy: (
            query?: {
                type?: TransactionCategoriesControllerFindMyParamsTypeEnum;
                status?: TransactionCategoriesControllerFindMyParamsStatusEnum;
                excludeId?: number;
                parentId?: number;
                shouldFilterChildTransactionCategories?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory[], any>({
                path: `/transaction-categories/my`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerFindAll
         * @request GET:/transaction-categories
         */
        transactionCategoriesControllerFindAll: (
            query: {
                userId: number;
                type?: TransactionCategoriesControllerFindAllParamsTypeEnum;
                status?: TransactionCategoriesControllerFindAllParamsStatusEnum;
                excludeId?: number;
                parentId?: number;
                shouldFilterChildTransactionCategories?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory[], any>({
                path: `/transaction-categories`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerCreate
         * @request POST:/transaction-categories
         */
        transactionCategoriesControllerCreate: (
            data: CreateTransactionCategoryDto,
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory, any>({
                path: `/transaction-categories`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerGetOne
         * @request GET:/transaction-categories/{id}
         */
        transactionCategoriesControllerGetOne: (
            id: number,
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory, any>({
                path: `/transaction-categories/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerEditOne
         * @request PATCH:/transaction-categories/{id}
         */
        transactionCategoriesControllerEditOne: (
            id: number,
            data: EditTransactionCategoryDto,
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory, any>({
                path: `/transaction-categories/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerDelete
         * @request DELETE:/transaction-categories/{id}
         */
        transactionCategoriesControllerDelete: (
            id: number,
            query?: {
                shouldRemoveChildTransactionCategories?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory, any>({
                path: `/transaction-categories/${id}`,
                method: 'DELETE',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerReorderOne
         * @request PATCH:/transaction-categories/reorder
         */
        transactionCategoriesControllerReorderOne: (
            data: ReorderTransactionCategoriesDto,
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory[], any>({
                path: `/transaction-categories/reorder`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transaction-categories
         * @name TransactionCategoriesControllerEditOnesCurrency
         * @request PATCH:/transaction-categories/currency/{id}
         */
        transactionCategoriesControllerEditOnesCurrency: (
            id: number,
            data: EditTransactionCategoryCurrencyDto,
            params: RequestParams = {},
        ) =>
            this.request<TransactionCategory, any>({
                path: `/transaction-categories/currency/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    };
    transactions = {
        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerFindMy
         * @request GET:/transactions/my
         */
        transactionsControllerFindMy: (
            query?: {
                /**
                 * @min 1
                 * @default 10
                 */
                limit?: number;
                /**
                 * @min 1
                 * @default 1
                 */
                offset?: number;
                accountId?: number;
                transactionCategoryId?: number;
                type?: TransactionsControllerFindMyParamsTypeEnum;
                search?: string;
                from?: string;
                to?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Transaction[], any>({
                path: `/transactions/my`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerFindAll
         * @request GET:/transactions
         */
        transactionsControllerFindAll: (
            query?: {
                /**
                 * @min 1
                 * @default 10
                 */
                limit?: number;
                /**
                 * @min 1
                 * @default 1
                 */
                offset?: number;
                userId?: number;
                accountId?: number;
                transactionCategoryId?: number;
                type?: TransactionsControllerFindAllParamsTypeEnum;
                search?: string;
                from?: string;
                to?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Transaction[], any>({
                path: `/transactions`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerCreate
         * @request POST:/transactions
         */
        transactionsControllerCreate: (
            data: CreateTransactionDto,
            params: RequestParams = {},
        ) =>
            this.request<Transaction, any>({
                path: `/transactions`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerGetOne
         * @request GET:/transactions/{id}
         */
        transactionsControllerGetOne: (
            id: number,
            params: RequestParams = {},
        ) =>
            this.request<Transaction, any>({
                path: `/transactions/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerEditOne
         * @request PATCH:/transactions/{id}
         */
        transactionsControllerEditOne: (
            id: number,
            data: EditTransactionDto,
            params: RequestParams = {},
        ) =>
            this.request<Transaction, any>({
                path: `/transactions/${id}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags transactions
         * @name TransactionsControllerDelete
         * @request DELETE:/transactions/{id}
         */
        transactionsControllerDelete: (
            id: number,
            params: RequestParams = {},
        ) =>
            this.request<Transaction, any>({
                path: `/transactions/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),
    };
    authentication = {
        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerSignUp
         * @request POST:/authentication/sign-up
         */
        authenticationControllerSignUp: (
            data: CreateUserDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedTokensDto, any>({
                path: `/authentication/sign-up`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerSignIn
         * @request POST:/authentication/sign-in
         */
        authenticationControllerSignIn: (
            data: SignInDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedTokensDto, any>({
                path: `/authentication/sign-in`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerRefreshToken
         * @request POST:/authentication/refresh-token
         */
        authenticationControllerRefreshToken: (
            data: RefreshTokenDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedTokensDto, any>({
                path: `/authentication/refresh-token`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerGoogleSignIn
         * @request POST:/authentication/google
         */
        authenticationControllerGoogleSignIn: (
            data: GoogleIdTokenDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedTokensDto, any>({
                path: `/authentication/google`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerInitiateResetPassword
         * @request POST:/authentication/initiate-reset-password
         */
        authenticationControllerInitiateResetPassword: (
            data: InitiateResetPasswordDto,
            params: RequestParams = {},
        ) =>
            this.request<void, any>({
                path: `/authentication/initiate-reset-password`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerResetPassword
         * @request POST:/authentication/reset-password
         */
        authenticationControllerResetPassword: (
            data: ResetPasswordDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedTokensDto, any>({
                path: `/authentication/reset-password`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerInitiateTfaEnabling
         * @request POST:/authentication/initiate-tfa-enabling
         */
        authenticationControllerInitiateTfaEnabling: (
            params: RequestParams = {},
        ) =>
            this.request<void, any>({
                path: `/authentication/initiate-tfa-enabling`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags authentication
         * @name AuthenticationControllerDisableTfa
         * @request POST:/authentication/enable-tfa
         */
        authenticationControllerDisableTfa: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/authentication/enable-tfa`,
                method: 'POST',
                ...params,
            }),
    };
    apiKeys = {
        /**
         * No description
         *
         * @tags api-keys
         * @name ApiKeysControllerCreateForUser
         * @request POST:/api-keys/createForUser
         */
        apiKeysControllerCreateForUser: (
            data: CreateApiKeyForUserDto,
            params: RequestParams = {},
        ) =>
            this.request<GeneratedApiKeyDto, any>({
                path: `/api-keys/createForUser`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags api-keys
         * @name ApiKeysControllerGetByUserId
         * @request GET:/api-keys/getByUserId
         */
        apiKeysControllerGetByUserId: (
            data: GetApiKeyByUserIdDto,
            params: RequestParams = {},
        ) =>
            this.request<string, any>({
                path: `/api-keys/getByUserId`,
                method: 'GET',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    };
}
