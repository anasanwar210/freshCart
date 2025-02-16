import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartResponse } from '../../interfaces/cart';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  addProductToCart(id: string): Observable<ICart> {
    return this._HttpClient.post<ICart>(
      `${environment.baseURL}/api/v1/cart`,
      { productId: id },
      {
        headers: { token: localStorage.getItem('token') || '' },
      }
    );
  }

  getAllCartProducts(): Observable<ICartResponse> {
    return this._HttpClient.get<ICartResponse>(
      `${environment.baseURL}/api/v1/cart`,
      {
        headers: { token: localStorage.getItem('token') || '' },
      }
    );
  }

  removeProductFromCart(id: string): Observable<ICart> {
    return this._HttpClient.delete<ICart>(
      `${environment.baseURL}/api/v1/cart/${id}`,
      {
        headers: { token: localStorage.getItem('token') || '' },
      }
    );
  }

  updateQuantity(id: string, count: number) {
    return this._HttpClient.put<ICart>(
      `${environment.baseURL}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: { token: localStorage.getItem('token') || '' },
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete<any>(`${environment.baseURL}/api/v1/cart`, {
      headers: { token: localStorage.getItem('token') || '' },
    });
  }
}
