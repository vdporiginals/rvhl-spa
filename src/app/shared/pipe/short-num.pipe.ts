import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(num: number, args?: any): any {
    if (isNaN(num)) { return null; } // will only work value is a number
    if (num === null) { return null; }
    if (num === 0) { return null; }
    const suffixes = ['', 'Nghìn', ' Triệu', 'Tỷ', 't'];
    const suffixNum = Math.floor(('' + num).length / 3);
    const shortValue = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(2));
    if (shortValue % 1 !== 0) {
      return shortValue.toFixed(1) + suffixes[suffixNum];
    }
    console.log(shortValue)
    return shortValue + suffixes[suffixNum];

  }
}
