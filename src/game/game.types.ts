export interface GameServerInfo {
  vars: {
    locale: string;
    sv_maxClients: string;
    // sv_projectDesc: string;
    sv_projectName: string;
  };
}

export type GamePlayersData = Array<{
  endpoint: string;
  id: number;
  identifiers: Array<string>;
  name: string;
  ping: number;
}>;

export interface GameServerData {
  serverName: GameServerInfo['vars']['sv_projectName'];
  // serverDesc: GameServerInfo['vars']['sv_projectDesc'];
  playersCount: number;
  maxPlayers: GameServerInfo['vars']['sv_maxClients'];
  playersList: string[];
}
