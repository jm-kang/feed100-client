import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReversePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (values) {
    if (values) {
      return values.reverse();
    }
  }
}
