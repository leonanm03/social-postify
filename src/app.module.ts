import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';

@Module({
  imports: [UserModule, PublicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
