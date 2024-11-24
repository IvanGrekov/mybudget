export interface IPaginatedItemsResult<T> {
    items: T[];
    page: number;
    itemsPerPage: number;
    total: number;
}
