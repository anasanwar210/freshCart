import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  userId!: any;
  allOrders!: any;
  constructor(
    private _AuthService: AuthService,
    private _PaymentService: PaymentService
  ) {
    this.userId = this._AuthService.userId;
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    return this._PaymentService.getAllOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrders = res;
      },
    });
  }
}
