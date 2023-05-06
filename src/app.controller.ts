import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { GetNextTickGameStateDto } from './dto/get-next-tick-game-state.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/templates')
  getExampleTemplates() {
    return this.appService.getExampleTemplates();
  }

  @Post('/nextTurn')
  getNextTurn(@Body() gameState: GetNextTickGameStateDto) {
    return this.appService.getNextTickGameState(gameState);
  }
}
