import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { IData } from '../../../shared/interfaces/products';
import Swiper from 'swiper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements AfterViewInit {
  pageNO: number = 1;
  allProducts!: IData[];
  constructor(
    private _ProductsService: ProductsService,
    private _ToastrService: ToastrService,
    public _CartService: CartService
  ) {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this._ProductsService.getAllProducts(this.pageNO).subscribe({
      next: (data) => {
        this.allProducts = data.data;
        console.log(this.allProducts);
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

  @ViewChild('swiperRef', { static: false }) swiperRef: any;

  ngAfterViewInit() {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (this.swiperRef?.nativeElement?.swiper) {
          this.swiperRef.nativeElement.swiper.update();
          this.swiperRef.nativeElement.swiper.autoplay.start();
        }
      });
    }, 100);
  }
}
