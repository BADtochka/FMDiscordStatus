import { Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { StatusUpdateService } from './status.update.service';

@Module({
  imports: [BotModule],
  providers: [StatusUpdateService],
})
export class IntervalsModule {}
