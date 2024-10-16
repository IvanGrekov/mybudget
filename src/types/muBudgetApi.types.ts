import { EditUserDto, User } from 'types/generated.types';

export interface IEditUserArgs extends EditUserDto {
    userId: User['id'];
}
