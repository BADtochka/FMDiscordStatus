import { APP_CONFIG } from '@config/app';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { NecordModule } from 'necord';
import { BotModule } from './bot/bot.module';
import { GameModule } from './game/game.module';
import { IntervalsModule } from './intervals/intervals.module';

dotenv.config();

@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN || APP_CONFIG.token,
      intents: [GatewayIntentBits.Guilds],
    }),
    ScheduleModule.forRoot(),
    GameModule,
    BotModule,
    IntervalsModule,
  ],
  providers: [],
})
export class AppModule {}
