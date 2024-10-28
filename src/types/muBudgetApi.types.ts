import { EditUserDto, EditUserCurrencyDto, User } from 'types/generated.types';

export interface IEditUserArgs extends EditUserDto {
    userId: User['id'];
}

export interface IEditUserCurrencyArgs extends EditUserCurrencyDto {
    userId: User['id'];
}
