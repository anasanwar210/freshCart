import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}
  getAllCategories(): Observable<IResponse> {
    return this._HttpClient.get<IResponse>(
      `${environment.baseURL}/api/v1/categories`
    );
  }
}
