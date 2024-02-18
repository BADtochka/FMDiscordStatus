import { APP_CONFIG } from '@config/app';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GamePlayersData, GameServerData, GameServerInfo } from './game.types';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  // async onPlayerJoin(): Promise<string> {
  //   await this.botService.refreshStatusChannel();
  //   return 'join';
  // }

  // async onPlayerDropped(): Promise<string> {
  //   await this.botService.refreshStatusChannel();
  //   return 'dropped';
  // }

  async getServerData(): Promise<GameServerData | null> {
    if (!APP_CONFIG.serverIp) {
      this.logger.error('Server IP is not defined!');
      return null;
    }
    try {
      const { data: serverInfo } = await axios.get<GameServerInfo>(`http://${APP_CONFIG.serverIp}/info.json`);
      if (!serverInfo) return null;
      const { data: playersData } = await axios.get<GamePlayersData>(`http://${APP_CONFIG.serverIp}/players.json`);

      const playerList = playersData.map((player) => player.name);

      const serverData: GameServerData = {
        serverName: serverInfo.vars.sv_projectName,
        // serverDesc: serverInfo.vars.sv_projectDesc,
        maxPlayers: serverInfo.vars.sv_maxClients,
        playersCount: playersData.length,
        playersList: playerList,
      };

      return serverData;
    } catch (e) {
      console.log(e);
      this.logger.error(e);
    }
  }
}
