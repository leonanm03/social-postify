import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { UserRequest } from '../auth/decorators/user-request.decorator';
import { User } from '@prisma/client';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UserRequest() user: User,
  ) {
    const { id } = user;
    return this.publicationService.create(id, createPublicationDto);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  getMyPublications(@UserRequest() user: User) {
    const { id } = user;
    return this.publicationService.findByUserId(id);
  }
}
