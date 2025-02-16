import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  paymentByCredit(cartId: string, formObj: object): Observable<any> {
    return this._HttpClient.post<any>(
      `${environment.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: formObj,
      },
      {
        headers: { token: localStorage.getItem('token') || '' },
      }
    );
  }

  getAllOrders(userId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseURL}/api/v1/orders/user/${userId}`
    );
  }
}
