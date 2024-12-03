import { EditAccountDtoStatusEnum } from 'types/generated.types';

export const getDefaultStatus = (status: string): EditAccountDtoStatusEnum => {
    const values = Object.values(EditAccountDtoStatusEnum);

    return (
        values.find((value) => value === status) ||
        EditAccountDtoStatusEnum.ACTIVE
    );
};
