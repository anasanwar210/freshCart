import { IData } from './../../../shared/interfaces/products';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FirstSliderComponent } from '../../additions/sliders/home/first-slider/first-slider.component';
import { ProductsService } from '../../../shared/services/products.service';
import { SecondSliderComponent } from '../../additions/sliders/home/second-slider/second-slider.component';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FirstSliderComponent, SecondSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pageNO: number = 1;
  allProducts!: IData[];
  wishListProducts: string[] = [];
  hasProduct: any = false;
  login: boolean = false;
  constructor(
    private _ProductsService: ProductsService,
    private _ToastrService: ToastrService,
    public _CartService: CartService,
    private _WishListService: WishListService,
    private _Router: Router,
    @Inject(PLATFORM_ID) private ID: object
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    if (isPlatformBrowser(this.ID)) {
      this.isLogin();
      this.getWishList();
    }
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
    if (this.login) {
      this._CartService.addProductToCart(id).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message, 'Add Product', {
            progressBar: true,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    } else {
      this._Router.navigate(['/signin']);
    }
  }

  toggleWishList(productId: string) {
    if (this.wishListProducts.includes(productId)) {
      this.wishListProducts = this.wishListProducts.filter(
        (id) => id !== productId
      );
      this.removeFromWishList(productId);
    } else {
      this.wishListProducts.push(productId);
      this.addToWishList(productId);
    }
  }

  addToWishList(id: string) {
    if (this.login) {
      this._WishListService.addToWishList(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.wishListProducts.push(id);
            this._ToastrService.success(res.message, 'Add to Wishlist', {
              progressBar: true,
              positionClass: 'toast-bottom-right',
            });
          }
        },
      });
    } else {
      this._Router.navigate(['/signin']);
    }
  }

  removeFromWishList(productId: string) {
    this._WishListService.removeFromWishList(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishListProducts = this.wishListProducts.filter(
            (id) => id !== productId
          );
          this._ToastrService.warning('Removed from Wishlist', 'Success', {
            progressBar: true,
            positionClass: 'toast-bottom-right',
          });
        }
      },
      error: (err) => {
        this._ToastrService.error('Failed to remove from Wishlist', 'Error');
        console.error(err);
      },
    });
  }
  getWishList() {
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.wishListProducts = res.data.map((product: any) => product._id);
        }
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
    });
  }

  isLogin() {
    if (localStorage.getItem('token')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
}
