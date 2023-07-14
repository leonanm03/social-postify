import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationRepository } from '../publication.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaPublicationRepository implements PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PublicationCreateInput) {
    return await this.prisma.publication.create({ data });
  }

  async findAllPublications() {
    return await this.prisma.publication.findMany({});
  }

  async findPublicationById(id: number) {
    return await this.prisma.publication.findUnique({ where: { id } });
  }
}
