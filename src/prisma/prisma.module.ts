import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/* Exporting the PrismaService so that it can be used in other modules. */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
