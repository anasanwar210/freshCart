import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartData } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartData!: ICartData;
  totalPrice!: number;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {
    this.cartItems();
  }
  cartItems() {
    this._CartService.getAllCartProducts().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.totalPrice = res.data.totalCartPrice;
        console.log(this.cartData);
      },
    });
  }

  removeProduct(id: string) {
    this._CartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.status, 'Remove Product', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
        this.cartItems();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  plusQuantity(id: string, count: number) {
    this._CartService.updateQuantity(id, count).subscribe({
      next: (res) => {
        this.cartItems();
        console.log(res);
      },
    });
  }

  minusQuantity(id: string, count: number) {
    this._CartService.updateQuantity(id, count).subscribe({
      next: (res) => {
        this.cartItems();
        console.log(res);
      },
    });
  }
}
