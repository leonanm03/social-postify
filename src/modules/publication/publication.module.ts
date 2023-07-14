import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { PrismaUserRepository } from '../user/repositories/implementations/prisma-user.repository';
import { PublicationRepository } from './repositories/publication.repository';
import { PrismaPublicationRepository } from './repositories/implementations/prisma-publication.repository';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    AuthService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PublicationService,
    {
      provide: PublicationRepository,
      useClass: PrismaPublicationRepository,
    },
  ],
})
export class PublicationModule {}
