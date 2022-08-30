import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* A decorator that is used to define the route for the controller. */
  @Get()
  getHello(): string {
    return this.appService.getApp();
  }
}
