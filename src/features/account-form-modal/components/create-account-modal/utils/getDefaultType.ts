import { CreateAccountDtoTypeEnum } from 'types/generated.types';

export const getDefaultType = (
    defaultAccountType: string,
): CreateAccountDtoTypeEnum => {
    const values = Object.values(CreateAccountDtoTypeEnum);

    return (
        values.find((value) => value === defaultAccountType) ||
        CreateAccountDtoTypeEnum.REGULAR
    );
};
