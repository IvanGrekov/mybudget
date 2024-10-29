import {
    EditUserDto,
    EditUserCurrencyDto,
    User,
    AccountStatusEnum,
    AccountTypeEnum,
} from 'types/generated.types';

export interface IEditUserArgs extends EditUserDto {
    userId: User['id'];
}

export interface IEditUserCurrencyArgs extends EditUserCurrencyDto {
    userId: User['id'];
}

export interface IGetAccountsArgs {
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
}
