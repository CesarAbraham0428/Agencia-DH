import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterObj: {[key: string]: any}): any[] {
    if (!items || !filterObj) {
      return items;
    }
    return items.filter(item => {
      for (let key in filterObj) {
        if (item[key] !== filterObj[key]) {
          return false;
        }
      }
      return true;
    });
  }
}