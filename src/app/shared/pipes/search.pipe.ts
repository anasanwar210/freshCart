import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(allProducts: any[], product: string): any[] {
    return allProducts.filter((item) =>
      item.title.toLowerCase().includes(product.toLowerCase())
    );
  }
}
