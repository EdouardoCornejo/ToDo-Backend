import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

/* The above code is creating a testing module for the TodoController. */
describe('TodoController', () => {
  let controller: TodoController;

  /* Creating a testing module for the TodoController. */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  /* This is a test that checks if the controller is defined. */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
