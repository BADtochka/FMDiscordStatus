import { Module } from '@nestjs/common';
import { BotService } from 'src/bot/bot.service';
import { GameService } from './game.service';

@Module({
  // controllers: [GameController],
  providers: [GameService, BotService],
  exports: [GameService],
})
export class GameModule {}
