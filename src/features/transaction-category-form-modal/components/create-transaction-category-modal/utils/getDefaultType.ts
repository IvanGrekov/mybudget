import { CreateTransactionCategoryDtoTypeEnum } from 'types/generated.types';

export const getDefaultType = (
    defaultTransactionCategoryType: string,
): CreateTransactionCategoryDtoTypeEnum => {
    const values = Object.values(CreateTransactionCategoryDtoTypeEnum);

    return (
        values.find((value) => value === defaultTransactionCategoryType) ||
        CreateTransactionCategoryDtoTypeEnum.EXPENSE
    );
};
