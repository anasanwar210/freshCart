import { IResponseById } from './../interfaces/product-id';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(page: number): Observable<IResponse> {
    return this._HttpClient.get<IResponse>(
      `${environment.baseURL}/api/v1/products?page=${page}`
    );
  }

  getProductById(prodId: string): Observable<IResponseById> {
    return this._HttpClient.get<IResponseById>(
      `${environment.baseURL}/api/v1/products/${prodId}`
    );
  }
}
