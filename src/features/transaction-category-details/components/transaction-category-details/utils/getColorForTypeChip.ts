import { IChipProps } from 'components/chip/types/chipProps';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

export const getColorForTypeChip = (
    type: TransactionCategoryTypeEnum,
): IChipProps['color'] => {
    switch (type) {
        case TransactionCategoryTypeEnum.INCOME:
            return 'success';
        case TransactionCategoryTypeEnum.EXPENSE:
            return 'error';
        default:
            return undefined;
    }
};
