import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Data } from '../../../shared/interfaces/product-id';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductdetailsComponent implements OnInit {
  @Input() cartData: any;
  currentProduct!: Data;
  login: boolean = false;
  id!: string;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.isLogin();
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

  addProduct(id: string) {
    if (this.login) {
      this._CartService.addProductToCart(id).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message, 'Add Product', {
            progressBar: true,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    } else {
      this._Router.navigate(['/signin']);
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
