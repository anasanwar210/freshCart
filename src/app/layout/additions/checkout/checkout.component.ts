import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaymentService } from '../../../shared/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  cartId!: string;
  allCities: any = [];
  errMsg!: string | null;

  constructor(
    private http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _PaymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\d{1,5}\s+)?[A-Za-z\u0600-\u06FF\s]+(?:\s+(?:St\.?|Street|Rd\.?|Avenue|Ave\.?|Blvd\.?|Lane|Way|Drive|Dr\.?))?$/
      ),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-z\u0600-\u06FF\s-]{2,50}$/),
    ]),
  });

  sendAddress() {
    if (this.shippingAddress.valid) {
      this._ActivatedRoute.paramMap.subscribe({
        next: (cartId) => {
          this.cartId = cartId.get('id') || '';
          this.errMsg = null;
          this._PaymentService
            .paymentByCredit(this.cartId, this.shippingAddress.value)
            .subscribe({
              next: (res) => {
                console.log(res);
                if (res.status === 'success') {
                  open(res.session.url, '_self');
                }
              },
            });
        },
      });
    } else {
      this.errMsg = 'Please fill all fields correctly.';
    }
  }

  getCountries() {
    this.http
      .get<any[]>(`${this.apiUrl}`)
      .pipe(
        map((countries) =>
          countries
            .map((country) => ({
              name: country.name.common,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      )
      .subscribe({
        next: (countries) => {
          this.allCities = countries;
        },
      });
  }
}
