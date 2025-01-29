import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMSG!: string;
  dataSent: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required]),
  });

  submitRegister() {
    if (this.logInForm.valid) {
      this.dataSent = true;
      this._AuthService.signin(this.logInForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['home']);
          this.dataSent = false;
          this.resetForm();
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
