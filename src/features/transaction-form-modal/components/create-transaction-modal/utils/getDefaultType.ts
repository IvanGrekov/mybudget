import { CreateTransactionDtoTypeEnum } from 'types/generated.types';

export const getDefaultType = (
    defaultType?: string,
): CreateTransactionDtoTypeEnum | undefined => {
    if (!defaultType) {
        return;
    }

    const values = Object.values(CreateTransactionDtoTypeEnum).filter(
        (value) => value !== CreateTransactionDtoTypeEnum.BALANCE_CORRECTION,
    );

    return values.find((value) => value === defaultType);
};
