import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandPlaces'
})
export class ThousandPlacesPipe implements PipeTransform {

  transform(value: any): string {
      return this.transformToNumber(value);
  }

  transformToNumber(value: any) {
      if (!value || value === undefined) {
        return 0;
      } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
  }

}
