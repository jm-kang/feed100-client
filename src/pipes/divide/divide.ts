import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DividePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'divide',
})
export class DividePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value1, value2, ...args) {
    return 100 * (value1 / value2);
  }
}
