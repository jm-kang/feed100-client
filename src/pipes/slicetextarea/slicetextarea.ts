import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SlicetextareaPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'slicetextarea',
})
export class SlicetextareaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, start: number, end: number, limitLine: number): any {
    if (value == null) return value;
    
    // let lines = value.replace(/\r\n/g, '\n').split('\n');
    let lines = value.split('<br />');
    let result: String = '';
    let textLength: number = 0;

    if(lines.length > limitLine) {
      for(let i=0; i < limitLine; i++) {
        let lineTextLength = lines[i].replace(/(?:\s)/g, '').length;
        textLength = textLength + lineTextLength;
        if(textLength > end) {
          return result + '<br />' + lines[i].slice(0, end - (textLength - lineTextLength)) + ' ...';
        }
        if(i == 0) {
          result = lines[0];
        } else {
          result = result + '<br />' + lines[i];
        }
      }
      return result + '<br />...';
    } else {
      for(let i=0; i < lines.length; i++) {
        let lineTextLength = lines[i].replace(/(?:\s)/g, '').length;
        textLength = textLength + lineTextLength;
        if(textLength > end) {
          return result + '<br />' + lines[i].slice(0, end - (textLength - lineTextLength)) + ' ...';
        }
        if(i == 0) {
          result = lines[0];
        } else {
          result = result + '<br />' + lines[i];
        }
      }
      return result;
    }
  }

  private supports(obj: any): boolean { return typeof obj === 'string' || Array.isArray(obj); }
}
