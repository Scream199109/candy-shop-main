import {Controller, Get, UsePipes, ValidationPipe} from '@nestjs/common';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {CurrentUser} from 'src/auth/decorators/user.decorator';
import {StatisticsService} from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @UsePipes(new ValidationPipe())
  @Get('main')
  @Auth()
  async getMainStatistics(@CurrentUser('id') id: number) {
    return this.statisticsService.getMain(id)
  }
}
