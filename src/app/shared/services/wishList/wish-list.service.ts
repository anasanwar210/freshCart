import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import {
  IAddToWishList,
  IGetWishListResponse,
  IRemoveFromWishList,
} from '../../interfaces/wish-list';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  token: string = '';
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token') || '';
    }
  }

  addToWishList(productId: string): Observable<IAddToWishList> {
    return this._HttpClient.post<IAddToWishList>(
      `${environment.baseURL}/api/v1/wishlist`,
      { productId: productId },
      {
        headers: { token: this.token },
      }
    );
  }

  removeFromWishList(productId: string): Observable<IRemoveFromWishList> {
    return this._HttpClient.delete<IRemoveFromWishList>(
      `${environment.baseURL}/api/v1/wishlist/${productId}`,
      {
        headers: { token: this.token },
      }
    );
  }

  getWishList(): Observable<IGetWishListResponse> {
    return this._HttpClient.get<IGetWishListResponse>(
      `${environment.baseURL}/api/v1/wishlist`,
      {
        headers: { token: this.token },
      }
    );
  }
}
