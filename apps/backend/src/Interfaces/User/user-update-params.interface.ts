import { UserUpdateDto } from '../../Dto';

export interface IUserUpdateParams {
  id: string;
  body: UserUpdateDto;
}
