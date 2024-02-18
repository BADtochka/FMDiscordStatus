export const APP_CONFIG = {
  /**
   * Discord bot token. process.env.DISCORD_BOT_TOKEN is used by default, but you can set it to 'TOKEN'
   */
  token: process.env.DISCORD_BOT_TOKEN || '',

  /**
   * Bot ID
   */
  botId: '11111111111111111',

  /**
   * Channel ID for send/update message with status of FiveM server
   */
  channelId: '22222222222222222',

  /**
   * FiveM server ip. For example: 127.0.0.1:30120
   */
  serverIp: '127.0.0.1:30120',

  /**
   * Update interval in minutes
   */
  interval: 1,
};
