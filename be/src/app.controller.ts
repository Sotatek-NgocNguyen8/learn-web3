import { Controller, Query, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-transfer-by-src')
  getTransferBySrc(@Query('src') src: string): any {
    return this.appService.getTransferBySrc(src);
  }

  @Get('/get-deposit-by-des')
  getdepositBySrc(@Query('src') src: string): any {
    return this.appService.getDepositByDes(src);
  }

  @Get('/get-withdrawal-by-src')
  getWithDrawalBySrc(@Query('src') src: string): any {
    return this.appService.getWithDrawalBySrc(src);
  }
}
