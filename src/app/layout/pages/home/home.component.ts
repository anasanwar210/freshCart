import { IData } from './../../../shared/interfaces/products';
import { Component, OnInit } from '@angular/core';
import { FirstSliderComponent } from '../../additions/sliders/home/first-slider/first-slider.component';
import { ProductsService } from '../../../shared/services/products.service';
import { SecondSliderComponent } from '../../additions/sliders/home/second-slider/second-slider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FirstSliderComponent, SecondSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pageNO: number = 1;
  isLoading: boolean = true;
  allProducts!: IData[];
  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._ProductsService.getAllProducts(this.pageNO).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.allProducts = data.data;
      },
    });
  }

  nextFun() {
    this.pageNO = 2;
    this.getAllProducts();
  }
  prevFun() {
    this.pageNO = 1;
    this.getAllProducts();
  }
}
