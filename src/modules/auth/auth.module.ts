import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { PrismaUserRepository } from '../user/repositories/implementations/prisma-user.repository';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
