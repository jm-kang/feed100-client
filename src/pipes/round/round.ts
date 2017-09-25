import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RoundPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (value, input:number) {
    let factor = Math.pow(10, input);
    let roundValue = value * factor;
    roundValue = Math.round(roundValue);
    roundValue = roundValue / factor;
    return roundValue;
  }
}
