import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TypeToTextPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'typeToText',
})
export class TypeToTextPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if(value == null) return 0;

    if(value == "save") {
      return "적립";
    } else if (value == "exchange") {
      return "환전";
    }
  }
}
