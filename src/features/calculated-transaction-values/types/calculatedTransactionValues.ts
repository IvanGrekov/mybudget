export interface ICalculatedTransactionValuesItem {
    // NOTE: key is Currency
    overall: number;
    [key: string]: number;
}

export interface ICalculatedTransactionValues {
    from?: ICalculatedTransactionValuesItem;
    to?: ICalculatedTransactionValuesItem;
}
