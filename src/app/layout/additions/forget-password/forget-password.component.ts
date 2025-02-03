import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  errMSG!: string;
  successMSG!: string;
  dataSent: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  findAccountForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitLogin(): void {
    if (this.findAccountForm.valid) {
      this.dataSent = true;
      this._AuthService.forgetPassword(this.findAccountForm.value).subscribe({
        next: (res) => {
          this.dataSent = false;
          this.successMSG = res.message;
          this._Router.navigate(['/submitCode']);
          localStorage.setItem(
            'currentUser',
            this.findAccountForm.get('email')?.value
          );
        },
        error: (err) => {
          this.dataSent = false;
          this.errMSG = err.error.message;
        },
      });
    }
  }
}
