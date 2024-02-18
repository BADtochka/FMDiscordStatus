import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { BotEvents } from './bot.events';
import { BotService } from './bot.service';

@Module({
  imports: [GameModule],
  providers: [BotEvents, BotService],
  exports: [BotService],
})
export class BotModule {}
