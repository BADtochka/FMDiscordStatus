// import { Controller, Post } from '@nestjs/common';
// import { GameService } from './game.service';

// @Controller('game')
// export class GameController {
//   constructor(private readonly gameService: GameService) {}

//   @Post('player/joining')
//   async playerJoin() {
//     console.log('join event');
//     return await this.gameService.onPlayerJoin();
//   }

//   @Post('player/dropped')
//   async playerDropped() {
//     console.log('dropped event');
//     return await this.gameService.onPlayerDropped();
//   }
// }
