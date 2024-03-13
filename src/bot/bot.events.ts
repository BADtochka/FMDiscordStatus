import { Injectable, Logger } from '@nestjs/common';
import { ActivityType, Client } from 'discord.js';
import { Context, ContextOf, Once } from 'necord';
import { GameService } from 'src/game/game.service';
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
    const {maxPlayers, playersCount} = await this.gameService.getServerData() 
    client.user.setPresence({
      // activities: [{name: `${playersCount}/${maxPlayers}`, url: APP_CONFIG.connectUrl, type: ActivityType.Custom }]
      activities: [{name: 'huh', state: `Players: ${playersCount}/${maxPlayers}`, type: ActivityType.Custom }]
    })
    this.botService.refreshStatusChannel();
  }
}
