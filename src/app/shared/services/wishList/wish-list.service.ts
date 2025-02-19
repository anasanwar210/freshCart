import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import {
  IAddToWishList,
  IGetWishListResponse,
  IRemoveFromWishList,
} from '../../interfaces/wish-list';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  token: string = '';
  constructor(private _HttpClient: HttpClient) {}

  addToWishList(productId: string): Observable<IAddToWishList> {
    return this._HttpClient.post<IAddToWishList>(
      `${environment.baseURL}/api/v1/wishlist`,
      { productId: productId }
    );
  }

  removeFromWishList(productId: string): Observable<IRemoveFromWishList> {
    return this._HttpClient.delete<IRemoveFromWishList>(
      `${environment.baseURL}/api/v1/wishlist/${productId}`
    );
  }

  getWishList(): Observable<IGetWishListResponse> {
    return this._HttpClient.get<IGetWishListResponse>(
      `${environment.baseURL}/api/v1/wishlist`
    );
  }
}
