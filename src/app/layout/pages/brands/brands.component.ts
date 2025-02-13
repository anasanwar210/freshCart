import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { IData } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  allBrands!: IData[];
  constructor(private _BrandsService: BrandsService) {
    this.getAllBrands();
  }

  getAllBrands() {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        console.log(res);
      },
    });
  }
}
