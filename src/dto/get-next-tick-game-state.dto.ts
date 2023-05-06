import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { Coords } from '../core';

const isTupleOfNumbers = (tuple: any) => {
  return (
    Array.isArray(tuple) &&
    tuple.length === 2 &&
    typeof tuple[0] === 'number' &&
    typeof tuple[1] === 'number'
  );
};

@ValidatorConstraint({ name: 'liveCells', async: false })
export class LiveCellsCoordsValidator implements ValidatorConstraintInterface {
  validate(liveCells: Coords[]) {
    return (
      Array.isArray(liveCells) &&
      !liveCells.some((cell) => !isTupleOfNumbers(cell))
    );
  }
  defaultMessage() {
    return 'Wrong input shape';
  }
}

export class GetNextTickGameStateDto {
  @Validate(LiveCellsCoordsValidator)
  liveCellsCoords: Coords[];
}
