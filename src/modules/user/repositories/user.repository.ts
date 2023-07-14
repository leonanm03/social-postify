import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
}
