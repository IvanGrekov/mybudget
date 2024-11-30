import { EditAccountDtoStatusEnum } from 'types/generated.types';

export const getDefaultStatus = (
    userCurrency: string,
): EditAccountDtoStatusEnum => {
    const values = Object.values(EditAccountDtoStatusEnum);

    return (
        values.find((value) => value === userCurrency) ||
        EditAccountDtoStatusEnum.ACTIVE
    );
};
