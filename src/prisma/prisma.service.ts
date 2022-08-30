import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/* It extends the PrismaClient class and implements the OnModuleInit interface */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /** It connects to the database.*/
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * It adds a listener to the process object that will close the NestJS application when the process
   * is about to exit
   * @param {INestApplication} app - INestApplication - The Nest application instance
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
