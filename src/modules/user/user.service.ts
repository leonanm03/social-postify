import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    console.log(`vou procurar pelo email ${email}`);

    const user = await this.userRepository.findUserByEmail(email);

    console.log(`achei o user`, user);
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
