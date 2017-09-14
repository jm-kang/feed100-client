import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the JsonParsePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'jsonParse',
})
export class JsonParsePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return JSON.parse(value);
  }
}
