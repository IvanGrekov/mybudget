import { IChipProps } from 'components/chip/types/chipProps';
import { AccountTypeEnum } from 'types/generated.types';

export const getColorForTypeChip = (
    type: AccountTypeEnum,
): IChipProps['color'] => {
    switch (type) {
        case AccountTypeEnum.REGULAR:
            return 'info';
        case AccountTypeEnum.SAVINGS:
            return 'success';
        case AccountTypeEnum.OWE_ME:
            return 'warning';
        case AccountTypeEnum.I_OWE:
            return 'error';
        default:
            return undefined;
    }
};
