import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReplaceBrTagPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'replaceBrTag',
})
export class ReplaceBrTagPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if (value == null) return value;
    else {
      return value.replace(/<br *\/?>/gi, '\n');
      // return value;
    }
  }
}
