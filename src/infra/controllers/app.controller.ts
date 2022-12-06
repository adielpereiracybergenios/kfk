import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/domain/services/app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMessage() {
    await this.appService.produce();
    return await this.appService.consume();
  }
}
