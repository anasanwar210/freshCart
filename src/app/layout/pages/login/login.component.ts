import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMSG!: string;
  dataSent: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][A-z0-9]{7,}$/),
    ]),
  });

  submitLogin(): void {
    if (this.logInForm.valid) {
      this.dataSent = true;
      this._AuthService.signin(this.logInForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['home']);
          this.dataSent = false;
          this.resetForm();
          localStorage.setItem('token', res.token);
          this._AuthService.tokenDecoded();
        },
        error: (err) => {
          this.dataSent = false;
          this.errMSG = err.error.message;
        },
      });
    }
  }

  resetForm() {
    this.logInForm.reset();
  }
}
