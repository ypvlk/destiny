import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../Entities';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async findFullById(id: string): Promise<any> {
    return this.findOne(id);
  }

  async findFullByEmail(email: string): Promise<UserEntity | null> {
    const query = this.createQueryBuilder('us').where('us.email = :email', { email });
    const item = await query.getOne();
    return item ?? null;
  }

  // async findById(id: string): Promise<UserEntity | null> {
  //   return await this.createQueryBuilder('users')
  //     .select(['users.id', 'users.email', 'users.password', 'test.user_id'])
  //     // .leftJoin('users.extendedOptions', 'test')
  //     .leftJoinAndSelect('users.extendedOptions', 'test') // достенет всю row
  //     .where('users.id = :id', { id })
  //     .getOne();
  // }
}
