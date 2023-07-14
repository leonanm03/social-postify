import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepository.findUserByEmail(email);
    if (user)
      throw new HttpException(
        'This email is already in use!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
