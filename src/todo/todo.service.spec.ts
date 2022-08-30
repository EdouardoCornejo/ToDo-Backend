import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

/* The above code is creating a testing module and injecting the TodoService into it. */
describe('TodoService', () => {
  let service: TodoService;

  /* Creating a testing module and injecting the TodoService into it. */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    /* Getting the TodoService from the module. */
    service = module.get<TodoService>(TodoService);
  });

  /* Testing the service. */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
