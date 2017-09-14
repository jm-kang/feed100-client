import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SlicetextPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'slicetext',
})
export class SlicetextPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, end: number) {
    if (value == null) return value;
    if (value.length > end) {
      return value.slice(0, end) + " ...";
    } else {
      return value;
    }
  }
}
