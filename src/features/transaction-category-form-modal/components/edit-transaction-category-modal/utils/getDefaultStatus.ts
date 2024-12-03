import { EditTransactionCategoryDtoStatusEnum } from 'types/generated.types';

export const getDefaultStatus = (
    status: string,
): EditTransactionCategoryDtoStatusEnum => {
    const values = Object.values(EditTransactionCategoryDtoStatusEnum);

    return (
        values.find((value) => value === status) ||
        EditTransactionCategoryDtoStatusEnum.ACTIVE
    );
};
