import { Controller, Post, Body } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('publication')
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }
}
