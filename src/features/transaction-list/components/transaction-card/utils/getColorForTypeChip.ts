import { IChipProps } from 'components/chip/types/chipProps';
import { TransactionTypeEnum } from 'types/generated.types';

export const getColorForTypeChip = (
    type: TransactionTypeEnum,
): IChipProps['color'] => {
    switch (type) {
        case TransactionTypeEnum.EXPENSE:
            return 'error';
        case TransactionTypeEnum.INCOME:
            return 'success';
        case TransactionTypeEnum.TRANSFER:
            return 'info';
        default:
            return undefined;
    }
};
