import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Creating a testing module for the AppController and AppService. */
describe('AppController', () => {
  let appController: AppController;

  /* Creating a testing module for the AppController and AppService. */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    /* Getting the AppController from the testing module. */
    appController = app.get<AppController>(AppController);
  });

  /* This is a test case. */
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
