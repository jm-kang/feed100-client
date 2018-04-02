import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DDayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dDay',
})
export class DDayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value.match('전')) {
      return '종료';
    }
    else if(value.match('후')) {
      return value.replace('일 후', ' ');
    }
    else {
      return 'error';
    }
  }
}
