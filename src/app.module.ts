import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PublicationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
