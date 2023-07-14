import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, PublicationModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
