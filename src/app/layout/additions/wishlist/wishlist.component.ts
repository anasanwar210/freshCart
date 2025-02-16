import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { IWishListData } from '../../../shared/interfaces/wish-list';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  // Properties
  allWishListProducts!: IWishListData[];
  login: boolean = false;

  // Get Services
  wishListServices = inject(WishListService);
  toastrService = inject(ToastrService);
  cartService = inject(CartService);
  router = inject(Router);

  // Hooks
  ngOnInit(): void {
    this.isLogin();
    this.getAllWishList();
  }

  // Create Methods
  getAllWishList() {
    this.wishListServices.getWishList().subscribe({
      next: (res) => {
        this.allWishListProducts = res.data;
      },
    });
  }

  removeFromWishList(productId: string) {
    this.wishListServices.removeFromWishList(productId).subscribe({
      next: (res) => {
        this.toastrService.warning('Removed from Wishlist', 'Success', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
        this.getAllWishList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addProduct(id: string) {
    if (this.login) {
      this.cartService.addProductToCart(id).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'Add Product', {
            progressBar: true,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    } else {
      this.router.navigate(['/signin']);
    }
  }
  isLogin() {
    if (localStorage.getItem('token')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
}
