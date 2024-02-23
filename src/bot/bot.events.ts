import { APP_CONFIG } from '@config/app';
import { Injectable, Logger } from '@nestjs/common';
import { ActivityType, Client } from 'discord.js';
import { Context, ContextOf, Once } from 'necord';
import { GameService } from 'src/game/game.service';
import { removeNumeric } from 'src/utils/removeNumeric';
import { BotService } from './bot.service';

@Injectable()
export class BotEvents {
  private readonly logger = new Logger(BotEvents.name);
  constructor(
    private readonly client: Client,
    private readonly botService: BotService,
    private readonly gameService: GameService
  ) {}

  @Once('ready')
  async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot ${client.user.username} is online!`);
    const {serverName} = await this.gameService.getServerData() 
    client.user.setPresence({
      activities: [{name: removeNumeric(serverName), url: APP_CONFIG.connectUrl, type: ActivityType.Playing }]
    })
    this.botService.refreshStatusChannel();
  }
}
