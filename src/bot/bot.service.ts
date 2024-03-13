import { APP_CONFIG } from '@config/app';
import { Injectable, Logger } from '@nestjs/common';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { GameService } from 'src/game/game.service';
import { removeNumeric } from 'src/utils/removeNumeric';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    private readonly client: Client,
    private readonly gameService: GameService,
  ) {}

  async generateEmbed() {
    const embed = new EmbedBuilder();
    embed.setDescription('🇧 🇪 🇹 🇦');
    const serverData = await this.gameService.getServerData();

    if (!serverData) {
      this.logger.error('Failed to get server data!');
      return embed.setColor('Red').setDescription('❌ Failed to get server data!');
    }

    const playerList = serverData.playersList.map((player) => removeNumeric(player));

    const fields = playerList.reduce((acc, player, index, array) => {
      const third = Math.ceil(array.length / 3);
      const fieldIndex = Math.floor(index / third);
      if (!acc[fieldIndex]) {
        acc[fieldIndex] = {
          name: fieldIndex === 0 ? 'Players:' : '\u200B',
          value: '',
          inline: true,
        };
      }
      acc[fieldIndex].value += `${player}\n`;
      return acc;
    }, []);

    const nonEmptyFields = fields.filter((field) => field.value.trim());

    embed.addFields([
      {
        inline: true,
        name: 'Server name',
        value: `🪪 ${removeNumeric(serverData.serverName)}`,
      },
      {
        inline: true,
        name: 'Players count',
        value: `🧑‍🦽 ${serverData.playersCount}/${serverData.maxPlayers}`,
      },
      {
        inline: true,
        name: '​',
        value: '​',
      },
      // {
      //   name: 'Server description',
      //   value: serverData.serverDesc,
      // },
    ]);

    embed.addFields(nonEmptyFields);

    return embed;
  }

  async generateButtons(): Promise<ActionRowBuilder<ButtonBuilder>[] | undefined> {
    if (APP_CONFIG.connectUrl && APP_CONFIG.connectUrl.length > 0) {
      const connectButton = new ButtonBuilder()
      .setLabel('Connect')
      .setStyle(ButtonStyle.Link)
      .setURL(APP_CONFIG.connectUrl);
      const actionRow = new ActionRowBuilder<ButtonBuilder>({
        components: [connectButton]
      })

      return [actionRow]
    }
  }

  async refreshStatusChannel() {
    if (String(APP_CONFIG.channelId).length === 0 || typeof APP_CONFIG.channelId !== 'string') {
      return this.logger.error('Channel ID must be a string and not empty!');
    }
    const channel = await this.client.channels.fetch(APP_CONFIG.channelId);

    if (channel.isTextBased()) {
      await this.createOrUpdateMessage(channel);
    }
  }

  async createOrUpdateMessage(channel?: TextBasedChannel) {
    if (!channel) return this.logger.error('Channel not found!');

    const messages = await channel.messages.fetch();

    const firstMessage = messages.last(); // discord fetch messages from newest to oldest, so we need to get the last (first) message in array
    if (!firstMessage) {
      const embed = await this.generateEmbed();
      return await channel.send({ embeds: [embed] });
    } else if (firstMessage.author.id !== APP_CONFIG.botId) {
      return this.logger.error('First message in channel is not from bot!');
    }

    const embed = await this.generateEmbed();
    const components = await this.generateButtons()
    await firstMessage.edit({ embeds: [embed], components: components });
  }
}
