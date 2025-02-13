import { IData } from './../../../shared/interfaces/products';
import { Component, OnInit } from '@angular/core';
import { FirstSliderComponent } from '../../additions/sliders/home/first-slider/first-slider.component';
import { ProductsService } from '../../../shared/services/products.service';
import { SecondSliderComponent } from '../../additions/sliders/home/second-slider/second-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [FirstSliderComponent, SecondSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pageNO: number = 1;
  allProducts!: IData[];
  constructor(
    private _ProductsService: ProductsService,
    private _ToastrService: ToastrService,
    public _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._ProductsService.getAllProducts(this.pageNO).subscribe({
      next: (data) => {
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

  addProduct(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Add Product', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
        console.log(res);
      },
    });
  }
}
