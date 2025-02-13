import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Data } from '../../../shared/interfaces/product-id';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductdetailsComponent implements OnInit {
  currentProduct!: Data;
  id!: string;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProductId();
    this.getProductById();
  }

  getProductId() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (prodId) => {
        this.id = prodId.get('id') || '';
      },
    });
  }

  getProductById() {
    this._ProductsService.getProductById(this.id).subscribe({
      next: (product) => {
        this.currentProduct = product.data;
      },
    });
  }
}
