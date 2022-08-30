import { Injectable } from '@nestjs/common';

@Injectable()
/* It's a class that has a method called getApp that returns a string */
export class AppService {
  getApp(): string {
    return 'Todo App';
  }
}
