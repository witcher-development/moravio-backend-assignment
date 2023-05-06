import { Injectable } from '@nestjs/common';
import { GetNextTickGameStateDto } from './dto/get-next-tick-game-state.dto';
import { nextGameState, templates } from './core';

@Injectable()
export class AppService {
  getNextTickGameState(
    gameState: GetNextTickGameStateDto,
  ): GetNextTickGameStateDto {
    return {
      liveCellsCoords: nextGameState(gameState.liveCellsCoords),
    };
  }

  getExampleTemplates() {
    return templates;
  }
}
