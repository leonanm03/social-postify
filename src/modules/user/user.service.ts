import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findUserByEmail(email);
    if (user)
      new HttpException('This email is already in use!', HttpStatus.CONFLICT);

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
