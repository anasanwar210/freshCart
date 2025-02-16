import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartData } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData!: ICartData;
  totalPrice!: number;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartItems();
  }

  cartItems() {
    this._CartService.getAllCartProducts().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.totalPrice = res.data.totalCartPrice;
      },
    });
  }

  removeProduct(id: string) {
    this._CartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.status, 'Remove Product', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
        this.cartItems();
      },
    });
  }

  plusQuantity(id: string, count: number) {
    this._CartService.updateQuantity(id, count).subscribe({
      next: (res) => {
        this.cartItems();
      },
    });
  }

  minusQuantity(id: string, count: number) {
    this._CartService.updateQuantity(id, count).subscribe({
      next: (res) => {
        this.cartItems();
      },
    });
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this._ToastrService.success(res.status, 'Remove Product', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
        this.cartItems();
      },
    });
  }
}
