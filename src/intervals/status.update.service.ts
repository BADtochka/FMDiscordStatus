import { APP_CONFIG } from '@config/app';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class StatusUpdateService {
  constructor(private readonly botService: BotService) {}

  @Interval('statusUpdate', APP_CONFIG.interval * 1000 * 60)
  onInterval() {
    this.botService.refreshStatusChannel();
    this.botService.updateRPCStatus()
  }
}
