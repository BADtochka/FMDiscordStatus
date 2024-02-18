import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { Context, ContextOf, Once } from 'necord';
import { BotService } from './bot.service';

@Injectable()
export class BotEvents {
  private readonly logger = new Logger(BotEvents.name);
  constructor(
    private readonly client: Client,
    private readonly botService: BotService,
  ) {}

  @Once('ready')
  onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot ${client.user.username} is online!`);
    this.botService.refreshStatusChannel();
  }
}
